FactoryBot.define do
  factory :user do
    username { Faker::Name.name }
    role { 0 }
  end
end
