import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    expenseDescription: '',
    currency: 'USD',
    payMethod: 'Cartão de crédito',
    expenseType: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      expenseValue,
      expenseDescription,
      currency,
      payMethod,
      expenseType,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <h1>WalletForm</h1>
        <input
          data-testid="value-input"
          type="input"
          name="expense_value"
          placeholder="Valor"
          onChange={ this.handleChange }
          value={ expenseValue }
        />
        <input
          data-testid="description-input"
          type="textbox"
          name="expense_description"
          placeholder="Descrição"
          onChange={ this.handleChange }
          value={ expenseDescription }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
          {currencies.map((currecy, i) => (
            <option key={ i } value={ currecy }>{ currecy }</option>))}
        </select>
        <select
          name="pay_method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ payMethod }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="expense_type"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ expenseType }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
