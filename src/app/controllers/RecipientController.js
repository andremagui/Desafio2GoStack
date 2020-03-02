import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
      cep: Yup.string()
        .required()
        .length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res
        .status(400)
        .json({ error: 'Recipient already exists. Please, choose another.' });
    }

    const {
      id,
      name,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      cep,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      cep,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const recipientExists = await Recipient.findByPk(req.params.id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exist.' });
    }

    const {
      id,
      name,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      cep,
    } = await Recipient.update(req.body);

    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      cep,
    });
  }
}

export default new RecipientController();
