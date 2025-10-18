import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .min(3, "Ingresa al menos 3 caracteres")
    .max(80, "El nombre no puede superar 80 caracteres"),
  email: z.string().email("Ingresa un correo válido"),
  phone: z
    .string()
    .min(7, "Ingresa un teléfono válido")
    .max(20, "El número es demasiado largo"),
  service: z.string().min(3, "Selecciona un servicio"),
  message: z
    .string()
    .min(20, "Cuéntanos un poco más sobre tu proyecto")
    .max(500, "Máximo 500 caracteres"),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar el aviso de privacidad" }),
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  privacy: false,
};

export const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.info("Solicitud de contacto", values);
    setStatus("success");
    form.reset(defaultValues);
    window.setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-10">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Ana Martínez" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@empresa.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+57 300 000 0000" autoComplete="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio de interés</FormLabel>
                  <FormControl>
                    <Input placeholder="Mantenimiento, remodelación..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuéntanos de tu proyecto</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Describe necesidades, tiempos y expectativas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(Boolean(checked))} />
                </FormControl>
                <div className="space-y-1 text-sm">
                  <FormLabel className="font-medium">Acepto el aviso de privacidad</FormLabel>
                  <p className="text-slate-500">
                    Autorizo el tratamiento de mis datos para recibir información sobre servicios y propuestas de Kolbing Like.
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={status === "loading"}
          >
            {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
            {status === "success" ? "Solicitud enviada" : (
              <>
                <Send className="mr-2 h-4 w-4" aria-hidden /> Enviar solicitud
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
