Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', {
    path:'/'
  });
  this.route('stores', {
    path: 'stores',
    waitOn: function() {
      return Meteor.subscribe('allStores');
    }
  });
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
    path: 'drinks'
  });
  this.route('drink', {
    path: ':storeSlug/:drinkSlug',
    data: function() {
      var drinkSlug = this.params.drinkSlug;
      return Drinks.findOne({slug: drinkSlug});
    },
    waitOn: function() {
      return Meteor.subscribe('allDrinks');
    }
  });
  this.route('map', {
    path: 'map'
  });
  this.route('accounts', {
    path: 'login'
  });
  this.route('allDrinks', {
    path: 'all-drinks'
  });
  this.route('beer', {
    path: 'beer'
  });
  this.route('wine', {
    path: 'wine'
  });
  this.route('mixes', {
    path: 'mixes'
  });
  this.route('searchOverlay', {
    path: 'search'
  });
});