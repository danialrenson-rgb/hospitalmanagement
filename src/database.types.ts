export type Database = {
  public: {
    Tables: {
      hospital_settings: {
        Row: {
          user_id: string;
          hospital_name: string;
          username: string;
          logo_data_url: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          hospital_name: string;
          username: string;
          logo_data_url?: string;
          updated_at?: string;
        };
        Update: {
          hospital_name?: string;
          username?: string;
          logo_data_url?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      patients: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          age: number;
          gender: string;
          phone: string;
          email: string;
          blood_group: string;
          department: string;
          doctor: string;
          last_visit: string;
          status: string;
          diagnosis: string;
          allergies: string;
          created_at: string;
        };
        Insert: {
          id: string;
          owner_id: string;
          name: string;
          age: number;
          gender: string;
          phone: string;
          email: string;
          blood_group: string;
          department: string;
          doctor: string;
          last_visit: string;
          status: string;
          diagnosis: string;
          allergies: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          age?: number;
          gender?: string;
          phone?: string;
          email?: string;
          blood_group?: string;
          department?: string;
          doctor?: string;
          last_visit?: string;
          status?: string;
          diagnosis?: string;
          allergies?: string;
        };
        Relationships: [];
      };
      lab_orders: {
        Row: {
          invoice: string;
          owner_id: string;
          date: string;
          patient: string;
          phone: string;
          total: number;
          payment: string;
          status: string;
          created_at: string;
        };
        Insert: {
          invoice: string;
          owner_id: string;
          date: string;
          patient: string;
          phone: string;
          total: number;
          payment: string;
          status: string;
          created_at?: string;
        };
        Update: {
          date?: string;
          patient?: string;
          phone?: string;
          total?: number;
          payment?: string;
          status?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
