class Book < ActiveRecord::Base
  attr_accessible :author, :book_ispn, :name, :price,:image
 validates :name,:author,:book_ispn,:price, :presence => true 
 def image_url
	"/app/assets/"+image
 end
end
