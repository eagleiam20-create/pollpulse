// PollPulse New App Controller

window.PollPulse = {
  version: "2.0.0",

  auth: {
    init: initAuth,
    signUp,
    signIn,
    signOut,
    getCurrentUser
  },

  profile: {
    get: getProfile,
    create: createProfile,
    update: updateProfile
  },

  avatar: {
    upload: uploadAvatar
  },

  follow: {
    check: isFollowing,
    follow: followUser,
    unfollow: unfollowUser,
    toggle: toggleUserFollow
  },

  home: {
    suggestions: loadSuggestions
  },

  polls: {
    load: loadPolls,
    get: getPoll,
    create: createPoll,
    delete: deletePoll
  },

  voting: {
    getUserVote,
    vote: voteOnPoll,
    results: getPollResults
  },

  notifications: {
    load: loadNotifications,
    markRead: markNotificationRead,
    markAllRead: markAllNotificationsRead
  }
};

console.log(
  "PollPulse new system loaded:",
  PollPulse.version
);
