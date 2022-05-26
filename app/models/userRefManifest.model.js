const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class UserRefManifest extends Model {}

	UserRefManifest.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
			},
			manifest_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'userRefManifest',
			tableName: 'user_ref_manifest',
			indexes: [
				{
					unique: true,
					fields: ['user_id', 'manifest_id'],
				},
			],
		},
	);
	return UserRefManifest;
};
