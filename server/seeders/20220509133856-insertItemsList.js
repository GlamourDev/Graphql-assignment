"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    let newData = [];

    for (let i = 0; i < 50; i++) {
      const seedData = {
        title: `Kadrioru uks ${i + 1}`,
        description: "Lorem ipsum dolor sit amet",
      };
      newData.push(seedData);
    }

    await queryInterface.bulkInsert(
      "PostList", newData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
