import { useState, useEffect } from 'react';
import { projectAuth, projectStorage, projectFirestore } from 'firebase/config';
import { useAuthContext } from './useAuthContext';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { doc, setDoc } from '@firebase/firestore';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  type Signup = {
    email: string;
    password: string;
    displayName: string;
    thumbnail: File;
  };

  const signup = async ({
    email,
    password,
    displayName,
    thumbnail,
  }: Signup) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      if (!res) {
        throw new Error('Could not complete signup');
      }

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;

      const uploadRef = ref(projectStorage, uploadPath);

      await uploadBytes(uploadRef, thumbnail);

      const imgUrl = await getDownloadURL(uploadRef);

      await updateProfile(res.user, { displayName, photoURL: imgUrl });

      const userRef = doc(projectFirestore, 'users', res.user.uid);

      await setDoc(userRef, {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

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

  return { signup, error, isPending };
};
