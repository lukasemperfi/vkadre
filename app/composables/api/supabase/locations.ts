export const useLocationsApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getLocations(): Promise<LocationWithRelations[]> {
      const { data, error } = await supabase
        .from("locations")
        .select("*,service_packages(*),slots(*),portfolio(*)");

      if (error) throw error;

      return data ?? [];
    },

    async getLocation(id: string): Promise<LocationWithRelations | null> {
      const { data, error } = await supabase
        .from("locations")
        .select("*,service_packages(*),slots(*),portfolio(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      return data ?? null;
    },
  };
};
