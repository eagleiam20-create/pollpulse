// ==========================================
// POLL PULSE CORE
// Supabase + Global Helpers
// ==========================================

const SUPABASE_URL =
  "https://dbpbkvfaxgifjeveijqf.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_G45cAQkTBfiS1E2a9zSe8g_ULSq4Ri7";

let sb = null;
let currentUser = null;
let currentProfile = null;
let currentChatUser = null;
let authMode = "login";
let messageRefreshTimer = null;
let realtimeChannels = [];

// ------------------------------------------
// DOM HELPER
// ------------------------------------------

const $ = (id) => document.getElementById(id);

// ------------------------------------------
// HTML ESCAPE
// ------------------------------------------

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ------------------------------------------
// AVATAR URL
// ------------------------------------------

function avatarUrl(profile) {
  return (
    profile?.avatar_url ||
    profile?.avatar ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(
        profile?.display_name ||
        profile?.username ||
        "User"
      ) +
      "&background=e9e5ff&color=6c5ce7"
  );
}

// ------------------------------------------
// TOAST
// ------------------------------------------

function showToast(message) {
  const toast = $("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ------------------------------------------
// TIME AGO
// ------------------------------------------

function timeAgo(date) {
  if (!date) return "";

  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d`;
  }

  return new Date(date).toLocaleDateString();
}

// ------------------------------------------
// FORMAT TIME
// ------------------------------------------

function formatTime(date) {
  if (!date) return "";

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

// ------------------------------------------
// SUPABASE INITIALIZATION
// ------------------------------------------

function initSupabase() {

  if (!window.supabase) {
    console.error(
      "Supabase library not loaded."
    );
    return;
  }

  sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

  console.log("Supabase initialized.");
}

// ------------------------------------------
// START CORE
// ------------------------------------------

document.addEventListener(
  "DOMContentLoaded",
  () => {
    initSupabase();
  }
);

console.log("core.js loaded");
