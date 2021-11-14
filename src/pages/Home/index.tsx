import { useAuthContext } from 'hooks/useAuthContext';

const Home = () => {
  const {
    state: { user },
  } = useAuthContext();
  return (
    <div>
      <h1>{user?.displayName}</h1>
    </div>
  );
};

export default Home;
