export const TYPE_OPTIONS = ['Spreadsheet', 'Text', 'PDF'];
export const YEAR_OPTIONS = Array.from(
  { length: 3 }, 
  (_, index) => (new Date().getFullYear() - index).toString()
);
export const CATEGORY_OPTIONS = ['R1', 'Waybill', 'STB-54', 'TOFC', 'AAR Index', 'Tare Weight', 'Loss & Damage', 'QCS', 'Cost of Capital'];
export const FILE_STATUS = ['uploaded', 'processing', 'completed', 'error'];

const currentYear = new Date().getFullYear();
export const YEAR_OPTIONS_LIST = [
  { label: "ALL", value: "ALL" },
  ...[currentYear - 2, currentYear - 1, currentYear].map((year) => ({
    label: year.toString(),
    value: year.toString(),
  })),
];
export const TYPE_OPTIONS_LIST = ['ALL', ...TYPE_OPTIONS];
export const CATEGORY_OPTIONS_LIST = ['ALL', ...CATEGORY_OPTIONS];
export const STATUS_OPTIONS_LIST = ['ALL', ...FILE_STATUS];
export const FILE_STATUS_COLORS = [ '#f0ad4e', '#5bc0de', '#5cb85c', '#d9534f'];
export const FILE_STATUS_ICONS = ['fa-clock', 'fa-spinner', 'fa-check', 'fa-exclamation-triangle'];
export const API_URL_ROOT = 'https://localhost';
export const PORT_NUMBER = 61076;
export const HOST = `${API_URL_ROOT}:${PORT_NUMBER}`;
export const HEALTH_CHECK_URL = `${HOST}/health`;
export const API_URL = `${HOST}/api`;
export const UPLOAD_URL = `${API_URL}/S3File/upload`;
export const DOWNLOAD_URL = `${API_URL}/S3File/download`;
export const FILE_STATUS_URL = `${API_URL}/S3File/filter`;
export const LOGIN_URL = `${API_URL}/auth/login`; 
export const USER_LIST_URL = `${API_URL}/User`;
export const ADD_USER_URL = `${API_URL}/User/register`;
export const DELETE_USER_URL = `${API_URL}/User/deleteUser`;
export const DELETE_FILE_URL = `${API_URL}/S3File`;
export const SESSION_LENGTH = 30; // Session length in minutes