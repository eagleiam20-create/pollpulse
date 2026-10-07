// PollPulse Voting System

async function getUserVote(pollId, userId) {
  if (!window.supabaseClient || !pollId || !userId) {
    return null;
  }

  const { data, error } =
    await window.supabaseClient
      .from("poll_votes")
      .select("*")
      .eq("poll_id", pollId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    console.error("Get vote error:", error);
    return null;
  }

  return data;
}

async function voteOnPoll(pollId, optionIndex, userId) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase not ready"
    };
  }

  if (
    !pollId ||
    !userId ||
    optionIndex === undefined ||
    optionIndex === null
  ) {
    return {
      success: false,
      error: "Invalid vote"
    };
  }

  const existingVote =
    await getUserVote(pollId, userId);

  if (existingVote) {
    return {
      success: false,
      error: "You have already voted."
    };
  }

  const { data, error } =
    await window.supabaseClient
      .from("poll_votes")
      .insert({
        poll_id: pollId,
        user_id: userId,
        option_index: optionIndex
      })
      .select()
      .single();

  if (error) {
    console.error("Vote error:", error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    vote: data
  };
}

async function getPollResults(pollId) {
  if (!window.supabaseClient || !pollId) {
    return [];
  }

  const { data, error } =
    await window.supabaseClient
      .from("poll_votes")
      .select("option_index")
      .eq("poll_id", pollId);

  if (error) {
    console.error("Poll results error:", error);
    return [];
  }

  const counts = {};

  (data || []).forEach(vote => {
    const index = vote.option_index;

    counts[index] =
      (counts[index] || 0) + 1;
  });

  return counts;
}
