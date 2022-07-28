class User < ApplicationRecord
  enum role: %i[chef barman waiter]
end
