import DataAccessError from "./DataAccessError.js";
import FileDao from "./FileDao.js";

const FILE_NAME = "USERS";
const users = deserialize() ?? {};

function serialize() {
  FileDao.saveData(FILE_NAME, users);
}

function deserialize() {
  return FileDao.retrieveData(FILE_NAME);
}

function createUser(username) {
  if (isExistingUser(username)) {
    throw new DataAccessError(
      `User with username '${username}' already exists`
    );
  }
  const user = {
    username,
    following: [],
  };
  users[username] = user;
  serialize();
  return user;
}

function isExistingUser(username) {
  return users[username] !== undefined;
}

function followUser(usernameOfFollower, usernameToFollow) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    throw new DataAccessError(`${usernameOfFollower} does not exist`);
  }

  if (user.following.includes(usernameToFollow)) {
    return user;
  }

  user.following.push(usernameToFollow);
  serialize();
  return user;
}

function unfollowUser(usernameOfFollower, usernameToUnfollow) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    throw new DataAccessError(`${usernameOfFollower} does not exist`);
  }

  user.following = user.following.filter(
    (username) => username !== usernameToUnfollow
  );
  serialize();
  return user;
}

function getFollowingUsernames(usernameOfFollower) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    throw new DataAccessError(`${usernameOfFollower} does not exist`);
  }
  return user.following;
}

function getAllUsers() {
  return Object.keys(users);
}

export default {
  createUser,
  followUser,
  getFollowingUsernames,
  unfollowUser,
  getAllUsers,
};
