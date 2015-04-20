Future = Npm.require('fibers/future');

Meteor.methods({
  'addFavorite': function(favoriteId) {
    var currentUser = Meteor.user();
    var fut = new Future();
    console.log('Added new favorite: ' + favoriteId);
    Meteor.users.update(currentUser, 
      {$push: {favorites: favoriteId} }, 
      function(err) {
        if(err) {
          fut.throw(err);
        } else {
          var currentUserId = Meteor.userId();
          currentUser = Meteor.users.findOne({_id: currentUserId});
          if(currentUser) {
            var favorites = currentUser.favorites;
          }
          fut.return(favorites);
        }
      });
    return fut.wait();
  },
  'removeFavorite': function(favoriteId) {
    var currentUser = Meteor.user();
    var fut = new Future();
    console.log('Removed favorite: ' + favoriteId);
    Meteor.users.update(currentUser, 
      {$pull: {favorites: favoriteId} }, 
      function(err) {
        if(err) {
          fut.throw(err);
        } else {
          var currentUserId = Meteor.userId();
          currentUser = Meteor.users.findOne({_id: currentUserId});
          if(currentUser) {
            var favorites = currentUser.favorites;
          }
          fut.return(favorites);
        }
      });
    return fut.wait();
  }
});