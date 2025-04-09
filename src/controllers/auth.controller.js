const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/data-source');
const User = require('../entities/User');

const userRepo = AppDataSource.getRepository('User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) return res.status(400).json({ message: 'Ya existe ese correo' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({ name, email, password: hashed });
    await userRepo.save(newUser);

    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en registro' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en login' });
  }
};