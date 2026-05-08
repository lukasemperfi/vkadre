// composables/useAuthApi.ts
export const useAuthApi = () => {
  const supabase = useSupabaseClient();

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
  };
};
