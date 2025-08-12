class ChangeScoreToDecimalInReviews < ActiveRecord::Migration[7.1]
  def up
    # Convert only valid numeric strings; set others to NULL
    execute <<~SQL
      UPDATE reviews
      SET score = NULL
      WHERE score !~ '^[0-9]+(\.[0-9]+)?$';
    SQL

    change_column :reviews, :score, :decimal, precision: 5, scale: 2, using: 'score::numeric'
  end

  def down
    change_column :reviews, :score, :string
  end
end
