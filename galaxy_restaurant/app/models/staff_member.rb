class StaffMember < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :role, presence: true
  validates :role, inclusion: { in: %w(chef barman waiter) }

  enum :role, { chef: 0, barman: 1, waiter: 2 }
end
