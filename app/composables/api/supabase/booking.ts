export interface CreateBookingPayload {
  location_id: string;
  start_time: string;
  end_time: string;
  name: string;
  phone: string;
  email?: string;
  duration_minutes: number;
  price: number;
  source?: number;
}

export interface Booking {
  id: string;
  location_id: string;
  start_time: string;
  end_time: string;
  name: string;
  phone: string;
  email: string | null;
  duration_minutes: number;
  price: number;
  source: number | null;
  status: string | null;
  payment_link: string | null;
  result_gallery_url: string | null;
  created_at: string | null;
}

export const useBookingsApi = () => {
  const supabase = useSupabaseClient();

  return {
    async createBooking(item: CreateBookingPayload) {
      const { data, error } = await supabase
        .from("bookings")
        .insert(item)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    async getBookings(): Promise<Booking[]> {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("start_time", { ascending: false });

      if (error) {
        throw error;
      }

      return data ?? [];
    },

    async getBookingsByLocation(locationId: string): Promise<Booking[]> {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("location_id", locationId)
        .order("start_time", { ascending: false });

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  };
};
