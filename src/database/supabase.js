import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xbvjjhdrmvgyecolvwwu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidmpqaGRybXZneWVjb2x2d3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0NDU0MDQsImV4cCI6MjAzMTAyMTQwNH0.twmkYN8CMOFqnsd6jER5RV8ixp6_2JuCWbifGS_h0MM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
