import { describe, test, vi } from "vitest"; // ✅ Import for Vitest
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUploadStore } from "../store";
import UploadForm from "./UploadForm";

// ✅ Use `vi.mock()` if running Vitest, else `jest.mock()`
const mockFn = typeof vi !== "undefined" ? vi : jest;
mockFn.mock("../store", () => ({
  useUploadStore: mockFn.fn(() => ({
    file: null,
    type: "",
    year: "",
    category: "",
    user: "",
    setFile: mockFn.fn(),
    setType: mockFn.fn(),
    setYear: mockFn.fn(),
    setCategory: mockFn.fn(),
    setUser: mockFn.fn(),
    uploadStatus: "",
    setUploadStatus: mockFn.fn(),
  })),
}));

describe("UploadForm Component", () => {
  test("renders form fields", () => {
    render(<UploadForm />);
    expect(screen.getByLabelText(/select file:/i)).toBeInTheDocument();
  });
});
