import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/';
import regeneratorRuntime from 'regenerator-runtime';

import App from '../src/components/App';
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';

  describe('Unit testing React components', () => {
    
    describe('Signup', () => {
      
      beforeAll(() => {

      })

      test('Renders the sign up page ', () => {
        const { container } = render(
          <MemoryRouter>
            <Signup />
          </MemoryRouter>
        );
        const formElement = container.querySelector('form');
        expect(formElement).toBeInTheDocument();
      })

    })
  })