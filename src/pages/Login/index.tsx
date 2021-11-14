import { AuthForm, Input, Label } from 'styles/Form.styled';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useLogin } from 'hooks/useLogin';
import { Error, StyledButton } from 'styles/GlobalStyle';

const Login = () => {
  const { login, isPending, error } = useLogin();

  type FormInputs = {
    email: string;
    password: string;
  };

  const schema = yup
    .object({
      email: yup.string().email().required('Email is required'),
      password: yup.string().required('Password is required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    const { email, password } = data;
    login({ email, password });
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <Label>
        <span>Email:</span>
        <Input {...register('email')} />
        {errors.email && <Error>{errors.email.message}</Error>}
      </Label>
      <Label>
        <span>Password:</span>
        <Input {...register('password')} type='password' />
        {errors.password && <Error>{errors.password.message}</Error>}
      </Label>
      {!isPending && <StyledButton type='submit'>Login</StyledButton>}
      {isPending && <StyledButton disabled>Loading...</StyledButton>}
      {error && <Error>{error}</Error>}
    </AuthForm>
  );
};

export default Login;
