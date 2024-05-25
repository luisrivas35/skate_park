import { User } from "../models/users.model.js";
import { handleError } from "../database/errors.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res.status(code).json({ ok: false, msg });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { nombre, balance } = req.body;

    if (!nombre || !balance) {
      return res.status(400).json({ ok: false, msg: "campos requeridos" });
    }

    const newUser = {
      nombre,
      balance,
    };

    const user = await User.create(newUser);
    return res.json(user);
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res.status(code).json({ ok: false, msg });
  }
};

export const removeUser = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    const user = await User.remove(id);
    return res.json(user);
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res.status(code).json({ ok: false, msg });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.params); 
  console.log(req.body);
  try {
    const { id } = req.params; 
    const { nombre, balance } = req.body;
   
    if (!id) {
      return res
        .status(400)
        .json({ ok: false, msg: "ID no se encuentra" });
    }
    
    const user = await User.update({ id, nombre, balance });

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontardo" });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res.status(code).json({ ok: false, msg });
  }
};

export const getUserByName = async (req, res) => {
  const { name } = req.params;
  try {
    const user = await User.getUserByName(name);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error .... Usuario no se encuentra" });
  }
};



