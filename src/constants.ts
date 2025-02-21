export const TYPE_OPTIONS = ['Spreadsheet', 'Text', 'PDF'];
export const YEAR_OPTIONS = Array.from(
  { length: 6 }, 
  (_, index) => (new Date().getFullYear() - index).toString()
);
export const CATEGORY_OPTIONS = ['R1', 'Waybill', 'STB-54', 'TOFC', 'AAR Index', 'Tare Weight', 'Loss & Damage', 'QCS', 'Cost of Capital'];