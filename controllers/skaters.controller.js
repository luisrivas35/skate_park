import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import {
  findAll,
  findByEmail,
  updateSkater,
  deleteSkater,
  updateSkaterEstado,
  createSkater as createSkaterModel,
} from "../models/skaters.model.js";

export const getAllSkaters = async (req, res) => {
  try {
    const skaters = await findAll();
    res.render("index", { skaters }); 
  } catch (err) {
    res.status(500).render("error", { err });
  }
};

export const registryForm = (req, res) => {
  try {
    res.status(200).render("registro");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { err });
  }
};

export const createSkater = async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad, estado } =
    req.body;

  if (!req.files || !req.files.foto) {
    return res.status(400).send("No files were uploaded.");
  }
  const photo = req.files.foto;
  const __dirname = path.resolve();

  const dir = path.join(__dirname, "public/assets/imgs");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const photoPath = path.join("assets/imgs", photo.name);
  const uploadPath = path.join(__dirname, "public", photoPath);

  photo.mv(uploadPath, async function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("Photo uploaded successfully");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSkater = {
      email,
      nombre,
      password: hashedPassword,
      anos_experiencia,
      especialidad,
      foto: photoPath, 
      estado: true,
    };

    try {
      await createSkaterModel(newSkater);
      console.log("Skater created successfully", JSON.stringify(newSkater));
      return res.status(201).redirect("/");
    } catch (err) {
      console.error("Error creating skater:", err);
      res.status(500).render("error", { err });
    }
  });
};

export const login = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).render("error", { err: "Login Error" });
  }
};

export const checkLogin = async (req, res) => {
  const { email, password } = req.body;
    
  try {
    const user = await findByEmail(email);

    if (!user) {
      return res.status(404).send("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { email: user.email, is_admin: user.is_admin },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      req.session.token = token;
      req.session.email = user.email;
      
      if(user.is_admin) {
        return res.status(200).redirect("/admin");

      }
      return res.status(200).render("datos", { user });

    } else {
      res.status(401).send("Incorrect password");
    }
  } catch (err) {
    res.status(500).render("error", { err: "Error in Login" });
  }
};

export const logAdmin = async (req, res) => {
  
  try {
    const skaters = await findAll();
    res.render("admin", { skaters });
  } catch (err) {
    res.status(500).render("error", { err });
  }
};

export const getProfile = async (req, res) => {
  const email = req.session.email;
  try {
    const skater = await findByEmail(email);
    res.render("datos", { skater });
  } catch (err) {
    res.status(500).render("error", { err });
  }
};

export const updateProfile = async (req, res) => {
  const email = req.session.email;
  const { nombre, password, passwordRepeat, anos_experiencia, especialidad } = req.body;

  if (!email) {
    return res.status(400).render("error", { err: "Session email is undefined" });
  }

  if (password && password !== passwordRepeat) {
    return res.status(400).render("error", { err: "Passwords do not match" });
  }

  try {
    const user = await findByEmail(email);

    if (!user) {
      return res.status(404).render("error", { err: "User not found" });
    }

    let updatedData = {
      nombre,
      anos_experiencia,
      especialidad,
      password: user.password 
    };

    
    if (password && password !== user.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    await updateSkater(email, updatedData);

    res.redirect("/");
    
  } catch (err) {
    res.status(500).render("error", { err: "Error updating profile" });
  }
};

export const deleteAccount = async (req, res) => {
  const email = req.session.email;

  try {
    await deleteSkater(email); 
    req.session.destroy(); 
    res.json({ success: true }); 
  } catch (err) {
    res.status(500).render("error", { err: "Deleting Skater error" }); 
  }
};

export const updateEstado = async (req, res) => {
  const skaterId = req.params.id;
  const { estado } = req.body;

  try {
    await updateSkaterEstado(skaterId, estado);
    res.status(200).send("Estado updated successfully");
  } catch (error) {
    res.status(500).render("error", { err: "Updating Estado fails" });
  }
};





