import { useState } from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido, ex: dogs@gmail.com',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha precisa ter 1 caracter maísculo, 1 minúsculo e 1 dígito. Com no mínimo 8 caracteres.',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize apenas números.',
  },
};

export function useForm(type) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  function validate(value) {
    if (type === false) return false; // Não faz a validação do campo
    // Não foi preenchido nenhum valor no campo
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
      // Verifica se o tipo existe e a validação do regex
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
      // Caso não houver erros
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}
