import { render } from '@testing-library/react';
import Page from '../../app/dashboard/page';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

jest.mock('../../server/auth', () => ({
  getServerAuthSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Page component', () => {
  it('should redirect if no user is found in the auth session', async () => {
    // getServerAuthSession.(null);
    
    await Page();
    
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('should render the dashboard page if user is found in the auth session', async () => {
    // getServerAuthSession.mockResolvedValueOnce({ user: { name: 'Test User' } });

    const { getByText } = render(await Page());

    expect(getByText('Hello, Dashboard Page!')).toBeInTheDocument();
  });
});