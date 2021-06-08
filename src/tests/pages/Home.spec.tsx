/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock('../../services/stripe');

describe('Home page', () => {
  it('should render correctly', () => {
    render(<Home product={{ priceId: '1', amount: 9.99 }} />);

    expect(screen.getByText('for $9.99 month')).toBeInTheDocument();
  });

  it('should load initial data', async () => {
    const retrievePricesMocked = mocked(stripe.prices.retrieve);

    retrievePricesMocked.mockResolvedValueOnce({
      id: '1',
      unit_amount: 999,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: '1',
            amount: '$9.99',
          },
        },
      }),
    );
  });
});
