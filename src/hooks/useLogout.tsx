import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { projectAuth, projectFirestore } from 'firebase/config';
import { signOut } from '@firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const uid = projectAuth.currentUser!.uid;

      const userRef = doc(projectFirestore, 'users', uid);

      await updateDoc(userRef, { online: false });

      await signOut(projectAuth);

      dispatch({ type: 'LOGOUT' });

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

  return { logout, error, isPending };
};
