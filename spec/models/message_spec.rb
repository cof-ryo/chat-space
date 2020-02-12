require 'rails_helper'
RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it "is invalid without a content" do
        expect(build(:message, content: nil)).to be_valid
      end

      it "is valid without a image" do
        expect(build(:message, image: nil)).to be_valid
      end

      it "is valid with a content, image " do
        expect(build(:message)).to be_valid
      end
    end

    context "can't save" do
      it "is invalid without a content,image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "is invalid without a group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid without a user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
