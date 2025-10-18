/*
 * Validaciones reutilizables para formularios.
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d\s()-]{7,}$/;

export const validateContactForm = (data: ContactFormData) => {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!emailRegex.test(data.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.phone = "Ingresa un número telefónico válido.";
  }

  if (!data.message.trim() || data.message.trim().length < 12) {
    errors.message = "Describe tu solicitud con al menos 12 caracteres.";
  }

  return errors;
};
