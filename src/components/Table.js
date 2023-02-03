import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <table>
        <tr>
          <th>Descrição</th>
        </tr>
        <tr>
          <th>Tag</th>
        </tr>
        <tr>
          <th>Método de pagamento</th>
        </tr>
        <tr>
          <td>Valor</td>
        </tr>
        <tr>
          <th>Moeda</th>
        </tr>
        <tr>
          <th>Câmbio utilizado</th>
        </tr>
        <tr>
          <th>Valor convertido</th>
        </tr>
        <tr>
          <th>Moeda de conversão</th>
        </tr>
        <tr>
          <th>Editar/Excluir</th>
        </tr>
      </table>

    );
  }
}

export default Table;
