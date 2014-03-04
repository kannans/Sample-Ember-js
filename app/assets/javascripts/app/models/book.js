App.Book  = Ember.Resource.extend({
  resourceUrl: '/book',
  resourceName: 'book',
  resourceProperties: ['name', 'author' , 'book_ispn' , 'price','image'],
	
	
	saveBook: function(isMyNew,btnVal) {
//		alert("save book")
//		alert(isMyNew);
    var self = this;

    self.set('image','ddd')
var book_image = $('#book_image').val();
alert(book_image);
    return this._resourceRequest({type: isMyNew ? 'POST' : 'PUT',
                                  data: {"key1": this.serialize(), "back_button": btnVal}})
      .done(function(json) {
        // Update properties
        if (json) self.deserialize(json);
      });
  },

});

