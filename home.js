// PollPulse Home & Suggestions System

async function loadSuggestions(userId) {
  if (!window.supabaseClient || !userId) {
    return [];
  }

  const { data: profiles, error } =
    await window.supabaseClient
      .from("profiles")
      .select("*")
      .neq("id", userId)
      .limit(10);

  if (error) {
    console.error("Suggestions error:", error);
    return [];
  }

  if (!profiles?.length) {
    return [];
  }

  const { data: follows, error: followError } =
    await window.supabaseClient
      .from("follows")
      .select("following_id")
      .eq("follower_id", userId)
      .in(
        "following_id",
        profiles.map(profile => profile.id)
      );

  if (followError) {
    console.error(
      "Suggestion follow check error:",
      followError
    );
  }

  const followingIds =
    new Set(
      (follows || []).map(
        follow => follow.following_id
      )
    );

  return profiles.map(profile => ({
    ...profile,
    isFollowing: followingIds.has(profile.id)
  }));
}

function getSuggestionButtonText(profile) {
  return profile.isFollowing
    ? "Following"
    : "Follow";
}
