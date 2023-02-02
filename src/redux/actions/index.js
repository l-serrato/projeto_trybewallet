export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';

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

export const addExpense = (values) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const {
    id,
    value,
    description,
    currency,
    method,
    tag,
  } = values;

  return dispatch({
    type: ADD_EXPENSE,
    payload: {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    },
  });
};
