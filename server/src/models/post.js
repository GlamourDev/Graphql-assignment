module.exports = (sequelize, DataTypes) => {
  const PostList = sequelize.define(
    "PostList",
    { 
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'PostList',
    }
  );
  
  return PostList;
};