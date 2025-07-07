import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import supabase from "../utils/supabase";

type UserProfile = {
  id: string;
  username?: string;
  role: string;
};

type AuthContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    const {
      data: { user: sessionUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !sessionUser) {
      // Only log unexpected errors
      if (error && !(
        error.message &&
        error.message.toLowerCase().includes('refresh token') &&
        error.message.toLowerCase().includes('not found')
      )) {
        console.error("Supabase Auth Error:", error.message);
      }
      setUser(null);
      setIsLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, role")
      .eq("id", sessionUser.id)
      .single();

    if (profileError) {
      console.error("Error loading profile:", profileError.message);
      setUser(null);
    } else {
      setUser(profile);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error al cerrar sesión: " + error.message);
    } else {
      setUser(null);
      window.location.reload(); // Recarga la página tras logout exitoso
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAdmin: user?.role === "admin", logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
