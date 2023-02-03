// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
