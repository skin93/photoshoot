import { useSignup } from 'hooks/useSignup';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Error, StyledButton } from 'styles/GlobalStyle';
import { AuthForm, Input, Label } from 'styles/Form.styled';

const Signup = () => {
  const { signup, isPending, error } = useSignup();

  type FormInputs = {
    email: string;
    password: string;
    displayName: string;
    thumbnail: FileList;
  };

  const schema = yup
    .object({
      email: yup.string().email().required('Email is required'),
      password: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
      displayName: yup.string().required('Nickname is required'),
      thumbnail: yup
        .mixed()
        .test('name', 'Image is required', (value) => {
          return value[0] && value[0].name !== '';
        })
        .test(
          'fileSize',
          'Image file size must be less than 100kb',
          (value) => {
            return value[0] && value[0].size <= 1000000;
          }
        )
        .test('type', 'Selected file must be an image', (value) => {
          return value[0] && value[0].type.includes('image');
        }),
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
    let email = data.email;
    let password = data.password;
    let displayName = data.displayName;
    let thumbnail = data.thumbnail[0];

    signup({ email, password, displayName, thumbnail });
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>
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
      <Label>
        <span>Nickname:</span>
        <Input {...register('displayName')} />
        {errors.displayName && <Error>{errors.displayName.message}</Error>}
      </Label>
      <Label>
        <span>Profile thumbnail:</span>
        <Input {...register('thumbnail')} type='file' />
        {errors.thumbnail && <Error>{errors.thumbnail.message}</Error>}
      </Label>
      {!isPending && <StyledButton type='submit'>Sign up</StyledButton>}
      {isPending && <StyledButton disabled>Loading...</StyledButton>}
      {error && <Error>{error}</Error>}
    </AuthForm>
  );
};

export default Signup;
