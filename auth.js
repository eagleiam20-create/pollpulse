// PollPulse Auth System
// New system - index.html ko abhi touch nahi karna

let currentUser = null;

async function initAuth() {
  if (!window.supabaseClient) {
    console.error("Supabase client is not initialized.");
    return;
  }

  const {
    data: { user },
    error
  } = await window.supabaseClient.auth.getUser();

  if (error) {
    console.error("Auth error:", error);
    return;
  }

  currentUser = user || null;

  console.log(
    currentUser
      ? "Logged in:", currentUser.id
      : "No user logged in"
  );
}

async function signUp(email, password) {
  const { data, error } =
    await window.supabaseClient.auth.signUp({
      email,
      password
    });

  if (error) {
    console.error("Signup error:", error);
    return { success: false, error };
  }

  currentUser = data.user || null;

  return {
    success: true,
    user: data.user
  };
}

async function signIn(email, password) {
  const { data, error } =
    await window.supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    console.error("Login error:", error);
    return { success: false, error };
  }

  currentUser = data.user || null;

  return {
    success: true,
    user: data.user
  };
}

async function signOut() {
  const { error } =
    await window.supabaseClient.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return { success: false, error };
  }

  currentUser = null;

  return {
    success: true
  };
}

function getCurrentUser() {
  return currentUser;
}
