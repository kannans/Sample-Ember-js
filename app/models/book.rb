class Book < ActiveRecord::Base
  attr_accessible :author, :book_ispn, :name, :price,:image

 def image_url
	"/app/assets/"+image
 end
end
