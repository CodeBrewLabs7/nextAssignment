// __tests__/Page.test.js
import { render, waitFor } from '@testing-library/react';
import Page from '../../app/dashboard/projects/page';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import ProductTable from '../../components/Table/CustomTable';


jest.mock('../../server/auth', () => ({
  getServerAuthSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('../../components/Table/CustomTable', () => jest.fn(() => <div>ProductTable Component</div>));

describe('Product Page', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          products: [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
            { id: 3, name: 'Product 3' },
            { id: 4, name: 'Product 4' },
          ],
          total: 4,
        }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect if no user is found in the auth session', async () => {
    // (getServerAuthSession as jest.Mock).mockResolvedValueOnce(null);

    await Page();

    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('should render the ProductTable component if user is found in the auth session', async () => {
    // (getServerAuthSession as jest.Mock).mockResolvedValueOnce({ user: { name: 'Test User' } });

    const { getByText } = render(await Page());

    await waitFor(() => {
      expect(getByText('ProductTable Component')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/products?limit=4");
    expect(ProductTable).toHaveBeenCalledWith({ initialItems: expect.any(Array), initialTotalCount: 4 }, {});
  });
});
