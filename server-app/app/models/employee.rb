class Employee < ApplicationRecord
  module Kind
    Waiter = "waiter"
    Barman = "barman"
    Chef = "chef"
  end
end
