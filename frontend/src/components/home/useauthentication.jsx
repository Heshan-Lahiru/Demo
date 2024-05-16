// useAuth.js
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch('/checkLoginStatus')
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(data.isLoggedIn);
        if (!data.isLoggedIn) {
          history.push('/login');
        }
      })
      .catch(error => console.error('Error checking login status:', error));
  }, [history]);

  return isLoggedIn;
};

export default useAuth;
