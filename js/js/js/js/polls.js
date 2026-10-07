// PollPulse Poll System

async function loadPolls(limit = 20) {
  if (!window.supabaseClient) return [];

  const { data, error } =
    await window.supabaseClient
      .from("polls")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

  if (error) {
    console.error("Poll load error:", error);
    return [];
  }

  return data || [];
}

async function getPoll(pollId) {
  if (!window.supabaseClient || !pollId) return null;

  const { data, error } =
    await window.supabaseClient
      .from("polls")
      .select("*")
      .eq("id", pollId)
      .maybeSingle();

  if (error) return null;

  return data;
}

async function createPoll(userId, question, options) {
  const cleanQuestion = String(question || "").trim();

  const cleanOptions = (options || [])
    .map(option => String(option).trim())
    .filter(Boolean);

  if (!userId || !cleanQuestion || cleanOptions.length < 2) {
    return {
      success: false,
      error: "Question and at least 2 options are required."
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
    console.error("Poll create error:", error);
    return { success: false, error };
  }

  return { success: true, poll: data };
}

console.log("PollPulse poll system loaded.");
