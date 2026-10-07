// ==========================================
// AUTH MODULE
// ==========================================

function initAuthModule() {

  if (!window.sb) {
    console.warn("Supabase client is not ready yet.");
    return;
  }

  const authSwitchBtn = document.getElementById("authSwitchBtn");
  const authButton = document.getElementById("authButton");
  const passwordInput = document.getElementById("passwordInput");

  if (authSwitchBtn) {
    authSwitchBtn.addEventListener("click", () => {
      setAuthMode(
        window.authMode === "login"
          ? "signup"
          : "login"
      );
    });
  }

  if (authButton) {
    authButton.addEventListener("click", handleAuth);
  }

  if (passwordInput) {
    passwordInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        handleAuth();
      }
    });
  }
}

console.log("auth.js loaded");
