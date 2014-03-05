App.Book  = Ember.Resource.extend({
  resourceUrl: '/book',
  resourceName: 'book',
  resourceProperties: ['name', 'author' , 'book_ispn' , 'price','image'],
	
	
	saveBook: function(isMyNew,btnVal) {
//		alert("save book")
//		alert(isMyNew);
    var self = this;

    
var book_image = $('#book_image').attr('src');
self.set('image',book_image);

    return this._resourceRequest({type: isMyNew ? 'POST' : 'PUT',
                                  data: {"key1": this.serialize(), "back_button": btnVal}})
      .done(function(json) {
        // Update properties
        if (json) self.deserialize(json);
      });
  },
image_url: Ember.computed(function() {
  this.set('path','/assets/');
    return this.get('path') + this.get('image');
  }).property('path', 'image')
});

