import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe;
    };
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: "http://localhost:5173/" },
    });

    if (error) throw error;

    if (data?.user && data?.session) {
      throw new Error("Correo ya registrado. Revisa tu bandeja de entrada.");
    }

    return data;
  };

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const uploadImage = async (file) => {
    const userId = session.user.id;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from("images-upload")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = await supabase.storage
      .from("images-upload")
      .getPublicUrl("filePath");

    return data.publicUrl;
  };

  const listUserImages = async () => {
    const userId = session.user.id;

    const { data: files, error } = await supabase.storage
      .from("images-upload")
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) throw error;

    const urls = await Promise.all(
      files.map(async (file) => {
        const { data, error } = await supabase.storage
          .from("images-upload")
          .createSignedUrl(`${userId}/${file.name}`, 60 * 60); // 1 hora

        if (error) {
          console.error("Error al generar signed URL:", error.message);
          return null;
        }

        return data.signedUrl;
      })
    );

    return urls.filter((url) => url !== null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUp,
        signIn,
        signOut,
        uploadImage,
        listUserImages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const sessionAuth = () => useContext(AuthContext);
