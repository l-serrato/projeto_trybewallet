import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginOk } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit() {
    const { submitLoginAction, history } = this.props;
    submitLoginAction(this.state);
    history.push('/carteira');
  }

  render() {
    const { email, senha } = this.state;

    function validateEmail(emailAdress) {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regexEmail.test(emailAdress);
    }

    function validatePassword(password) {
      const minPassword = 6;
      return password.length >= minPassword;
    }
    return (
      <main>
        <label htmlFor="input-email">
          Email:
          <input
            type="email"
            id="input-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <br />
        <label htmlFor="input-password">
          Senha:
          <input
            type="password"
            id="input-password"
            value={ senha }
            name="senha"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={ !validateEmail(email) || !validatePassword(senha) }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLoginAction: (user) => dispatch(loginOk(user)),
});

Login.propTypes = {
  submitLoginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
