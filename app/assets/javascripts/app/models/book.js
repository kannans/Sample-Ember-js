App.Book  = Ember.Resource.extend({
  resourceUrl: '/book',
  resourceName: 'book',
  resourceProperties: ['name', 'author' , 'book_ispn' , 'price','image'],
	
	

validate: function() {

   if (this.get('name') === undefined || this.get('name') === '' ||
        this.get('author') === undefined  || this.get('author') === '' ||
        this.get('book_ispn') === undefined  || this.get('book_ispn') === '' ||
        this.get('image') === undefined  || this.get('image') === '' ||
        this.get('price') === undefined  || this.get('price') === '') {
      alert("Book require a name, author,ispn no and price , image.")
      return "Book require a name, author,ispn no and price , image.."
      
    }
  },
  saveBook: function(isMyNew,btnVal) {
    var self = this;
    var book_image = $('#book_image').attr('src');
    self.set('image',book_image);
    //alert(this.validate);
    if (this.validate !== undefined) {
      var error = this.validate();
      if (error) {
        return {
          fail: function(f) { f(error); return this; },
          done: function() { return this; },
          always: function(f) { f(); return this; }
        };
      }
    }

    return this._resourceRequest({type: isMyNew ? 'POST' : 'PUT',
                                  data: {"key1": this.serialize(), "back_button": btnVal}})
      .done(function(json) {
        // Update properties
        //alert("updates");
        if (json) self.deserialize(json);
      });
  },





image_url: Ember.computed(function() {
  this.set('path','/images/');
    return this.get('path') + this.get('image');
  }).property('path', 'image')
});

