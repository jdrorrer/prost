Stores = new Mongo.Collection('stores');

Drinks = new Mongo.Collection('drinks');

EasySearch.createSearchIndex('drinks', {
  'field': ['name', 'description'],
  'collection': Drinks,
  'limit': 10,
  'props': {
    'filteredCategory': [],
    // 'sortBy': 'score'
  },
  // 'sort': function() {
  //   if (this.props.sortBy === 'name') {
  //     return { 'name': 1 };
  //   }  else if (this.props.sortBy === 'lowest-score') {
  //     return { 'score': 1 };
  //   }

  //   // default by highest score
  //   return { 'score': -1 };
  // },
  'query': function(searchString, opts) {
    // Default query that will be used for the mongo-db selector
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    // filter for categories if set
    if (this.props.filteredCategory.length > 0) {
      query.categories = { $all: this.props.filteredCategory };
    }

    return query;
  }
});

// Google maps markers
Markers = new Mongo.Collection('markers');  