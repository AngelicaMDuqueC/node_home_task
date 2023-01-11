import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class UserModel extends Model {
  public id!: number;
  public login!: string;
  public password!: string;
  public age!: number;
  public createdAt!: Date;
  public readonly updatedAt!: Date;
}
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: new DataTypes.STRING(25),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(8),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "UserTable", timestamps: false }
);

export default UserModel;
