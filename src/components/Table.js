import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
        <tbody>
          {expenses.length > 0 && expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {Number(expense.exchangeRates[expense.currency]
                  .ask).toFixed(2)}
              </td>
              <td>
                {Number(expense.exchangeRates[expense.currency]
                  .ask * expense.value).toFixed(2)}
              </td>
              <td>Real Brasileiro</td>
              <td>
                <button>Editar</button>
                <button data-testid="delete-btn">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
