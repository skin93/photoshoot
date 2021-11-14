import {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';
import { projectAuth } from 'firebase/config';
import { onAuthStateChanged } from '@firebase/auth';
import { User } from 'firebase/auth';

type State = {
  user: User | null;
  authIsReady: boolean;
};

const initialState: State = {
  user: null,
  authIsReady: false,
};

type Actions =
  | { type: 'LOGIN'; payload: User }
  | { type: 'AUTH_IS_READY'; payload: User | null }
  | { type: 'LOGOUT'; user: null };

interface IAuthContext {
  children: ReactNode;
}

export const AuthContext = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const authReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: IAuthContext) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(projectAuth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unsub();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
