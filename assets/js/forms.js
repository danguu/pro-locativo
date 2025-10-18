import { $, $$, formatPhone } from './ui.js';

const validators = {
  nombre: (value) => value.trim().length >= 3,
  email: (value) => /.+@.+\..+/.test(value),
  telefono: (value) => value.replace(/\D/g, '').length >= 7,
  mensaje: (value) => value.trim().length >= 10,
};

const errorMessages = {
  nombre: 'Ingresa tu nombre completo.',
  email: 'Agrega un correo válido.',
  telefono: 'Incluye un teléfono de contacto.',
  mensaje: 'Cuéntanos más sobre tu proyecto (mínimo 10 caracteres).',
};

const setFieldState = (field, isValid) => {
  const message = field.closest('.form-field').querySelector('.field-error');
  if (!message) return;
  if (!isValid) {
    message.textContent = errorMessages[field.name] ?? 'Revisa este campo.';
    field.setAttribute('aria-invalid', 'true');
  } else {
    message.textContent = '';
    field.removeAttribute('aria-invalid');
  }
};

const validateField = (field) => {
  const rule = validators[field.name];
  if (!rule) return true;
  const isValid = rule(field.value);
  setFieldState(field, isValid);
  return isValid;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = $$('input, textarea, select', form);
  let isFormValid = true;
  fields.forEach((field) => {
    const valid = validateField(field);
    if (!valid) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    const firstInvalid = fields.find((field) => field.getAttribute('aria-invalid') === 'true');
    firstInvalid?.focus();
    return;
  }

  sendForm(new FormData(form));
  const feedback = $('[data-form-feedback]', form);
  if (feedback) {
    feedback.textContent = 'Gracias por escribirnos. Nuestro equipo se comunicará contigo pronto.';
  }
  form.reset();
};

export const setupForms = () => {
  const forms = $$('form[data-form="contact"]');
  forms.forEach((form) => {
    const phoneInput = $('input[name="telefono"]', form);
    if (phoneInput) {
      phoneInput.addEventListener('input', (event) => {
        const { value } = event.target;
        event.target.value = formatPhone(value);
      });
    }

    form.addEventListener('blur', (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (!('name' in event.target)) return;
      validateField(event.target);
    }, true);

    form.addEventListener('submit', handleSubmit);
  });
};

export const sendForm = (formData) => {
  const payload = Object.fromEntries(formData.entries());
  console.log('Formulario listo para enviar:', payload);
  window.dispatchEvent(new CustomEvent('form:submitted', { detail: payload }));
};
