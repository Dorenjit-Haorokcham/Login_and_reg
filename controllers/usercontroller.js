const bcrypt = require('bcrypt');
const { getDatabase } = require('../modules/database');
const HttpError = require('../modules/error')
const {validationResult}= require('express-validator');
const path = require('path');

const registerUser = async (req, res) => {
    const Verror = validationResult(req);
  try {
    if(!Verror.isEmpty()){
        console.log(Verror);
        throw new HttpError ('Invalid input',422);
    }
    const { username, email, password } = req.body;
    const existingUser = await getDatabase().collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await getDatabase().collection('users').insertOne({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(Verror.errors);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getDatabase().collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
