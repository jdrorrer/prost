Meteor.startup(function() {
  var drinks = [
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Mojito",
      categories: ['Mixed Drink', 'Rum', 'Highball', 'Cocktail', 'Well'],
      price: 5.99,
      deal: false,
      dealPrice: 'N/A',
      dealDetails: 'N/A',
      description: "Traditionally, a mojito is a cocktail that consists of five ingredients: white rum, sugar (traditionally sugar cane juice), lime juice, sparkling water, and mint. Its combination of sweetness, refreshing citrus, and mint flavors is intended to complement the potent kick of the rum, and has made this clear highball a popular summer drink."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Yuengling",
      categories: ['Beer', 'Lager', 'Amber', 'Domestic'],
      price: 3.99,
      deal: true,
      dealPrice: 2.99,
      dealDetails: 'All American beers 20% off today.',
      description: "D. G. Yuengling & Son is the oldest operating brewing company in the United States, established in 1829. It is one of the largest breweries by volume in the country. Based on sales in 2011, Yuengling was tied with the Boston Beer Company, maker of Samuel Adams brands, as the largest American-owned brewery."
    },
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Cabernet sauvignon",
      categories: ['Wine', 'Red Wine', 'House Wine'],
      price: 7.99,
      deal: false,
      dealPrice: 'N/A',
      dealDetails: 'N/A',
      description: "Cabernet Sauvignon is one of the world's most widely recognized red wine grape varieties. It is grown in nearly every major wine producing country among a diverse spectrum of climates from Canada's Okanagan Valley to Lebanon's Beqaa Valley."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Bourbon",
      categories: ['Mixed Drink', 'Bourbon', 'Whiskey', 'Premium'],
      price: 7.99,
      deal: false,
      dealPrice: 'N/A',
      dealDetails: 'N/A',
      description: "Bourbon whiskey is a type of American whiskey: a barrel-aged distilled spirit made primarily from corn. The name is ultimately derived from the French Bourbon dynasty, although it is disputed whether Bourbon County in Kentucky or Bourbon Street in New Orleans inspired the whiskey's name."
    },
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Margarita",
      categories: ['Mixed Drink', 'Tequila', 'Triple Sec', 'Cocktail', 'Well'],
      price: 4.99,
      deal: true,
      dealPrice: 3.99,
      dealDetails: 'Buy one margarita, get the next one on us.',
      description: "The margarita is a cocktail consisting of tequila, triple sec and lime or lemon juice, often served with salt on the rim of the glass. The drink is served shaken with ice, blended with ice, or without ice."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Long Island Iced Tea",
      categories: ['Mixed Drink', 'Tequila', 'Vodka', 'Rum', 'Triple Sec', 'Well'],
      price: 5.99,
      deal: false,
      dealPrice: 'N/A',
      dealDetails: 'N/A',
      description: "A Long Island Iced Tea is a type of alcoholic mixed drink typically made with, among other ingredients, tequila, vodka, light rum, triple sec, and gin. It is so named because of the resemblance to the color and taste of iced tea."
    },
    { 
      storeId: 'gDG3CKm2e7XmhcCFy',
      name: "Whiskey & Coke",
      categories: ['Mixed Drink', 'Whiskey', 'Cocktail', 'Highball', 'Premium'],
      price: 5.99,
      deal: true,
      dealPrice: 4.99,
      dealDetails: 'All Jack and Cokes are 15% off tonight, all night.',
      description: "Jack and Coke (also referred to as JD and Coke) is a cocktail made with Jack Daniel's whiskey and Coca-Cola. The drink is usually served with ice in an old-fashioned glass or a Collins glass."
    },
    { 
      storeId: 'apQvCGHNKBkoXDd3B',
      name: "Mimosa",
      categories: ['Mixed Drink', 'Cocktail', 'Champagne', 'Premium'],
      price: 6.99,
      deal: false,
      dealPrice: 'N/A',
      dealDetails: 'N/A',
      description: "A Mimosa is a cocktail composed of one part champagne and one part chilled citrus fruit juice, usually orange juice unless otherwise specified. It is traditionally served in a tall champagne flute with a morning brunch or to guests at weddings."
    }
  ];

  // Meteor.methods({
  //   allDocs : function () {
  //     return Players.find().count();
  //   }
  // });
  
  Meteor.publish('allDrinks', function (limit) {
    return Drinks.find({}, { limit: limit });
  });

  if (Drinks.find().count() === 0) {
    // one hunderd thousand docs :O
    var i = 0;
    var j = 0;

    do {
      if(i == drinks.length) {
        i = 0;
      }
      Drinks.insert({
        storeId: null,
        storeSlug: null,
        name: drinks[i].name,
        categories: drinks[i].categories,
        slug: s.slugify(drinks[i].name),
        price: drinks[i].price,
        deal: drinks[i].deal,
        dealPrice: drinks[i].dealPrice,
        dealDetails: drinks[i].dealDetails,
        description: drinks[i].description
      });
      i++; 
      j++;
    }
    while (j < drinks.length*10);
  }
});