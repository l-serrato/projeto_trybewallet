import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

const email = 'email-input';
const password = 'password-input';

describe('1 - Crie as rotas necessárias para a aplicação', () => {
  it(
    'A rota "/" é uma rota existente e que renderiza os componentes de login',
    async () => {
      const { history } = renderWithRouterAndRedux(<Login />);

      const emailInput = screen.getByTestId(email, { name: /email/i });
      const passwordInput = screen.getByTestId(password, { name: /senha/i });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();

      const { pathname } = history.location;

      expect(pathname).toBe('/');
    },
  );
  it(
    'A rota "/carteira" é uma rota existente e que renderiza um componente com o "data-testid" com valor "email-field"',
    async () => {
      const initialEntries = ['/carteira'];

      const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });

      expect(screen.getByTestId('email-field')).toBeInTheDocument();

      const { pathname } = history.location;

      expect(pathname).toBe('/carteira');
    },
  );
});

describe('2 - Crie um formulário para identificação', () => {
  it(
    'Será validado se ao navegar para a rota /, os inputs e o botão especificados estão presentes',
    async () => {
      renderWithRouterAndRedux(<Login />);

      const emailInput = screen.getByTestId(email, { name: /email/i });
      const passwordInput = screen.getByTestId(password, { name: /senha/i });
      const button = screen.getByRole('button', { name: /entrar/i });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    },
  );
  it(
    'Será validado se o botão só é habilitado se o input for um e-mail válido e a senha tiver 6 ou mais caracteres',
    async () => {
      renderWithRouterAndRedux(<Login />);

      const emailInput = screen.getByTestId(email, { name: /email/i });
      expect(emailInput).toBeInTheDocument();
      expect(emailInput.value).toBe('');

      const passwordInput = screen.getByTestId(password, { name: /senha/i });
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput.value).toBe('');

      const button = screen.getByRole('button', { name: /entrar/i });
      expect(button).toBeDisabled();

      userEvent.type(emailInput, 'test');
      expect(button).toBeDisabled();

      userEvent.type(passwordInput, '12345');
      expect(button).toBeDisabled();

      userEvent.type(emailInput, 'test@outlook.com');
      expect(button).toBeDisabled();

      userEvent.type(passwordInput, '123456');

      expect(button).toBeEnabled();
    },
  );

  it(
    'Será validado se ao clicar no botão habilitado, é feito o redirecionamento para a rota "/carteira" e existe um elemento com o "data-testid" com valor "email-field"',
    async () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const button = screen.getByRole('button', { name: /entrar/i });

      const emailInput = screen.getByTestId('email-input', { name: /email/i });
      userEvent.type(emailInput, 'userTest@gmail.com');

      const passwordInput = screen.getByTestId('password-input', { name: /senha/i });
      userEvent.type(passwordInput, '123456');

      expect(button).toBeEnabled();

      userEvent.click(button);

      expect(screen.getByTestId('email-field')).toBeInTheDocument();

      const { pathname } = history.location;

      expect(pathname).toBe('/carteira');
    },
  );
});
