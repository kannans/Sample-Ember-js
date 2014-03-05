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

data_url = params[:key1][:book][:image]
jpeg = Base64.decode64(data_url['data:image/jpeg;base64,'.length .. -1])
#File.open('app/assets/' + params[:key1][:book][:name], 'wb') { |f| f.write(jpeg) }
File.open('app/assets/'+ params[:key1][:book][:name] +'.jpeg', 'wb') { |f| f.write(jpeg) }
@book = Book.new(:name=> params[:key1][:book][:name],:author=>params[:key1][:book][:author],:book_ispn=>params[:key1][:book][:book_ispn],:price=>params[:key1][:book][:price],:image=>"#{params[:key1][:book][:name]}.jpeg")

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
