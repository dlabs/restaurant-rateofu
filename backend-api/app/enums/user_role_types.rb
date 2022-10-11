# frozen_string_literal: true

class UserRoleTypes < ActiveEnum::Base
  value id: 1, name: 'Chef', symbol: :chef
  value id: 2, name: 'Barman', symbol: :barman
  value id: 3, name: 'Waiter', symbol: :waiter
end
