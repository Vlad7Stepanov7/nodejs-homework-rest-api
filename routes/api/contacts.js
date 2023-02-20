const express = require('express');
const contacts = require("../../models/contacts");
const {HttpError} = require("../../helpers");
const Joi = require("Joi");

const router = express.Router();

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json(result);

  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json(result);

  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
        const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);

  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json({
      message: "Delete success"
    })

  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json(result);

  } catch (error) {
    next(error);
  }
})

module.exports = router;
