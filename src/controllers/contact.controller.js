const { AppDataSource } = require('../config/data-source');
const Contact = require('../entities/Contact');

const contactRepo = AppDataSource.getRepository('Contact');

exports.createContact = async (req, res) => {
  const { name, email, phone, notes } = req.body;

  try {
    const newContact = contactRepo.create({
      name,
      email,
      phone,
      notes,
      user: { id: req.user.id },
    });

    await contactRepo.save(newContact);
    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear contacto' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await contactRepo.find({
      where: { user: { id: req.user.id } },
      relations: ['user'],
    });

    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener contactos' });
  }
};

exports.updateContact = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, notes } = req.body;

  try {
    const contact = await contactRepo.findOne({
      where: { id, user: { id: req.user.id } },
      relations: ['user'],
    });

    if (!contact) return res.status(404).json({ message: 'No encontrado' });

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.notes = notes;

    await contactRepo.save(contact);
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar' });
  }
};

exports.deleteContact = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const contact = await contactRepo.findOne({
      where: { id, user: { id: req.user.id } },
      relations: ['user'],
    });

    if (!contact) return res.status(404).json({ message: 'No encontrado' });

    await contactRepo.remove(contact);
    res.json({ message: 'Contacto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar' });
  }
};