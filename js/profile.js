// PollPulse Profile System

async function getProfile(userId) {
  if (!window.supabaseClient || !userId) return null;

  const { data, error } = await window.supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Profile load error:", error);
    return null;
  }

  return data;
}

async function updateProfile(userId, updates) {
  if (!window.supabaseClient || !userId) {
    return { success: false, error: "Invalid user." };
  }

  const { data, error } = await window.supabaseClient
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Profile update error:", error);
    return { success: false, error };
  }

  return { success: true, profile: data };
}

console.log("PollPulse profile system loaded.");
