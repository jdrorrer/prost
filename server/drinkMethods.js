Meteor.startup(function() {
  var drinks = [
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Mojito",
      price: 5.99,
      deal: false,
      dealDetails: 'N/A',
      description: "Traditionally, a mojito is a cocktail that consists of five ingredients: white rum, sugar (traditionally sugar cane juice), lime juice, sparkling water, and mint. Its combination of sweetness, refreshing citrus, and mint flavors is intended to complement the potent kick of the rum, and has made this clear highball a popular summer drink."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Yuengling",
      price: 3.99,
      deal: true,
      dealDetails: 'All American beers 20% off today.',
      description: "D. G. Yuengling & Son is the oldest operating brewing company in the United States, established in 1829. It is one of the largest breweries by volume in the country. Based on sales in 2011, Yuengling was tied with the Boston Beer Company, maker of Samuel Adams brands, as the largest American-owned brewery."
    },
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Cabernet sauvignon",
      price: 7.99,
      deal: false,
      dealDetails: 'N/A',
      description: "Cabernet Sauvignon is one of the world's most widely recognized red wine grape varieties. It is grown in nearly every major wine producing country among a diverse spectrum of climates from Canada's Okanagan Valley to Lebanon's Beqaa Valley."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Bourbon",
      price: 7.99,
      deal: false,
      dealDetails: 'N/A',
      description: "Bourbon whiskey is a type of American whiskey: a barrel-aged distilled spirit made primarily from corn. The name is ultimately derived from the French Bourbon dynasty, although it is disputed whether Bourbon County in Kentucky or Bourbon Street in New Orleans inspired the whiskey's name."
    },
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Margarita",
      price: 4.99,
      deal: true,
      dealDetails: 'Buy one margarita, get the next one on us.',
      description: "The margarita is a cocktail consisting of tequila, triple sec and lime or lemon juice, often served with salt on the rim of the glass. The drink is served shaken with ice, blended with ice, or without ice."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Long Island Iced Tea",
      price: 5.99,
      deal: false,
      dealDetails: 'N/A',
      description: "A Long Island Iced Tea is a type of alcoholic mixed drink typically made with, among other ingredients, tequila, vodka, light rum, triple sec, and gin. It is so named because of the resemblance to the color and taste of iced tea."
    },
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Whiskey & Coke",
      price: 5.99,
      deal: true,
      dealDetails: 'All Jack and Cokes are 15% off tonight, all night.',
      description: "Jack and Coke (also referred to as JD and Coke) is a cocktail made with Jack Daniel's whiskey and Coca-Cola. The drink is usually served with ice in an old-fashioned glass or a Collins glass."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Mimosa",
      price: 6.99,
      deal: false,
      dealDetails: 'N/A',
      description: "A Mimosa is a cocktail composed of one part champagne and one part chilled citrus fruit juice, usually orange juice unless otherwise specified. It is traditionally served in a tall champagne flute with a morning brunch or to guests at weddings."
    }
  ];

  // Meteor.methods({
  //   allDocs : function () {
  //     return Players.find().count();
  //   }
  // });
  
  Meteor.publish('allDrinks', function () {
    return Drinks.find({}, { limit: 10 });
  });

  if (Drinks.find().count() === 0) {
    // one hunderd thousand docs :O
    for (var i = 0; i < drinks.length ; i++) {
      Drinks.insert({
        storeId: null,
        storeSlug: null,
        name: drinks[i].name,
        slug: s.slugify(drinks[i].name),
        price: drinks[i].price,
        deal: drinks[i].deal,
        dealDetails: drinks[i].dealDetails,
        description: drinks[i].description
      });
    }
  }
});