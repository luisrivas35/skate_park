import { Transfer } from "../models/transfer.model.js";
import { handleError } from "../database/errors.js";
import { User } from "../models/users.model.js";


export const getAllTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.findAll();
    return res.json(transfers);
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res.status(code).json({ ok: false, msg });
  }
};


export const createTransfer = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { emisor, receptor, monto } = req.body;

    if (!emisor || !receptor || !monto) {
      return res.status(400).json({ ok: false, msg: "Campos requeridos" });
    }

    const emisorUser = await User.getUserById(emisor);
    const receptorUser = await User.getUserById(receptor);

    const newTransfer = {
      emisor: emisorUser.id,
      receptor: receptorUser.id,
      monto, 
    };

    const transfer = await Transfer.create(newTransfer);
    return res.json({ ok: true, transfer });
  } catch (error) {
    console.log(error);
    const { code, msg } = handleError(error);
    return res.status(code).json({ ok: false, msg });
  }
};

