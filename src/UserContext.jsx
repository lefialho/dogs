import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { UserContext } from './CreateContext';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api';

export function UserStorage({ children }) {
  const [userData, setUserData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userLogout = useCallback(
    async function () {
      setUserData(null);
      setError(null);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setUserData(json);
    setLogin(true);
    // console.log(json);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenReponse = await fetch(url, options);
      if (!tokenReponse.ok)
        // Caso usuário não existir
        throw new Error(`Error: ${tokenReponse.statusText}`);
      const { token } = await tokenReponse.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          getUser(token);
          // const json = await response.json();
          // console.log(json);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]); // função criada fora do contexto deve ser passada como dependência

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, userData, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
}
