import {useContext} from 'react';
import AuthContext from './AuthContext';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  return {user, setUser};
};
