Meteor.startup(function() {
  var stores = [
    { 
      name: "Razzle McDazzle's Castle",
      phone: '555-555-5555',
      email: 'test1@me.com',
      location: '1 main street, louisville, ky',
      owner: 'Razzle Dazzle',
      description: 'The premier spot to grab drinks after work. Grab your friends and come check us out tonight for the best deals in town!'
    },
    { 
      name: "I'm Rick James!",
      phone: '555-555-5555',
      email: 'test2@me.com',
      location: '2 main street, louisville, ky',
      owner: 'Rick James',
      description: 'We are the best place to grab drinks anytime, anywhere... Check out our daily drink specials, grab your pals and get ready for some sweet live music!'
    },
  ];

  // Meteor.methods({
  //   allDocs : function () {
  //     return Players.find().count();
  //   }
  // });
  
  Meteor.publish('allStores', function () {
    return Stores.find({}, { limit: 10 });
  });

  if (Stores.find().count() === 0) {
    // one hunderd thousand docs :O
    for (var i = 0; i < stores.length ; i++) {
      Stores.insert({
        name: stores[i].name,
        slug: s.slugify(stores[i].name),
        phone: stores[i].phone,
        email: stores[i].email,
        location: stores[i].location,
        owner: stores[i].owner,
        description: stores[i].description
      });
    }
  }
});