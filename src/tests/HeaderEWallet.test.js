import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';
import App from '../App';

const login = 'email-input';
const pass = 'password-input';

describe('3 - Crie uma header para a sua aplicação', () => {
  it(
    'Será validado se ao navegar para a rota /carteiras, os elementos da header estão presentes',
    async () => {
      const initialEntries = ['/carteira'];

      const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });

      expect(screen.getByTestId('email-field')).toBeInTheDocument();
      expect(screen.getByTestId('total-field')).toBeInTheDocument();
      expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();

      const { pathname } = history.location;

      expect(pathname).toBe('/carteira');
    },
  );
  it(
    'Será validado se o campo "Email" da header traz o e-mail informado no login',
    async () => {
      renderWithRouterAndRedux(<App />);

      const email = 'userTest@gmail.com';

      const button = screen.getByRole('button', { name: /entrar/i });

      const emailInput = screen.getByTestId(login, { name: /email/i });
      userEvent.type(emailInput, email);

      const passwordInput = screen.getByTestId(pass, { name: /senha/i });
      userEvent.type(passwordInput, '123456');

      expect(button).toBeEnabled();

      userEvent.click(button);

      const emailHeader = screen.getByTestId('email-field');

      expect(emailHeader.innerHTML).toBe(`Email:${email}`);
    },
  );
});

