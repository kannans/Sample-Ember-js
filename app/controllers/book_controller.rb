class BookController < ApplicationController

  def index
   @books = Book.paginate(:page => params[:page], :per_page => 50)

   respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @books }
    end

  end

def new

respond_to do |format|
         format.json { render json: {"new" => "ok"} }
      end




end



def create
p "+++++++params create+++++="
p params 
p "++++++++"
session[:book_params] ||= {}
session[:book_params].deep_merge!(params[:key1][:book]) if params[:key1][:book]

@book = Book.new( session[:book_params])

respond_to do |format|

if @book.valid?     
        @book.save 
         
         format.json { render json: @book, status: :created, location: @book }
          else
         format.json { render json: @book.errors, status: :unprocessable_entity }
        end 

     
      end


end
def edit

end

def update

p "+++++++params updaye+++++="
p params 
p "++++++++"
    @book = Book.find(params[:id])

    respond_to do |format|
      if @book.update_attributes(params[:book])      
        format.json  { render json: nil, status: :ok }
      else      
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end

end


def destroy
    @book = Book.find(params[:id])
    @book.destroy

    respond_to do |format|      
      format.json { render json: nil, status: :ok }
    end
  end

end
