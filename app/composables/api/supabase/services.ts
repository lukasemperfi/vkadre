export const useServicesApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getServices(): Promise<ServiceWithRelations[]> {
      const { data, error } = await supabase
        .from("services")
        .select("*,portfolio(*),service_packages(*)")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return data ?? [];
    },

    async getService(id: string): Promise<ServiceWithRelations | null> {
      const { data, error } = await supabase
        .from("services")
        .select("*,portfolio(*),service_packages(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      return data ?? null;
    },
  };
};
