export const usePhotographersApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getPhotographers(): Promise<PhotographerRow[]> {
      const { data, error } = await supabase.from("photographers").select("*");

      if (error) throw error;

      return data ?? [];
    },

    async getPhotographer(
      id: string,
    ): Promise<PhotographerWithPortfolio | null> {
      const { data, error } = await supabase
        .from("photographers")
        .select("*,portfolio(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      return data ?? null;
    },
  };
};
