// PollPulse Authentication System

let currentUser = null;

async function initAuth() {
  if (!window.supabaseClient) {
    console.error("Supabase client not ready.");
    return null;
  }

  const {
    data: { user },
    error
  } = await window.supabaseClient.auth.getUser();

  if (error) {
    console.error("Auth check error:", error);
    return null;
  }

  currentUser = user || null;

  console.log(
    currentUser
      ? "PollPulse user logged in."
      : "No PollPulse user logged in."
  );

  return currentUser;
}

async function signUp(email, password) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase is not ready."
    };
  }

  const { data, error } =
    await window.supabaseClient.auth.signUp({
      email,
      password
    });

  if (error) {
    console.error("Signup error:", error);

    return {
      success: false,
      error
    };
  }

  currentUser = data.user || null;

  return {
    success: true,
    user: currentUser
  };
}

async function signIn(email, password) {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase is not ready."
    };
  }

  const { data, error } =
    await window.supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    console.error("Login error:", error);

    return {
      success: false,
      error
    };
  }

  currentUser = data.user || null;

  return {
    success: true,
    user: currentUser
  };
}

async function signOut() {
  if (!window.supabaseClient) {
    return {
      success: false,
      error: "Supabase is not ready."
    };
  }

  const { error } =
    await window.supabaseClient.auth.signOut();

  if (error) {
    console.error("Logout error:", error);

    return {
      success: false,
      error
    };
  }

  currentUser = null;

  return {
    success: true
  };
}

function getCurrentUser() {
  return currentUser;
}

console.log("PollPulse auth system loaded.");
