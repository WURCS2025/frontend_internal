import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserLogin from '../src/components/user/UserLogin';
import { vi } from 'vitest';

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock useAuthStore
const loginMock = vi.fn();
vi.mock('../src/stores/authStore', () => ({
  useAuthStore: () => ({
    login: loginMock,
  }),
}));

describe('UserLogin', () => {
  it('renders login form', () => {
    render(<UserLogin />, { wrapper: MemoryRouter });
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('navigates on successful login', async () => {
    loginMock.mockResolvedValueOnce(true);

    render(<UserLogin />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('test', '123', 'user');
      expect(mockedNavigate).toHaveBeenCalledWith('/status');
    });
  });

  it('shows error on failed login', async () => {
    loginMock.mockResolvedValueOnce(false);

    render(<UserLogin />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });
});
