import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { projectAuth, projectFirestore } from 'firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  type Login = {
    email: string;
    password: string;
  };

  const login = async ({ email, password }: Login) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      const userRef = doc(projectFirestore, 'users', res.user.uid);

      await updateDoc(userRef, { online: true });

      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
