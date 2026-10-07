// PollPulse Configuration

const POLLPULSE_CONFIG = {
  appName: "PollPulse",
  version: "2.0.0",

  supabaseUrl:
    "https://dbpbkvfaxgifjeveijqf.supabase.co",

  supabaseKey:
    "sb_publishable_G45cAQkTBfiS1E2a9zSe8g_ULSq4Ri7"
};

if (window.supabase) {
  window.supabaseClient =
    window.supabase.createClient(
      POLLPULSE_CONFIG.supabaseUrl,
      POLLPULSE_CONFIG.supabaseKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );

  console.log("PollPulse Supabase connected.");
} else {
  console.error("Supabase library not loaded.");
}
