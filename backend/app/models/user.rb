class User < ApplicationRecord
  has_secure_password   # enables password hashing + authentication
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[user admin] }
  has_secure_password
  has_many :reviews
  has_many :bookings, dependent: :destroy

  
  validates :name, presence: true
  validates :email, presence: true, 
                    uniqueness: { case_sensitive: false }, 
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :name, uniqueness: { case_sensitive: false }, allow_blank: true
  
  before_save :downcase_email
  
  
  enum role: { user: 0, admin: 1 }, _default: :user

  # For remember me functionality
  def remember
    self.remember_token = SecureRandom.urlsafe_base64
    update_attribute(:remember_digest, digest(remember_token))
  end

  # For password reset
  def create_reset_digest
    self.reset_token = SecureRandom.urlsafe_base64
    update_columns(
      reset_digest: digest(reset_token),
      reset_sent_at: Time.zone.now
    )
  end

  # For email confirmation
  def confirm_email
    update_columns(
      email_confirmed: true,
      confirm_token: nil
    )
  end

  private

  def downcase_email
    self.email = email.downcase
  end

  # def generate_confirmation_token
  #   self.confirm_token = SecureRandom.urlsafe_base64
  # end

  def digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)

  
  
  end
end
