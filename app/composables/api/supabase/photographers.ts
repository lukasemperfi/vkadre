import type { Database } from "~~/types/supabase";

export type PhotographerRow = Database["public"]["Tables"]["photographers"]["Row"];
export type PortfolioRow = Database["public"]["Tables"]["portfolio"]["Row"];

export type PhotographerWithPortfolio = PhotographerRow & {
  portfolio: PortfolioRow[];
};

export const usePhotographersApi = () => {
  const supabase = useSupabaseClient<Database>();
  return {
    async getPhotographers(): Promise<PhotographerRow[]> {
      const { data, error } = await supabase.from("photographers").select("*");

      if (error) throw error;

      return data ?? [];
    },

    async getPhotographer(
      id: string
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

