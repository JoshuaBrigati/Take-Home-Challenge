import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from '../middleware/utils';

import { MainInput } from '../components/MainInput';

const Login = ({ baseApiUrl }) => {
  const router = useRouter();
  const [loginError, setLoginError] = useState('')

  const handleLogin = async ({ username, password }) => {
    const data = {
      username,
      password
    }

    const loginApi = await fetch(`${baseApiUrl}/auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(error => {
      setLoginError(error);
      console.error('Error:', error);
    });

    let result = await loginApi.json();

    if (result.success && result.token) {
      Cookies.set('token', result.token);
      router.push('/graph');
    } else {

      console.log("🚀 ~ file: login.js ~ line 36 ~ handleLogin ~ result", result)
      setLoginError(result.error);
    }
  }

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) =>
    handleLogin({ username: data.username, password: data.password })
  );

  const username = register('username', { required: true });
  const password = register('password', { required: true });

  return (
    <form className={'form-container login-in-container'} onSubmit={onSubmit} noValidate>
      <h2>Log In</h2>
      <MainInput
        className={errors.username ? 'error' : ''}
        inputType={'text'}
        inputLabel={'Username'}
        isRequired={true}
        inputValue={getValues('username')}
        onChange={(e) => {
          setValue('username', e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          });
          username.onChange(e);
        }}
        errorType={errors.username?.type}
      />
      <MainInput
        className={errors.password ? 'error' : ''}
        inputType={'password'}
        inputLabel={'Password'}
        isRequired={true}
        inputValue={getValues('password')}
        onChange={(e) => {
          setValue('password', e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          });
          password.onChange(e);
        }}
        errorType={errors.password?.type}
      />
      <button
        className='login-button'
        type='submit'
      >
        Log In
      </button>
      {!!loginError.length && <div className={'login-error error-text'}>{loginError}</div>}
    </form>
  )
}

export default Login;

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';

  if (profile) {
    context.res.writeHead(307, { Location: '/graph' });
    context.res.end();
  }

  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
}