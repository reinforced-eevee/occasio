import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import * as router from 'react-router'
import '@testing-library/jest-dom/';

import Login from '../src/components/Login';
import Signup from '../src/components/Signup';

const navigate = jest.fn()

describe('Unit testing React components', () => {

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(true),
        })
      );
    })

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Signup', () => {
    let container;

    beforeEach(() => {
      const rendered = render(
        <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
      );
      getByText = rendered.getByText;
      getByLabelText = rendered.getByLabelText;
      container = rendered.container;
    })

    test('Renders the sign up page ', () => {
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent('Sign Up Page')
      expect(getByText(/Email/i)).toBeInTheDocument();
      expect(getByText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Sign up')
      expect(getByText(/Already a user?/i)).toBeInTheDocument();
      const loginLink = screen.getByRole('link', { name: 'Log in here' });
      expect(loginLink).toBeInTheDocument()
      expect(loginLink).toHaveAttribute('href', '/');;
    })

    test('Log in link redirects to "/"', async () => {
      const loginLink = screen.getByRole('link', { name: 'Log in here' });

      userEvent.click(loginLink);  
      await waitFor(() => expect(window.location.pathname).toBe('/'));
    })

    test('Sign up successfully performed via button', async () => {
      const emailInput = container.querySelector('input[name="email"]');
      const passwordInput = container.querySelector('input[name="password"]');
      await userEvent.type(emailInput, 'hello@gmail.com');
      await userEvent.type(passwordInput, 'hello1234');

      expect(emailInput.value).toBe('hello@gmail.com');

      const button = screen.getByRole('button', {name: /sign up/i});
      userEvent.click(button)
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/home')
      });
    })

  })
})