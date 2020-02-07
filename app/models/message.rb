class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  validation :message, presence: true , unless: :image?    
  end
end
