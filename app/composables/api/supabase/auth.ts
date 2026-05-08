export const useAuthApi = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  return {
    async signUp(
      email: string,
      password: string,
      fullName: string,
      phone: string,
    ) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) throw error;
      return data;
    },

    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    async getUserProfile() {
      if (!user.value) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.value.sub)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        throw error;
      }

      return data;
    },

    async updateProfile(updates: {
      full_name?: string;
      phone?: string;
      avatar_url?: string;
    }) {
      if (!user.value) throw new Error("No user logged in");

      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.value.sub)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  };
};
