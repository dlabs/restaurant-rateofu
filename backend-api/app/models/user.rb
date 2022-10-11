# frozen_string_literal: true

class User < ApplicationRecord
  enumerate :role, with: UserRoleTypes
end
