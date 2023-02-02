export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';

export const loginOk = (user) => ({ type: LOGIN, user });

export const fetchCurrencyAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  const filterCurr = Object.keys(currencies).filter((_currency, i) => i !== 1);
  return dispatch({
    type: CURRENCY,
    payload: {
      currencies: filterCurr,
    },
  });
};
