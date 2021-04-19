"use strict";
const _ = require("lodash");
const db = require("./db.js");

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = dataAccessMethod => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo);
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = item => {
  const dataAccessMethod = () => {
    const userList = _.map(db.usersById, userInfo => userInfo);

    // key value pair for username and age
    const listOfUsersWithAges = userList.reduce(
      (acc, o) => ((acc[o.username] = o.age), acc),
      {}
    );

    // filtering data by param
    const findItemBelongsToUsers = Object.keys(
      db.itemsOfUserByUsername
    ).filter(k => db.itemsOfUserByUsername[k].includes(item));

    let count = {};
    let filteredAgeOfUser = findItemBelongsToUsers.map(
      i => listOfUsersWithAges[i]
    );
    filteredAgeOfUser.forEach(function (j) {
      count[j] = (count[j] || 0) + 1;
    });

    const usersWithCount = Object.keys(count).map(key => {
      return {
        age: key,
        count: count[key]
      };
    });

    const combinedUniqueItems = _.uniq(
      _.map(db.itemsOfUserByUsername, items => items).reduce(
        (a, b) => a.concat(b),
        []
      )
    );

    if (item) {
      return usersWithCount;
    } else {
      return combinedUniqueItems;
    }
  };

  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getListOfAgesOfUsersWith
};
