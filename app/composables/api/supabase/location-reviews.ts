export const useLocationReviewsApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getLocationReviews(): Promise<LocationReviewWithLocation[]> {
      const { data, error } = await supabase
        .from("location_reviews")
        .select("*,locations(*)")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },

    async addLocationReview(
      payload: Pick<
        LocationReviewInsert,
        "user_name" | "user_city" | "location_id" | "content"
      >,
    ): Promise<LocationReviewRow> {
      const { data, error } = await supabase
        .from("location_reviews")
        .insert(payload)
        .select("*")
        .single();

      if (error) throw error;

      return data;
    },
  };
};
