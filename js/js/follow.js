// PollPulse Follow System

async function isFollowing(targetId, userId) {
  if (!window.supabaseClient || !targetId || !userId) return false;

  const { data, error } = await window.supabaseClient
    .from("follows")
    .select("id")
    .eq("follower_id", userId)
    .eq("following_id", targetId)
    .maybeSingle();

  if (error) {
    console.error("Follow check error:", error);
    return false;
  }

  return !!data;
}

async function toggleUserFollow(targetId, userId) {
  if (!window.supabaseClient || !targetId || !userId) {
    return { success: false, error: "Invalid user." };
  }

  const following = await isFollowing(targetId, userId);

  if (following) {
    const { error } = await window.supabaseClient
      .from("follows")
      .delete()
      .eq("follower_id", userId)
      .eq("following_id", targetId);

    if (error) return { success: false, error };

    return { success: true, following: false };
  }

  const { error } = await window.supabaseClient
    .from("follows")
    .insert({
      follower_id: userId,
      following_id: targetId
    });

  if (error) return { success: false, error };

  return { success: true, following: true };
}

console.log("PollPulse follow system loaded.");
