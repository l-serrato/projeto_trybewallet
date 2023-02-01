import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginOk } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnOff: true,
  };

  checkInput = () => {
    const { email, password } = this.state;
    const minLength = 6;
    if (email.length && password.length >= minLength) {
      this.setState({ btnOff: false });
    } else {
      this.setState({ btnOff: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.checkInput());
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(loginOk(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, btnOff } = this.state;
    return (
      <form>
        <div>Login</div>
        <input
          className="input"
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          id="email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          id="password"
          minLength="6"
        />
        <button
          type="button"
          disabled={ btnOff }
          onClick={ this.handleSubmit }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
