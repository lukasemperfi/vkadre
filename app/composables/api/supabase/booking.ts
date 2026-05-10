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
  };
};
