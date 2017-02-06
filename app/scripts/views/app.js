define(['jquery','underscore','backbone'], function($, _, Backbone) {
  var products;
  var App = Backbone.View.extend({
    el: $("#container"),
    template: _.template($("#homepage").html()),
    render: function () {
      var markup = _.template($("#homepage").html());
      this.$el.html(markup);
    },
    initialize: function () {
      console.log("Wine View initialized");
      //this.WineModel1 = new WineModel();
      this.render();
    },
    events: {
      "click #redwine": "getWineData",
      "click #whitewine": "getWineData",
      "click #champagne": "getWineData",
      "click #collectible": "getWineData",
      "click .product-img": "getWineDetails",
      "click .submenu": "displayMenuItems",
      "click .menu-redwine": "displayMenuItems"
    },
    displayMenuItems: function(e) {
      getWineDetails(e);
    },
    getWineDetails: function (e) {
      var objIndex = $(e.currentTarget).data('index');
      var list = products["Products"];
      var obj = list["List"][objIndex];
      var markup=_.template($('#productDetail').html());
     this.$el.html(markup({name: obj.Name, price: obj.PriceRetail, vintage: obj.Vintage, style: obj["ProductAttributes"][0].Name, thumbnail: obj['Labels'][0].Url}));
    },
    getWineData: function (e) {
      //perform a rest call here to fetch data related to a specific category
      var category =  $(e.currentTarget).data('category');
      var winefilter =  $(e.currentTarget).data('winefilter');
      this.loadWines(category,winefilter);
    },
    loadWines: function (categoryName,filter) {
      var self=this;
      var response = $.ajax({
        url: 'http://services.wine.com/api/beta2/service.svc/json/catalog?filter=categories'+filter+'&apikey=fabd6ec3a4a1efe7a1fa10e3a656ac0b',
        method: 'GET'
      }).then(function(res) {
        products = res;
        console.log("response: ",res.Products.length);
        var markup=_.template($('#displayItems').html());
        var obj = res["Products"];
        var list = obj["List"];
        self.$el.html(markup({category: categoryName, response: list}));
        //self.addListItems(res);
      }).catch(function(err) {
        console.log("Error in request: ",err);
      });
      console.log("response: ",response);
    }
  });
  return App;
});
