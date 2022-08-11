const users = [];

// ========================= Add user ======================
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) {
    return { error: "Username is token" };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

// ======================== Remover User ===================
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// ======================= Get User =======================
const getUser = (id) => users.find((user) => user.id === id);

//======================= Get User In Room ================
const getUserInRoom = (room) => users.filter((user) => user.room === room);

// ======================== Export Function ===============
module.exports = { addUser, removeUser, getUser, getUserInRoom };
