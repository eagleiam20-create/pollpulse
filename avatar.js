// PollPulse Avatar System

async function uploadAvatar(file, userId) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase not ready"
    };
  }

  if (!file || !userId) {
    return {
      success: false,
      error: "File or user missing"
    };
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: "Only JPG, PNG or WebP images are allowed."
    };
  }

  if (file.size > 5 * 1024 * 1024) {
    return {
      success: false,
      error: "Image must be smaller than 5 MB."
    };
  }

  const extension =
    file.name.split(".").pop().toLowerCase();

  const filePath =
    `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } =
    await window.supabaseClient
      .storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

  if (uploadError) {
    console.error("Avatar upload error:", uploadError);

    return {
      success: false,
      error: uploadError
    };
  }

  const { data: publicData } =
    window.supabaseClient
      .storage
      .from("avatars")
      .getPublicUrl(filePath);

  const avatarUrl = publicData.publicUrl;

  const { error: profileError } =
    await window.supabaseClient
      .from("profiles")
      .update({
        avatar_url: avatarUrl
      })
      .eq("id", userId);

  if (profileError) {
    console.error(
      "Profile avatar update error:",
      profileError
    );

    return {
      success: false,
      error: profileError
    };
  }

  return {
    success: true,
    url: avatarUrl
  };
}
