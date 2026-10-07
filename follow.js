// PollPulse Follow System

async function isFollowing(targetId, userId) {
  if (!window.supabaseClient || !targetId || !userId) {
    return false;
  }

  const { data, error } =
    await window.supabaseClient
      .from("follows")
      .select("id")
      .eq("follower_id", userId)
      .eq("following_id", targetId)
      .maybeSingle();

  if (error) {
    console.error("Check follow error:", error);
    return false;
  }

  return !!data;
}

async function followUser(targetId, userId) {
  if (!window.supabaseClient || !targetId || !userId) {
    return {
      success: false,
      error: "Invalid user"
    };
  }

  if (targetId === userId) {
    return {
      success: false,
      error: "You cannot follow yourself."
    };
  }

  const alreadyFollowing =
    await isFollowing(targetId, userId);

  if (alreadyFollowing) {
    return {
      success: true,
      following: true
    };
  }

  const { error } =
    await window.supabaseClient
      .from("follows")
      .insert({
        follower_id: userId,
        following_id: targetId
      });

  if (error) {
    console.error("Follow error:", error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    following: true
  };
}

async function unfollowUser(targetId, userId) {
  if (!window.supabaseClient || !targetId || !userId) {
    return {
      success: false,
      error: "Invalid user"
    };
  }

  const { error } =
    await window.supabaseClient
      .from("follows")
      .delete()
      .eq("follower_id", userId)
      .eq("following_id", targetId);

  if (error) {
    console.error("Unfollow error:", error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    following: false
  };
}

async function toggleUserFollow(targetId, userId) {
  const following =
    await isFollowing(targetId, userId);

  if (following) {
    return await unfollowUser(targetId, userId);
  }

  return await followUser(targetId, userId);
}
