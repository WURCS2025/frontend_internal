import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import UserUpload from "./UserUpload";
import { useUploadStore } from "../../stores/uploadstore";
import { useAuthStore } from "../../stores/authStore";
import { BrowserRouter } from "react-router-dom";

// Mock constants
jest.mock("../../constants", () => ({
  UPLOAD_URL: "http://mock-upload-url",
  TYPE_OPTIONS: ["PDF", "DOC"],
  YEAR_OPTIONS: ["2023", "2024"],
  CATEGORY_OPTIONS: ["A", "B"],
}));

// Mock ScanFile component
jest.mock("../common/ScanFile", () => (props: any) => (
  <div data-testid="scanfile-mock">
    ScanFileMock
    <button onClick={() => props.onResult({ clean: true, message: "Clean" })}>MockScanPass</button>
    <button onClick={() => props.onResult({ clean: false, message: "Virus found" })}>MockScanFail</button>
  </div>
));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock uploadstore and authStore
const setFile = jest.fn();
const setType = jest.fn();
const setYear = jest.fn();
const setCategory = jest.fn();
const setUser = jest.fn();
const checkSession = jest.fn();
const fileMock = new File(["file-content"], "test.pdf", { type: "application/pdf" });

jest.mock("../../stores/uploadstore", () => ({
  useUploadStore: jest.fn(),
}));
jest.mock("../../stores/authStore", () => ({
  useAuthStore: jest.fn(),
}));

function setupUploadStore(overrides = {}) {
  (useUploadStore as jest.Mock).mockReturnValue({
    file: null,
    type: "",
    year: "",
    category: "",
    user: "testuser",
    setFile,
    setType,
    setYear,
    setCategory,
    setUser,
    ...overrides,
  });
}

function setupAuthStore(overrides = {}) {
  (useAuthStore as jest.Mock).mockReturnValue({
    userLogin: "testuser",
    checkSession,
    ...overrides,
  });
}

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  setupUploadStore();
  setupAuthStore();
  localStorage.setItem("user", "testuser");
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  localStorage.clear();
});

describe("UserUpload", () => {
  it("renders form fields and file input", () => {
    renderWithRouter(<UserUpload />);
    expect(screen.getByText(/Upload File/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag & drop a file here/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/File Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload/i })).toBeInTheDocument();
  });

  it("shows error if submitting without file", async () => {
    renderWithRouter(<UserUpload />);
    fireEvent.click(screen.getByRole("button", { name: /Upload/i }));
    expect(await screen.findByText(/Please select a file to upload/i)).toBeInTheDocument();
  });

  it("shows error if submitting without type/year/category", async () => {
    setupUploadStore({ file: fileMock });
    renderWithRouter(<UserUpload />);
    fireEvent.click(screen.getByRole("button", { name: /Upload/i }));
    expect(await screen.findByText(/Please select a file type/i)).toBeInTheDocument();
  });

  it("updates file name on file selection", () => {
    renderWithRouter(<UserUpload />);
    const input = screen.getByLabelText(/Drag & drop a file here/i).parentElement!.querySelector("input[type='file']")!;
    fireEvent.change(input, { target: { files: [fileMock] } });
    expect(setFile).toHaveBeenCalledWith(fileMock);
    expect(screen.getByText("test.pdf")).toBeInTheDocument();
  });

  it("handles drag and drop file", () => {
    renderWithRouter(<UserUpload />);
    const dropZone = screen.getByLabelText(/Drag & drop a file here/i).parentElement!;
    const data = { dataTransfer: { files: [fileMock] } };
    fireEvent.drop(dropZone, data);
    expect(setFile).toHaveBeenCalledWith(fileMock);
    expect(screen.getByText("test.pdf")).toBeInTheDocument();
  });

  it("shows scan component and handles clean scan", async () => {
    setupUploadStore({ file: fileMock, type: "PDF", year: "2023", category: "A" });
    renderWithRouter(<UserUpload />);
    fireEvent.click(screen.getByRole("button", { name: /Upload/i }));
    expect(await screen.findByText(/Scanning file for viruses/i)).toBeInTheDocument();
    // Simulate scan pass
    fireEvent.click(screen.getByText("MockScanPass"));
    await waitFor(() => expect(screen.getByText(/File passed virus scan/i)).toBeInTheDocument());
  });

  it("shows scan component and handles failed scan", async () => {
    setupUploadStore({ file: fileMock, type: "PDF", year: "2023", category: "A" });
    renderWithRouter(<UserUpload />);
    fireEvent.click(screen.getByRole("button", { name: /Upload/i }));
    expect(await screen.findByText(/Scanning file for viruses/i)).toBeInTheDocument();
    // Simulate scan fail
    fireEvent.click(screen.getByText("MockScanFail"));
    await waitFor(() => expect(screen.getByText(/File failed virus scan/i)).toBeInTheDocument());
    expect(screen.getByText(/Please select a different file/i)).toBeInTheDocument();
  });

  it("submits form and uploads file after clean scan", async () => {
    setupUploadStore({ file: fileMock, type: "PDF", year: "2023", category: "A", user: "testuser" });
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as any;
    renderWithRouter(<UserUpload />);
    fireEvent.click(screen.getByRole("button", { name: /Upload/i }));
    fireEvent.click(screen.getByText("MockScanPass"));
    // Wait for upload to finish (simulate delay)
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => expect(screen.getByText(/File uploaded successfully/i)).toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledWith(
      "http://mock-upload-url",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("shows error if upload fails", async () => {
    setupUploadStore({ file: fileMock, type: "PDF", year: "2023", category: "A", user: "testuser" });
    global.fetch = jest.fn().mockResolvedValue({ ok: false, statusText: "Server error" }) as any;
    renderWithRouter(<UserUpload />);
    fireEvent.click(screen.getByRole("button", { name: /Upload/i }));
    fireEvent.click(screen.getByText("MockScanPass"));
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => expect(screen.getByText(/Failed to upload file/i)).toBeInTheDocument());
  });

  it("redirects to login if session is invalid", async () => {
    localStorage.removeItem("user");
    renderWithRouter(<UserUpload />);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
  });
});