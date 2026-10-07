// PollPulse 2.0 App Controller

window.PollPulse = {
  version: POLLPULSE_CONFIG.version,

  auth: {
    init: initAuth,
    signUp,
    signIn,
    signOut,
    getCurrentUser
  },

  profile: {
    get: getProfile,
    update: updateProfile
  },

  follow: {
    check: isFollowing,
    toggle: toggleUserFollow
  },

  avatar: {
    upload: uploadAvatar
  },

  polls: {
    load: loadPolls,
    get: getPoll,
    create: createPoll
  },

  voting: {
    getUserVote,
    vote: voteOnPoll,
    results: getPollResults
  },

  notifications: {
    load: loadNotifications,
    markRead: markNotificationRead
  }
};

console.log(
  "PollPulse 2.0 system loaded."
);
