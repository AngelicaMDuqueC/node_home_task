/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
const usersObject = require("./users");
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersWithTimestamps = usersObject.map((user) => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
      return user;
    });

    return queryInterface.bulkInsert("UserTables", usersWithTimestamps);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserTables", null, {});
  },
};
