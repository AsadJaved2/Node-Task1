const { users } = require("../models/usermodel");

exports.createUser = (req, res) => {
  const { id, name, email } = req.body;
  if (id && name && email) {
    users.push({ id, name, email });
    res.status(201).json({ user: { id, name, email } });
  } else res.status(404).json({ message: "Any Field of user is missing" });
};
exports.getAllUsers = (req, res) => {
  res.status(201).json(users);
};

exports.getUserById = (req, res) => {
    const {id} = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((u) => u.id === id);
  if (user) {
    user.name = name;
    user.email = email;
    res.json({ message: "User Updated successfully", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: "User Deleted Successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

