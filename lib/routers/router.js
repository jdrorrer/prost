Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

var requireLogin = function() { 
  if (! Meteor.user()) { // If user is not logged in render login page
   this.render('accounts'); 
 } else { //if user is logged in render whatever route was requested
   this.next();
   Router.go('/drinks');
 }
}
 
// Before any routing run the requireLogin function, 
// Except in the case of "accounts". 
Router.onBeforeAction(requireLogin, {except: ['accounts']});

Router.map(function() {
  // this.route('home', {
  //   path:'/'
  // });
  // this.route('stores', {
  //   path: 'stores',
  //   waitOn: function() {
  //     return Meteor.subscribe('allStores');
  //   }
  // });
  this.route('store', {
    path: 'stores/:storeSlug',
    data: function() {
      var storeSlug = this.params.storeSlug;
      return Stores.findOne({slug: storeSlug});
    },
    waitOn: function() {
      return Meteor.subscribe('allStores');
    }
  });
  // this.route('drinks', {
  //   path: ':storeSlug/drinks',
  //   data: function() {
  //     var storeSlug = this.params.storeSlug;
  //     return Drinks.find({storeSlug: storeSlug});
  //   },
  //   waitOn: function() {
  //     return Meteor.subscribe('allDrinks');
  //   }
  // });
  this.route('drinks', {
    path: 'drinks',
    waitOn: function() {
      return Meteor.subscribe('allDrinks');
    }
  });
  // this.route('drink', {
  //   path: ':storeSlug/:drinkSlug',
  //   data: function() {
  //     var drinkSlug = this.params.drinkSlug;
  //     return Drinks.findOne({slug: drinkSlug});
  //   },
  //   waitOn: function() {
  //     return Meteor.subscribe('allDrinks');
  //   }
  // });
  this.route('checkout', {
    path: 'checkout/:drinkSlug',
    data: function() {
      var drinkSlug = this.params.drinkSlug;
      return Drinks.findOne({slug: drinkSlug});
    },
    waitOn: function() {
      return Meteor.subscribe('allDrinks');
    }
  });
  // this.route('map', {
  //   path: 'map'
  // });
  this.route('accounts', {
    path: '/',
    onBeforeAction: function () {
      this.next();
      if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
          //do nothing
        }
        else{
          Router.go('/drinks');
        }
      }
    }
  });
  // this.route('allDrinks', {
  //   path: 'all-drinks'
  // });
  // this.route('beer', {
  //   path: 'beer'
  // });
  // this.route('wine', {
  //   path: 'wine'
  // });
  // this.route('mixes', {
  //   path: 'mixes'
  // });
  // this.route('searchOverlay', {
  //   path: 'search'
  // });
  // this.route('loading', {
  //   path: 'loading'
  // });
});