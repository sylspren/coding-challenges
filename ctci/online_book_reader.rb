class Checkout
  def initialize
    # user, book_id, due_date
  end
end

class Library
  def initialize
    @inventory = {} # book id to Book
  end

  def add_new_book
  end

  def lose_book
    # optional associated checkout/user
  end

  def check_out
    # create a Checkout if possible
  end
end

class InventoryItem
  # checkouts
  # owned count
  # bookId
end

class Book
  def initialize
    # name & other metadata for display
  end
end

class User
  # user data
end