describe('4 - Crie um formulário para identificação', () => {
  it(
    'Será validado se ao navegar para a rota /carteiras, os elementos do formulário estão presentes',
    async () => {
      const initialEntries = ['/carteira'];

      renderWithRouterAndRedux(<Wallet />, { initialEntries });

      const valueInput = screen.getByTestId('value-input');
      const descriptionInput = screen.getByTestId('description-input');
      const selectCurrency = screen.getByTestId('currency-input');
      const selectMethod = screen.getByTestId('method-input');
      const tagMethod = screen.getByTestId('tag-input');

      const button = screen.getByRole('button', { name: /adicionar despesa/i });

      expect(valueInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(selectCurrency).toBeInTheDocument();
      expect(selectMethod).toBeInTheDocument();
      expect(tagMethod).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    },
  );

  it('Será validado se é possivel salvar uma nova despesa no estado corretamente', () => {
    const INITIAL_STATE = {
      expenses: [],
    };
    const timestamp = '2023-02-01 17:07:53';
    const { store } = renderWithRouterAndRedux(<WalletForm />, { INITIAL_STATE });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(valueInput.value).toBe('');

    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput.innerHTML).toBe('');

    expect(button).toBeInTheDocument();

    userEvent.type(valueInput, '10');
    expect(valueInput.value).toBe('10');

    userEvent.type(descriptionInput, 'Breakfest');
    expect(descriptionInput.value).toBe('Breakfest');

    userEvent.click(button);

    const expectStore = {
      value: '10',
      description: 'Breakfest',
      method: 'Dinheiro',
      tag: 'Breakfest',
      id: 0,
      currency: 'USD',
      exchangeRates: {
        USD: {
          code: 'USD',
          codein: 'BRL',
          name: 'Dólar Americano/Real Brasileiro',
          high: '5.1094',
          low: '5.0463',
          varBid: '-0.0218',
          pctChange: '-0.43',
          bid: '5.0505',
          ask: '5.0521',
          timestamp: '1675282074',
          create_date: '2023-02-01 17:07:54',
        },
        USDT: {
          code: 'USD',
          codein: 'BRLT',
          name: 'Dólar Americano/Real Brasileiro Turismo',
          high: '5.13',
          low: '5.06',
          varBid: '0.02',
          pctChange: '0.39',
          bid: '4.97',
          ask: '5.27',
          timestamp: '1675280160',
          create_date: '2023-02-01 16:36:00',
        },
        CAD: {
          code: 'CAD',
          codein: 'BRL',
          name: 'Dólar Canadense/Real Brasileiro',
          high: '3.8301',
          low: '3.7933',
          varBid: '-0.0096',
          pctChange: '-0.25',
          bid: '3.8016',
          ask: '3.8039',
          timestamp: '1675282072',
          create_date: '2023-02-01 17:07:52',
        },
        GBP: {
          code: 'GBP',
          codein: 'BRL',
          name: 'Libra Esterlina/Real Brasileiro',
          high: '6.2823',
          low: '6.2294',
          varBid: '0.0048',
          pctChange: '0.08',
          bid: '6.252',
          ask: '6.2578',
          timestamp: '1675282073',
          create_date: timestamp,
        },
        ARS: {
          code: 'ARS',
          codein: 'BRL',
          name: 'Peso Argentino/Real Brasileiro',
          high: '0.0273',
          low: '0.027',
          varBid: '-0.0001',
          pctChange: '-0.37',
          bid: '0.027',
          ask: '0.027',
          timestamp: '1675282073',
          create_date: timestamp,
        },
        BTC: {
          code: 'BTC',
          codein: 'BRL',
          name: 'Bitcoin/Real Brasileiro',
          high: '119.251',
          low: '116.817',
          varBid: '1010',
          pctChange: '0.85',
          bid: '119.201',
          ask: '119.25',
          timestamp: '1675282076',
          create_date: '2023-02-01 17:07:56',
        },
        LTC: {
          code: 'LTC',
          codein: 'BRL',
          name: 'Litecoin/Real Brasileiro',
          high: '502',
          low: '476',
          varBid: '17.31',
          pctChange: '3.58',
          bid: '498.24',
          ask: '501.66',
          timestamp: '1675282077',
          create_date: '2023-02-01 17:07:57',
        },
        EUR: {
          code: 'EUR',
          codein: 'BRL',
          name: 'Euro/Real Brasileiro',
          high: '5.5739',
          low: '5.5058',
          varBid: '0.0404',
          pctChange: '0.73',
          bid: '5.5482',
          ask: '5.5535',
          timestamp: '1675282073',
          create_date: timestamp,
        },
        JPY: {
          code: 'JPY',
          codein: 'BRL',
          name: 'Iene Japonês/Real Brasileiro',
          high: '0.03952',
          low: '0.03891',
          varBid: '0.0002',
          pctChange: '0.51',
          bid: '0.03919',
          ask: '0.03921',
          timestamp: '1675282066',
          create_date: '2023-02-01 17:07:46',
        },
        CHF: {
          code: 'CHF',
          codein: 'BRL',
          name: 'Franco Suíço/Real Brasileiro',
          high: '5.5835',
          low: '5.5189',
          varBid: '0.0221',
          pctChange: '0.4',
          bid: '5.5573',
          ask: '5.5586',
          timestamp: '1675282073',
          create_date: timestamp,
        },
        AUD: {
          code: 'AUD',
          codein: 'BRL',
          name: 'Dólar Australiano/Real Brasileiro',
          high: '3.6096',
          low: '3.57',
          varBid: '0.0235',
          pctChange: '0.66',
          bid: '3.601',
          ask: '3.6032',
          timestamp: '1675282072',
          create_date: '2023-02-01 17:07:52',
        },
        CNY: {
          code: 'CNY',
          codein: 'BRL',
          name: 'Yuan Chinês/Real Brasileiro',
          high: '0.7575',
          low: '0.7491',
          varBid: '-0.0019',
          pctChange: '-0.25',
          bid: '0.7492',
          ask: '0.7494',
          timestamp: '1675282024',
          create_date: '2023-02-01 17:07:04',
        },
        ILS: {
          code: 'ILS',
          codein: 'BRL',
          name: 'Novo Shekel Israelense/Real Brasileiro',
          high: '1.4802',
          low: '1.4625',
          varBid: '0.0035',
          pctChange: '0.24',
          bid: '1.4725',
          ask: '1.4729',
          timestamp: '1675282027',
          create_date: '2023-02-01 17:07:07',
        },
        ETH: {
          code: 'ETH',
          codein: 'BRL',
          name: 'Ethereum/Real Brasileiro',
          high: '8.28924',
          low: '8.00003',
          varBid: '110.05',
          pctChange: '1.35',
          bid: '8.27495',
          ask: '8.28331',
          timestamp: '1675282069',
          create_date: '2023-02-01 17:07:49',
        },
        XRP: {
          code: 'XRP',
          codein: 'BRL',
          name: 'XRP/Real Brasileiro',
          high: '2.1',
          low: '2.03',
          varBid: '-0.02',
          pctChange: '-0.74',
          bid: '2.08',
          ask: '2.08',
          timestamp: '1675282045',
          create_date: '2023-02-01 17:07:25',
        },
        DOGE: {
          code: 'DOGE',
          codein: 'BRL',
          name: 'Dogecoin/Real Brasileiro',
          high: '0.494113',
          low: '0.451344',
          varBid: '-0.02178401',
          pctChange: '-4.42',
          bid: '0.470703',
          ask: '0.470703',
          timestamp: '1675282071',
          create_date: '2023-02-01 17:07:51',
        },
      },
    };
    expect(store.getState().wallet.expenses[0]).toMatchObject(expectStore);
  });
});
