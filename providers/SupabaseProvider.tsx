'use client';
import { Database } from '@/types_db';
import { useState, createContext, useContext } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

interface SupabaseProviderProps {
  children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );
  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>;
};

export const useSupabase = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error('useSupabase must be used within SupabaseProvider');
  return context;
};

export default SupabaseProvider;
