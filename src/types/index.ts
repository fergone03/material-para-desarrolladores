export interface Category {
  id: string;
  name: string;
}

export interface Page {
  id: string;
  title: string;
  url: string;
  description: string | null;
  category_id: string | null;
  category?: Category;
  is_common: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}
