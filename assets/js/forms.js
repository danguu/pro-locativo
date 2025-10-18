import { qs, qsa } from './ui.js';

export function initContactForm() {
  const form = qs('[data-contact-form]');
  if (!form) return;

  const status = qs('[data-form-status]', form);
  const fields = qsa('[data-validate]', form);
  const phoneInput = qs('[data-mask="phone"]', form);

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearError(field));
  });

  phoneInput?.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    target.value = maskPhone(target.value);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isValid = true;
    fields.forEach((field) => {
      const valid = validateField(field);
      if (!valid) isValid = false;
    });

    if (!isValid) {
      if (status) {
        status.textContent = 'Revisa los campos marcados en rojo.';
        status.setAttribute('role', 'alert');
      }
      return;
    }

    const formData = Object.fromEntries(new FormData(form));
    if (status) {
      status.setAttribute('role', 'status');
      status.textContent = 'Enviando…';
    }

    try {
      await sendForm(formData);
      if (status) {
        status.textContent = 'Mensaje enviado. Nuestro equipo te contactará pronto.';
        status.setAttribute('role', 'status');
      }
      form.reset();
    } catch (error) {
      console.error(error);
      if (status) {
        status.textContent = 'No pudimos enviar el mensaje. Inténtalo nuevamente.';
        status.setAttribute('role', 'alert');
      }
    }
  });
}

function validateField(field) {
  const { validity } = field;
  const container = field.closest('.form__group');
  const error = qs('[data-error]', container);
  let message = '';

  if (validity.valueMissing) {
    message = 'Este campo es obligatorio.';
  } else if (validity.typeMismatch) {
    message = 'Revisa el formato ingresado.';
  } else if (field.name === 'phone' && field.value.replace(/\D/g, '').length < 10) {
    message = 'Incluye un número de teléfono válido.';
  }

  if (message) {
    field.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
    return false;
  }

  clearError(field);
  return true;
}

function clearError(field) {
  field.removeAttribute('aria-invalid');
  const container = field.closest('.form__group');
  const error = qs('[data-error]', container);
  if (error) {
    error.textContent = '';
    error.hidden = true;
  }
}

function maskPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const parts = [];
  if (digits.length > 0) {
    parts.push('+57');
  }
  if (digits.length >= 3) {
    parts.push(`${digits.slice(0, 3)}`);
  }
  if (digits.length >= 6) {
    parts.push(`${digits.slice(3, 6)}`);
  }
  if (digits.length > 6) {
    parts.push(`${digits.slice(6)}`);
  }
  return parts.join(' ');
}

export async function sendForm(payload) {
  console.log('Formulario listo para envío', payload);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { ok: true };
}
