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

    // Gracefully handle no session
    if (!sessionUser) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Log unexpected errors only
    if (
      error &&
      !["Auth session missing!", "Auth session not found", "Refresh token not found"].some((msg) =>
        error.message.toLowerCase().includes(msg.toLowerCase())
      )
    ) {
      console.error("Supabase Auth Error:", error.message);
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
