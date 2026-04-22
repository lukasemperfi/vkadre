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
      bookings: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          payment_link: string | null
          result_gallery_url: string | null
          service_package_id: string | null
          slot_id: string | null
          status: string | null
          total_price: number
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          payment_link?: string | null
          result_gallery_url?: string | null
          service_package_id?: string | null
          slot_id?: string | null
          status?: string | null
          total_price: number
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          payment_link?: string | null
          result_gallery_url?: string | null
          service_package_id?: string | null
          slot_id?: string | null
          status?: string | null
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_package_id_fkey"
            columns: ["service_package_id"]
            isOneToOne: false
            referencedRelation: "service_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: true
            referencedRelation: "slots"
            referencedColumns: ["id"]
          },
        ]
      }
      location_reviews: {
        Row: {
          content: string
          created_at: string | null
          id: string
          location_id: string | null
          rating: number | null
          user_city: string | null
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          location_id?: string | null
          rating?: number | null
          user_city?: string | null
          user_name: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          location_id?: string | null
          rating?: number | null
          user_city?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_reviews_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          available_dates: string | null
          available_time_range: string | null
          city: string
          created_at: string | null
          description: string | null
          event_name: string | null
          gallery_urls: string[] | null
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          address?: string | null
          available_dates?: string | null
          available_time_range?: string | null
          city: string
          created_at?: string | null
          description?: string | null
          event_name?: string | null
          gallery_urls?: string[] | null
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          address?: string | null
          available_dates?: string | null
          available_time_range?: string | null
          city?: string
          created_at?: string | null
          description?: string | null
          event_name?: string | null
          gallery_urls?: string[] | null
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      photographers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string
          id: string
          role: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          role?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          image_url: string
          is_main_page: boolean | null
          location_id: string | null
          photographer_id: string | null
          title: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_main_page?: boolean | null
          location_id?: string | null
          photographer_id?: string | null
          title?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_main_page?: boolean | null
          location_id?: string | null
          photographer_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_photographer_id_fkey"
            columns: ["photographer_id"]
            isOneToOne: false
            referencedRelation: "photographers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      service_packages: {
        Row: {
          currency: string | null
          duration_minutes: number
          id: string
          location_id: string | null
          photo_count: number | null
          price: number
          service_id: string | null
        }
        Insert: {
          currency?: string | null
          duration_minutes: number
          id?: string
          location_id?: string | null
          photo_count?: number | null
          price: number
          service_id?: string | null
        }
        Update: {
          currency?: string | null
          duration_minutes?: number
          id?: string
          location_id?: string | null
          photo_count?: number | null
          price?: number
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_packages_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_packages_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          main_image: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          main_image?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          main_image?: string | null
          title?: string
        }
        Relationships: []
      }
      slots: {
        Row: {
          end_time: string
          id: string
          is_booked: boolean | null
          location_id: string | null
          photographer_id: string | null
          start_time: string
        }
        Insert: {
          end_time: string
          id?: string
          is_booked?: boolean | null
          location_id?: string | null
          photographer_id?: string | null
          start_time: string
        }
        Update: {
          end_time?: string
          id?: string
          is_booked?: boolean | null
          location_id?: string | null
          photographer_id?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "slots_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slots_photographer_id_fkey"
            columns: ["photographer_id"]
            isOneToOne: false
            referencedRelation: "photographers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
