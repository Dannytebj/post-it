import { Validators } from '@angular/forms';

export const formConfig = {
  name: {
    type: 'input',
    label: 'Name',
    inputType: 'text',
    name: 'name',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Name Required'
      },
      {
        name: 'pattern',
        validator: Validators.pattern('^[a-zA-Z]+$'),
        message: 'Name must be alphabets'
      }
    ]
  },
  email: {
    type: 'input',
    label: 'email',
    inputType: 'text',
    name: 'email',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Email is required'
      },
      {
        name: 'pattern',
        validator: Validators.pattern(
          '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
        ),
        message: 'Invalid email'
      }
    ]
  },
  password: {
    type: 'input',
    label: 'Password',
    inputType: 'password',
    name: 'password',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Password Required'
      },
      {
        name: 'pattern',
        validator: Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'
        ),
        message: 'Password should contain a digit, alphabet(lower & upper)'
      }
    ]
  }
};
