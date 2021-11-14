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
import Navbar from 'components/Navbar';

const Main = styled.main`
  display: flex;
`;

const Container = styled.div`
  flex-grow: 1;
  padding: 0 60px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  const {
    state: { user, authIsReady },
  } = useAuthContext();
  return (
    <Main>
      {authIsReady && (
        <Router>
          <Container>
            <Navbar />
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
          </Container>
        </Router>
      )}
    </Main>
  );
}

export default App;
