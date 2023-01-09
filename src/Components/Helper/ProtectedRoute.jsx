import { useContext } from 'react';
import { UserContext } from '../../CreateContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const { login } = useContext(UserContext);

  return login ? <div>{children}</div> : <Navigate to="/login" />;
}
