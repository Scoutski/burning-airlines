var app = app || {};

app.SearchView = Backbone.View.extend({
      el: "#main",

      events: {
        'click': 'findFlights'
      },

  render: function() {

    this.$el.html($("#search").html());
  },
  
  PlaneIndexTemplate: function() {
        app.router.navigate('app/planes/' + this.collection.models[0].get('id'), true);
  },
});

var findFlights = function(origin, destination) {
  origin = origin || "";
  destination = destination || "";

  var result = [];
  if (origin !== "" && destination !== "") {
    for (var i = 0; i < app.allFlights.toJSON().length; i++) {
      var thisOri = app.allFlights.toJSON()[i].origin;
      var thisDest = app.allFlights.toJSON()[i].destination;

      if (thisOri === origin.toUpperCase() && thisDest === destination.toUpperCase()) {
        console.log('we have a match!');
        result.push(app.allFlights.models[i]);
      }
    };
  } else if (destination !== "") {
    for (var j = 0; j < app.allFlights.toJSON().length; j++) {
      var thisDest = app.allFlights.toJSON()[j].destination;
      if (thisDest === destination.toUpperCase()) {
        console.log('the destination is a match!');
        result.push(app.allFlights.models[j]);
      }
    }
  } else if (origin !== "") {
    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisOri = app.allFlights.toJSON()[k].origin;
      if (thisOri === origin.toUpperCase()) {
        console.log('the origin is a match!');
        result.push(app.allFlights.models[k]);
      }
    }
  };
  console.log(result);
  renderResults(result);
};

var renderResults = function(results) {
  $('#searchResults').html('');

  for ( var i = 0; i < results.length; i++ ) {
    var flightIndexView = new app.FlightIndexView({model: results[i]});
    flightIndexView.render();
  }
};

