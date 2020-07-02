import baseUrl from 'settings';
import axios from 'axios';

export const createTokenProvider = () => {
  // let _token =
  //   JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '') || null;
  let _token = null;

  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }
    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    // multiply by 1000 to convert seconds into milliseconds
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };

  const getToken = async () => {
    if (!_token) {
      return null;
    }
    if (isExpired(getExpirationDate(_token.access))) {
      const payload = {
        refresh: _token.refresh,
      };
      // const updatedToken = await fetch(`${baseUrl.v1}/auth/token/refresh`, {
      //   method: 'POST',
      //   body: _token.refresh,
      // }).then((r) => r.json());
      axios
        .post(`${baseUrl.v1}/auth/token/refresh`, payload)
        .then((response) => {
          console.log(response.data);
          setToken(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return _token && _token.access;
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  let observers = [];

  const subscribe = (observer) => {
    observers.push(observer);
  };

  const unsubscribe = (observer) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
    } else {
      localStorage.removeItem('REACT_TOKEN_AUTH');
    }
    _token = token;
    notify();
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }
    return Date.now() > exp;
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};
