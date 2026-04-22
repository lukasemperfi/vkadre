import type { Database } from "~~/types/supabase";

export type PortfolioRow = Database["public"]["Tables"]["portfolio"]["Row"];

export const usePortfolioApi = () => {
  const supabase = useSupabaseClient<Database>();
  return {
    async getPortfolios(): Promise<PortfolioRow[]> {
      const { data, error } = await supabase.from("portfolio").select("*");

      if (error) throw error;

      return data ?? [];
    },
  };
};
