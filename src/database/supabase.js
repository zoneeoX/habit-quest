import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "examplekey";
const supabaseKey = "examplekey"
  const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
