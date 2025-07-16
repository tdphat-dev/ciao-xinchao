export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email?: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          status: string;
          total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          status?: string;
          total?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          status?: string;
          total?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: string;
        };
        Insert: {
          id?: string;
          name?: string;
          price?: number;
          category?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          category?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
