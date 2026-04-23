export const usePortfolioApi = () => {
  const supabase = useSupabaseClient();
  return {
    async getPortfolios(): Promise<PortfolioRow[]> {
      const { data, error } = await supabase.from("portfolio").select("*");

      if (error) throw error;

      return data ?? [];
    },
  };
};
