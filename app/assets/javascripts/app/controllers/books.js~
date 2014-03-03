App.booksController = Ember.ResourceController.create({
  resourceType: App.Book,

  loadValuesUpto: function(obj,num) {
console.log(obj)
console.log(num)
    this.set('totalValues' , num);
    for (var i=0; i <  obj.length; i++)
      this.load(obj[i]);   
  }
});


