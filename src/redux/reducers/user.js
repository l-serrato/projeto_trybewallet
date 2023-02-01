// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INICIAL_STATE = {
  user: {
    email: '',
    senha: '',
  },
};

function user(state = INICIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.user.email,
      senha: action.user.senha,
    };
  default:
    return state;
  }
}

export default user;
