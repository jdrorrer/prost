Accounts.onCreateUser(function(options, user) {
  user.favorites = [];
  if (options.profile)
    user.profile = options.profile;
  return user;
});