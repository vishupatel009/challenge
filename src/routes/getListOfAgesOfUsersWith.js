"use strict";
const mockDBCalls = require("../database/index.js");

const getListOfAgesOfUsersWithHandler = async (request, response) => {
  try {
    const item = request.params.item;
    const listOfAgesOfUsersByItem = await mockDBCalls.getListOfAgesOfUsersWith(
      item
    );

    return response.status(200).send(JSON.stringify(listOfAgesOfUsersByItem));
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = app => {
  app.get("/users/age", getListOfAgesOfUsersWithHandler);
  app.get("/users/age/:item", getListOfAgesOfUsersWithHandler);
};
