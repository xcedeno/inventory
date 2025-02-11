// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdtgdmbqoihlaitaespe.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kdGdkbWJxb2lobGFpdGFlc3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMjcxNTIsImV4cCI6MjA1NDgwMzE1Mn0.7hxu-O1ookpxf_Fx5I6vhmpeCgxVXLdYtgoTgMsECPM'; // Reemplaza con tu API Key

export const supabase = createClient(supabaseUrl, supabaseKey);