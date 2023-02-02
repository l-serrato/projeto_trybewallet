import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAPI, addExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  resetInputs = () => {
    this.setState({
      value: '',
      description: '',
    });
  };

  handleClick = () => {
    const { id } = this.state;

    const { dispatch } = this.props;

    dispatch(addExpense({ ...this.state }));
    this.setState({ id: id + 1 });
    this.resetInputs();
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <h1>WalletForm</h1>
        <input
          data-testid="value-input"
          type="input"
          name="value"
          placeholder="Valor"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          data-testid="description-input"
          type="textbox"
          name="description"
          placeholder="Descrição"
          onChange={ this.handleChange }
          value={ description }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
        >
          {currencies.map((element) => (
            <option key={ element }>{ element }</option>))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
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
//
export default connect(mapStateToProps)(WalletForm);
