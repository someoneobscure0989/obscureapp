class Product < ApplicationRecord
  validates :slug, presence: true
  has_many :reviews
end
