// PollPulse Profile System

async function getProfile(userId) {
  if (!window.supabaseClient || !userId) {
    return null;
  }

  const { data, error } =
    await window.supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

  if (error) {
    console.error("Profile error:", error);
    return null;
  }

  return data;
}

async function updateProfile(userId, updates) {
  if (!window.supabaseClient || !userId) {
    return {
      success: false,
      error: "User not found"
    };
  }

  const { data, error } =
    await window.supabaseClient
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

  if (error) {
    console.error("Update profile error:", error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    profile: data
  };
}

async function createProfile(profileData) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase not ready"
    };
  }

  const { data, error } =
    await window.supabaseClient
      .from("profiles")
      .insert(profileData)
      .select()
      .single();

  if (error) {
    console.error("Create profile error:", error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    profile: data
  };
}
