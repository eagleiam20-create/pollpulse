// PollPulse Avatar System

async function uploadAvatar(file, userId) {
  if (!window.supabaseClient || !file || !userId) {
    return { success: false, error: "Invalid upload." };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!allowed.includes(file.type)) {
    return { success: false, error: "Only JPG, PNG or WebP allowed." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: "Image must be under 5 MB." };
  }

  const extension = file.name.split(".").pop().toLowerCase();
  const path = userId + "/" + crypto.randomUUID() + "." + extension;

  const { error: uploadError } =
    await window.supabaseClient.storage
      .from("avatars")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });

  if (uploadError) {
    console.error("Avatar upload error:", uploadError);
    return { success: false, error: uploadError };
  }

  const { data } =
    window.supabaseClient.storage
      .from("avatars")
      .getPublicUrl(path);

  const avatarUrl = data.publicUrl;

  const { error } =
    await window.supabaseClient
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", userId);

  if (error) {
    console.error("Avatar profile update error:", error);
    return { success: false, error };
  }

  return { success: true, url: avatarUrl };
}

console.log("PollPulse avatar system loaded.");
