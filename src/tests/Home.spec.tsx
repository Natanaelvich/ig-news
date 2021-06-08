/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import Home from '../pages';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

describe('Home page', () => {
  it('should render correctly', () => {
    render(<Home product={{ priceId: '1', amount: 9.99 }} />);

    expect(screen.getByText('for $9.99 month')).toBeInTheDocument();
  });
});
