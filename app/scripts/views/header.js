define(['jquery','underscore','backbone'], function($, _, Backbone) {
  var headerView = Backbone.View.extend({
    events: {
      "click #mredwine": "displayMenuItems"
    },
    template: _.template($("#header").html()),
    initialize: function() {
      console.log("Header View initialized");
      this.render();
    },
    render: function() {
      this.$el.html(this.template);
      return this;
    }
  });
  return headerView;
});
