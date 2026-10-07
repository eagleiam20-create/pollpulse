// PollPulse Notifications System

async function loadNotifications(userId) {
  if (!window.supabaseClient || !userId) return [];

  const { data, error } =
    await window.supabaseClient
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

  if (error) {
    console.error("Notifications error:", error);
    return [];
  }

  return data || [];
}

async function markNotificationRead(notificationId, userId) {
  const { error } =
    await window.supabaseClient
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId)
      .eq("user_id", userId);

  if (error) return { success: false, error };

  return { success: true };
}

console.log("PollPulse notification system loaded.");
