import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../app/login/page'; // Adjust the import path accordingly
import { signIn } from 'next-auth/react';
// import '@testing-library/jest-dom/extend-expect';

jest.mock('next-auth/react');

describe('LoginPage', () => {
  const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

  beforeEach(() => {
    mockSignIn.mockClear();
  });

  test('renders the component and form elements correctly', () => {
    render(<LoginPage searchParams={{}} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    render(<LoginPage searchParams={{}} />);

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('calls signIn with correct data on valid submit', async () => {
    render(<LoginPage searchParams={{}} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        username: 'testuser',
        password: 'password123',
        callbackUrl: '/dashboard/projects'
      });
    });
  });

  test('displays login error message if login fails', () => {
    render(<LoginPage searchParams={{ error: 'true' }} />);

    expect(screen.getByText(/login failed/i)).toBeInTheDocument();
  });
});
