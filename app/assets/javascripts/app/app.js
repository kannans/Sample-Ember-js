App = Ember.Application.create();

App.displayError = function(e) {
  if (typeof e === 'string') {    
//    alert(e);
  }
  else if (typeof e === 'object' && e.responseText !== undefined) {
    // TODO - further process json errors
    var obj = jQuery.parseJSON(e.responseText);
   
   arr = jQuery.map(obj, function (key, val) {
      return val  +" " + key;
    });

   
//    alert(arr);

    //alert(e.responseText);
  }
  else {
    alert("An unexpected error occurred.");
  }
};





 
