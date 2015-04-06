Template.stores.helpers({
  store: function() {
    return Stores.find({}, {sort: {name: 1} });
  },
  myParams: function() {
    return {
      storeSlug: this.slug
    }
  }
});