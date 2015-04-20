Orders = new Mongo.Collection("orders");

Orders.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  content: {
    type: String,
    label: "Content"
  },
  quantity: {
    type: Number,
    label: "Quantity",
    min: 0
  },
  paymentOptions: {
    type: String,
    autoform: {
      type: "select-radio",
      label: "Payment Options",
      options: function () {
        return [
          {label: "Credit Card", value: "credit card"},
          {label: "Stripe", value: "stripe"}
        ];
      }
    }
  },
  cardNumber: {
    type: String,
    label: "Card Number",
    max: 16
  },
  nameOnCard: {
    type: String,
    label: "Name on Your Card"
  },
  cardExpMonth: {
    type: Number,
    label: "Expiration Month",
    max: 2,
    autoform: {
      type: "select",
      options: function() {
        return [
          {label: "1 - January", value: 1},
          {label: "2 - February", value: 2},
          {label: "3 - March", value: 3},
          {label: "4 - April", value: 4},
          {label: "5 - May", value: 5},
          {label: "6 - June", value: 6},
          {label: "7 - July", value: 7},
          {label: "8 - August", value: 8},
          {label: "9 - September", value: 9},
          {label: "10 - October", value: 10},
          {label: "11 - November", value: 11},
          {label: "12 - December", value: 12},
        ];
      }
    }
  },
  cardExpYear: {
    type: Number,
    label: "Expiration Year",
    max: 4,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "2015", value: 2015},
          {label: "2016", value: 2016},
          {label: "2017", value: 2017},
          {label: "2018", value: 2018},
          {label: "2019", value: 2019},
          {label: "2020", value: 2020},
          {label: "2021", value: 2021},
          {label: "2022", value: 2022},
          {label: "2023", value: 2023},
          {label: "2024", value: 2024},
          {label: "2025", value: 2025},
          {label: "2026", value: 2026},
          {label: "2027", value: 2027},
          {label: "2028", value: 2028},
          {label: "2029", value: 2029},
          {label: "2030", value: 2030},
          {label: "2031", value: 2031},
          {label: "2032", value: 2032},
          {label: "2033", value: 2033},
          {label: "2034", value: 2034},
          {label: "2035", value: 2035}
        ];
      }
    }
  },
  cardZip: {
    type: String,
    label: "Postal/Zip"
  },
  cardCVV: {
    type: String,
    label: "CVV"
  }
}));

Stores = new Mongo.Collection('stores');

Drinks = new Mongo.Collection('drinks');

EasySearch.createSearchIndex('drinks', {
  'field': ['name', 'description'],
  'collection': Drinks,
  'limit': 10,
  'props': {
    'filteredCategory': [],
    'filteredFavorites': [],
    'filteredSpecials': []
    // 'sortBy': 'score'
  },
  'sort': function() {
    // if (this.props.sortBy === 'name') {
    //   return { 'name': 1 };
    // }  else if (this.props.sortBy === 'lowest-score') {
    //   return { 'score': 1 };
    // }

    // default by name A-Z
    return { 'name': 1 };
  },
  'query': function(searchString, opts) {
    // Default query that will be used for the mongo-db selector
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    // filter for categories if set
    if (typeof this.props.filteredCategory !== 'undefined' && this.props.filteredCategory.length > 0) {
      query.categories = { $all: this.props.filteredCategory };
    }

    if(typeof this.props.filteredFavorites !== 'undefined' && this.props.filteredFavorites.length > 0) {
      query._id = { $in: this.props.filteredFavorites };
    }

    if(typeof this.props.filteredSpecials !== 'undefined' && this.props.filteredSpecials.length > 0) {
      query._id = { $in: this.props.filteredSpecials };
    }

    return query;
  }
});

// Google maps markers
Markers = new Mongo.Collection('markers');  