const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Contact',
  tableName: 'contacts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    phone: {
      type: 'varchar',
    },
    notes: {
      type: 'text',
      nullable: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});