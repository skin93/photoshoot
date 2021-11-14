import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
`;

function App() {
  const {
    state: { user, authIsReady },
  } = useAuthContext();
  return (
    <Main>
      {authIsReady && (
        <Router>
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to='/login' />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
          </Routes>
        </Router>
      )}
    </Main>
  );
}

export default App;
