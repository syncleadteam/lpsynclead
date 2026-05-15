export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      automation_modules: {
        Row: {
          base_price: number
          category: Database["public"]["Enums"]["module_category_enum"]
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          base_price?: number
          category: Database["public"]["Enums"]["module_category_enum"]
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          base_price?: number
          category?: Database["public"]["Enums"]["module_category_enum"]
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          business_sector: string
          client_name: string
          company_name: string
          created_at: string
          email: string
          id: string
          phone: string
        }
        Insert: {
          business_sector: string
          client_name: string
          company_name: string
          created_at?: string
          email: string
          id?: string
          phone: string
        }
        Update: {
          business_sector?: string
          client_name?: string
          company_name?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
        }
        Relationships: []
      }
      quote_modules: {
        Row: {
          created_at: string
          id: string
          module_id: string
          module_price: number
          quote_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          module_id: string
          module_price: number
          quote_id: string
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: string
          module_price?: number
          quote_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "automation_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_modules_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          agents_quantity: Database["public"]["Enums"]["agents_quantity_enum"]
          client_id: string
          created_at: string
          id: string
          observations: string | null
          status: string
          subtotal: number
          total_price: number
        }
        Insert: {
          agents_quantity: Database["public"]["Enums"]["agents_quantity_enum"]
          client_id: string
          created_at?: string
          id?: string
          observations?: string | null
          status?: string
          subtotal?: number
          total_price?: number
        }
        Update: {
          agents_quantity?: Database["public"]["Enums"]["agents_quantity_enum"]
          client_id?: string
          created_at?: string
          id?: string
          observations?: string | null
          status?: string
          subtotal?: number
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_pipeline: {
        Row: {
          client_id: string
          created_at: string
          current_stage: string
          id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          current_stage?: string
          id?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          current_stage?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_pipeline_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      submit_lead_quote: {
        Args: {
          _agents_quantity: Database["public"]["Enums"]["agents_quantity_enum"]
          _client: Json
          _module_codes: string[]
          _observations: string
        }
        Returns: Json
      }
    }
    Enums: {
      agents_quantity_enum: "1_agente" | "2_agentes" | "3_agentes"
      module_category_enum: "agent" | "feature"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agents_quantity_enum: ["1_agente", "2_agentes", "3_agentes"],
      module_category_enum: ["agent", "feature"],
    },
  },
} as const
