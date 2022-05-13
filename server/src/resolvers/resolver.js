const jsonwebtoken = require("jsonwebtoken");
const models = require("../models");
const { Op } = require("sequelize");
require("dotenv").config({ path: "../.env" });

const resolvers = {
  Query: {
    async getPostsList(_, args, { auth }) {
      try {
        if (!auth) throw new Error("You are not authenticated!");
        const { search, pagination, sort } = args;

        console.log(args);

        let query = {
          offset: 0,
          limit: 3,
          raw: true
        };

        if (pagination) {
          query.limit = pagination.items;
          query.offset = pagination.items * (pagination.page - 1);
        }

        if (sort) {
          query.order = [[sort, "ASC"]];
        }

        return Promise.all([
          models.PostList.count(),
          models.PostList.findAndCountAll(query)
        ]).then(([totalCount, filteredData]) => {
          return {
            total: totalCount,
            filtered: filteredData.count,
            posts: filteredData.rows
          }
        })

      } catch (error) {
        throw new Error(error.message);
      }
    }
  },


  Mutation: {
    async registerUser(_, { email, password }) {
      try {
        const userCheck = await models.User.findOne({
          where: { email: email },
        });

        if (userCheck) throw new Error("Email already exists");

        const user = await models.User.create({
          email,
          password,
        });

        const token = jsonwebtoken.sign(
          { email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );

        let createdUser = {
            email: user.email,
        };

        return {
          token,
          user: createdUser,
          message: "Registration successful",
        };
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },

    async login(_, { email, password }) {
      try {
        const user = await models.User.findOne({ where: { email } });

        if (!user) throw new Error("No user with that email");
        
        const isValid = await models.User.validPassword(
          password,
          user.password
        );

        if (!isValid)  throw new Error("Incorrect password");

        // return jwt
        const token = jsonwebtoken.sign(
          { employeeId: user.employeeId, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
