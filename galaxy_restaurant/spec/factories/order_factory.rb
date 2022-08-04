FactoryBot.define do
  factory :order do
    total { 0 }
    association :table
  end

  factory :table do
    id { "a589d607-2843-4a35-9e49-753cabef71df" }
  end
end
