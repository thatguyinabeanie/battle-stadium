class AddSlugToOrganizations < ActiveRecord::Migration[7.2]
  def change
    add_column :organizations, :slug, :string
    add_index :organizations, :slug, unique: true
  end
end
