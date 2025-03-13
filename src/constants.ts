export const TYPE_OPTIONS = ['Spreadsheet', 'Text', 'PDF'];
export const YEAR_OPTIONS = Array.from(
  { length: 3 }, 
  (_, index) => (new Date().getFullYear() - index).toString()
);
export const CATEGORY_OPTIONS = ['R1', 'Waybill', 'STB-54', 'TOFC', 'AAR Index', 'Tare Weight', 'Loss & Damage', 'QCS', 'Cost of Capital'];
export const FILE_STATUS_OPTIONS = ['Pending', 'Processing', 'Completed', 'Error'];
export const FILE_STATUS_COLORS = [ '#f0ad4e', '#5bc0de', '#5cb85c', '#d9534f'];
export const FILE_STATUS_ICONS = ['fa-clock', 'fa-spinner', 'fa-check', 'fa-exclamation-triangle'];
export const API_URL_ROOT = 'https://localhost';
export const PORT_NUMBER = 55733;
export const API_URL = `${API_URL_ROOT}:${PORT_NUMBER}/api`;
export const UPLOAD_URL = `${API_URL}/S3File/upload`;
export const DOWNLOAD_URL = `${API_URL}/S3File/download`;
export const FILE_STATUS_URL = `${API_URL}/files/status`;
export const LOGIN_URL = `${API_URL}/auth/login`; 