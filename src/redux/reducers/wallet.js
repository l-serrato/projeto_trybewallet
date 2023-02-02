// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  editorId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
