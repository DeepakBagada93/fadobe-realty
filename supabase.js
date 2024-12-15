import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hsesipufuqhigxjzhses.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZXNpcHVmdXFoaWd4anpoc2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMDc3OTQsImV4cCI6MjA0OTY4Mzc5NH0.3zzerR6lr8oDnEXlayDpmP1RoSXd8eM4YDJaliy7PrY'; // Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const signInAdmin = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user, error };
};

export const signOutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};