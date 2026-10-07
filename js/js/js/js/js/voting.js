// PollPulse Voting System

async function getUserVote(pollId, userId) {
  if (!window.supabaseClient || !pollId || !userId) return null;

  const { data, error } =
    await window.supabaseClient
      .from("poll_votes")
      .select("*")
      .eq("poll_id", pollId)
      .eq("user_id", userId)
      .maybeSingle();

  if (error) {
    console.error("Vote lookup error:", error);
    return null;
  }

  return data;
}

async function voteOnPoll(pollId, optionIndex, userId) {
  if (!window.supabaseClient || !pollId || !userId) {
    return { success: false, error: "Invalid vote." };
  }

  if (await getUserVote(pollId, userId)) {
    return { success: false, error: "Already voted." };
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
    return { success: false, error };
  }

  return { success: true, vote: data };
}

async function getPollResults(pollId) {
  if (!window.supabaseClient || !pollId) return {};

  const { data, error } =
    await window.supabaseClient
      .from("poll_votes")
      .select("option_index")
      .eq("poll_id", pollId);

  if (error) return {};

  const results = {};

  (data || []).forEach(vote => {
    results[vote.option_index] =
      (results[vote.option_index] || 0) + 1;
  });

  return results;
}

console.log("PollPulse voting system loaded.");
