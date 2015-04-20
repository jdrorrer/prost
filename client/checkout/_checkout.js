Template._checkout.onCreated(function() {
  this.qtyValue = new ReactiveVar(1);
  this.tax = new ReactiveVar(0.07);
  this.drink = Drinks.findOne({slug: Template.instance().data.id});
  if(this.drink.deal) {
    this.drinkPrice = this.drink.dealPrice;
  } else {
    this.drinkPrice = this.drink.price;
  }
});

Template._checkout.helpers({
  drink: function() {
    // console.log(Template.instance().data);
    return Template.instance().drink;
  },
  totalBeforeTax: function() {
    return Template.instance().qtyValue.get() * parseFloat(Template.instance().drinkPrice);
  },
  tax: function() {
    var taxValue = Template.instance().qtyValue.get() * parseFloat(Template.instance().drinkPrice) * Template.instance().tax.get();
    return taxValue.toFixed(2);
  },
  total: function() {
    var totalValue = (Template.instance().qtyValue.get() * parseFloat(Template.instance().drinkPrice) * Template.instance().tax.get())
            + (Template.instance().qtyValue.get() * parseFloat(Template.instance().drinkPrice));
    return totalValue.toFixed(2);
  }
});

Template._checkout.events({
  'change .quantity': function(e) {
    Template.instance().qtyValue.set(e.target.value);
  },
  'click .info-icon': function() {
    IonPopup.show({
      title: "What's a CVV?",
      template: 'The CVV number is a 3 or 4 digit security code printed on the front or back of your card.',
      buttons: [{
        text: 'Close',
        type: 'button-positive',
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
  }
});