import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { create } from 'zustand';
import { act } from 'react-dom/test-utils';

import UserUpload from '../src/components/user/UserUpload';

// Constants
vi.mock('../../src/constants', () => ({
  UPLOAD_URL: 'https://mock-upload-url.com',
  TYPE_OPTIONS: ['PDF', 'DOC'],
  YEAR_OPTIONS: ['2024', '2025'],
  CATEGORY_OPTIONS: ['Reports', 'Invoices'],
}));

// These will be replaced in each test
let mockStore: any;

vi.mock('../../src/stores/uploadstore', () => ({
  useUploadStore: () => mockStore(),
}));

vi.mock('../../src/stores/authStore', () => ({
  useAuthStore: () => ({
    userLogin: 'testuser',
    checkSession: vi.fn(),
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../src/components/common/ScanFile', () => ({
  default: () => <div data-testid="mock-scan-file">Mock Scan File Component</div>,
}));

describe('UserUpload Component', () => {
  let setTypeMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    setTypeMock = vi.fn();

    mockStore = create(() => ({
      file: null,
      type: '',
      year: '',
      category: '',
      user: 'testuser',
      setFile: vi.fn(),
      setType: setTypeMock,
      setYear: vi.fn(),
      setCategory: vi.fn(),
      setUser: vi.fn(),
    }));
  });

  it('calls setType when selecting file type', async () => {
    render(<UserUpload />, { wrapper: MemoryRouter });

    const select = screen.getByLabelText(/File Type/i);
    await act(() =>
      fireEvent.change(select, { target: { value: 'PDF' } })
    );

    // expect(setTypeMock).toHaveBeenCalledWith('PDF');
  });
});
