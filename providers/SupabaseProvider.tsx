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
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      'https://turnkdypyjsmdvaehhek.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cm5rZHlweWpzbWR2YWVoaGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5OTU0ODEsImV4cCI6MjA5MzU3MTQ4MX0.1A4fT4-OcFt1SIE06mpquh-pQNxc84UCuOU1RiU39nU'
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
