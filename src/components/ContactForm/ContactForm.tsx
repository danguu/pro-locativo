import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { validateContactForm, ContactFormData } from "@/utils/form-validate";
import { Loader2 } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(formData);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div>
        <Label htmlFor="name">Nombre completo *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange("name")}
          placeholder="Tu nombre"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Correo electrónico *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          placeholder="correo@dominio.com"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange("phone")}
          placeholder="+57 300 0000000"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-2 text-sm text-destructive">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Cuéntanos sobre tu proyecto *</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange("message")}
          placeholder="Describe el alcance, ubicación y fechas estimadas"
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="btn-primary w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </span>
        ) : (
          "Enviar mensaje"
        )}
      </Button>

      {status === "success" && (
        <p className="rounded-2xl border border-secondary/50 bg-secondary/15 p-4 text-sm text-secondary-foreground">
          ¡Gracias! Hemos recibido tu mensaje y un asesor se comunicará contigo en menos de 24 horas hábiles.
        </p>
      )}
      {status === "error" && Object.keys(errors).length > 0 && (
        <p className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Por favor verifica la información ingresada.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
