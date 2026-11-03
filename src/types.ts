export type TransactionType = 'income' | 'expense';

export type ExpenseCategory =
  | 'education'
  | 'living'
  | 'food'
  | 'transport'
  | 'tech'
  | 'entertainment'
  | 'health'
  | 'income';

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number; // số tiền dương (dấu âm/dương được suy ra từ type)
  type: TransactionType;
  category: ExpenseCategory;
  categoryName: string;
  date: string; // Định dạng YYYY-MM-DD
  description: string;
  paymentMethod: string;
  contactEmail: string;
  merchantOrPayer: string;
  tags: string[];
  invoiceNumber: string;
  isRecurring?: boolean;
}

export type FilterType = 'all' | 'income' | 'expense';
export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

export interface FilterState {
  searchQuery: string;
  type: FilterType;
  category: string; // 'all' hoặc category id cụ thể
  onlyFavorites: boolean;
  sortBy: SortOption;
}

export interface ExpenseState {
  items: ExpenseItem[];
  favorites: string[]; // Danh sách các id được đánh dấu yêu thích
  filters: FilterState;
  isLoading: boolean;
  selectedItemForModal: ExpenseItem | null;
  editingItem: ExpenseItem | null;
  isFormModalOpen: boolean;
}

export type ExpenseAction =
  | { type: 'SET_ITEMS'; payload: ExpenseItem[] }
  | { type: 'ADD_ITEM'; payload: ExpenseItem }
  | { type: 'UPDATE_ITEM'; payload: ExpenseItem }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_TYPE_FILTER'; payload: FilterType }
  | { type: 'SET_CATEGORY_FILTER'; payload: string }
  | { type: 'SET_ONLY_FAVORITES'; payload: boolean }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPEN_DETAIL_MODAL'; payload: ExpenseItem }
  | { type: 'CLOSE_DETAIL_MODAL' }
  | { type: 'OPEN_FORM_MODAL'; payload?: ExpenseItem }
  | { type: 'CLOSE_FORM_MODAL' }
  | { type: 'RESET_DEFAULT_DATA' };
