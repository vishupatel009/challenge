"use strict";
const mockDBCalls = require("../database/index.js");

const getUsersHandler = async (request, response) => {
  try {
    const users = await mockDBCalls.getUsers();
    return response.status(200).send(JSON.stringify(users));
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = app => {
  app.get("/users", getUsersHandler);
};
