import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { contactFormCopy } from "@/assets/content";

const contactSchema = z.object({
  name: z.string().min(3, "Ingresa tu nombre completo"),
  email: z.string().email("Ingresa un correo válido"),
  phone: z
    .string()
    .min(7, "Ingresa un teléfono válido")
    .regex(/^[0-9+\-()\s]+$/, "Usa solo números y símbolos permitidos"),
  service: z.string().min(1, "Selecciona un servicio"),
  message: z.string().min(10, "Cuéntanos más detalles"),
  policy: z.boolean().refine((value) => value, "Debes aceptar la política de tratamiento de datos")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      policy: false
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setStatus("idle");
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.info("Contacto enviado", data);
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="glass-effect rounded-2xl border border-border/40 p-6 md:p-10">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl font-semibold text-foreground">{contactFormCopy.title}</h2>
        <p className="text-muted-foreground">{contactFormCopy.description}</p>
        {status === "success" && (
          <p role="status" className="rounded-md bg-secondary/20 px-4 py-2 text-sm text-secondary">
            {contactFormCopy.successMessage}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {contactFormCopy.errorMessage}
          </p>
        )}
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="name">
              Nombre completo
            </label>
            <Input id="name" {...register("name")} aria-invalid={Boolean(errors.name)} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="email">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="phone">
              Teléfono de contacto
            </label>
            <Input id="phone" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="service">
              Servicio de interés
            </label>
            <select
              id="service"
              {...register("service")}
              aria-invalid={Boolean(errors.service)}
              className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="">Selecciona una opción</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="remodelacion">Remodelación</option>
              <option value="instalaciones">Instalaciones eléctricas</option>
              <option value="otros">Otros servicios</option>
            </select>
            {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service.message}</p>}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="message">
            Detalles del proyecto
          </label>
          <Textarea
            id="message"
            rows={5}
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
        </div>
        <Controller
          name="policy"
          control={control}
          render={({ field }) => (
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <Checkbox
                id="policy"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                aria-invalid={Boolean(errors.policy)}
              />
              <span>
                Acepto la política de tratamiento de datos y autorizo a Kolbing Like a contactarme con información relevante.
              </span>
            </label>
          )}
        />
        {errors.policy && <p className="-mt-2 text-xs text-destructive">{errors.policy.message}</p>}
        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
