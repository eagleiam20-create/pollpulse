// PollPulse Notifications System

async function loadNotifications(userId) {
  if (!window.supabaseClient || !userId) {
    return [];
  }

  const { data, error } =
    await window.supabaseClient
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false
      })
      .limit(50);

  if (error) {
    console.error(
      "Load notifications error:",
      error
    );

    return [];
  }

  return data || [];
}

async function markNotificationRead(
  notificationId,
  userId
) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase not ready"
    };
  }

  const { error } =
    await window.supabaseClient
      .from("notifications")
      .update({
        read: true
      })
      .eq("id", notificationId)
      .eq("user_id", userId);

  if (error) {
    console.error(
      "Mark notification error:",
      error
    );

    return {
      success: false,
      error
    };
  }

  return {
    success: true
  };
}

async function markAllNotificationsRead(
  userId
) {
  if (!window.supabaseClient || !userId) {
    return {
      success: false,
      error: "Invalid user"
    };
  }

  const { error } =
    await window.supabaseClient
      .from("notifications")
      .update({
        read: true
      })
      .eq("user_id", userId)
      .eq("read", false);

  if (error) {
    console.error(
      "Mark all notifications error:",
      error
    );

    return {
      success: false,
      error
    };
  }

  return {
    success: true
  };
}
