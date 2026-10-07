// PollPulse Poll System

async function loadPolls(limit = 20) {
  if (!window.supabaseClient) {
    return [];
  }

  const { data, error } =
    await window.supabaseClient
      .from("polls")
      .select("*")
      .order("created_at", {
        ascending: false
      })
      .limit(limit);

  if (error) {
    console.error("Load polls error:", error);
    return [];
  }

  return data || [];
}

async function getPoll(pollId) {
  if (!window.supabaseClient || !pollId) {
    return null;
  }

  const { data, error } =
    await window.supabaseClient
      .from("polls")
      .select("*")
      .eq("id", pollId)
      .maybeSingle();

  if (error) {
    console.error("Get poll error:", error);
    return null;
  }

  return data;
}

async function createPoll(userId, question, options) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase not ready"
    };
  }

  if (!userId || !question || !options?.length) {
    return {
      success: false,
      error: "Question and options are required."
    };
  }

  const cleanQuestion =
    question.trim();

  const cleanOptions =
    options
      .map(option => String(option).trim())
      .filter(Boolean);

  if (!cleanQuestion) {
    return {
      success: false,
      error: "Question cannot be empty."
    };
  }

  if (cleanOptions.length < 2) {
    return {
      success: false,
      error: "A poll needs at least 2 options."
    };
  }

  const { data, error } =
    await window.supabaseClient
      .from("polls")
      .insert({
        user_id: userId,
        question: cleanQuestion,
        options: cleanOptions
      })
      .select()
      .single();

  if (error) {
    console.error("Create poll error:", error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    poll: data
  };
}

async function deletePoll(pollId, userId) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase not ready"
    };
  }

  const { error } =
    await window.supabaseClient
      .from("polls")
      .delete()
      .eq("id", pollId)
      .eq("user_id", userId);

  if (error) {
    console.error("Delete poll error:", error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true
  };
}
