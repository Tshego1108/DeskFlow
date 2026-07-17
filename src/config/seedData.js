const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * Seed predefined users into the database if they do not already exist.
 * - Admin: Phina Mabelane (p.mabelane@deskflow.com)
 * - Employee: Tshegofatso Selahle (tshego.selahle@deskflow.com)
 */
async function seedUsers() {
  const users = [
    {
      name: 'Phina Mabelane',
      email: 'p.mabelane@deskflow.com',
      password: 'Admin@123',
      role: 'Admin'
    },
    {
      name: 'Tshegofatso Selahle',
      email: 'tshego.selahle@deskflow.com',
      password: 'Employee@123',
      role: 'Employee'
    }
  ];

  for (const u of users) {
    try {
      const existing = await User.findOne({ email: u.email });
      if (existing) {
        console.log(`✓ ${u.role} already exists`);
        continue;
      }

      const hashed = await bcrypt.hash(u.password, 10);
      const user = new User({ name: u.name, email: u.email, password: hashed, role: u.role });
      await user.save();
      console.log(`✓ ${u.role} created`);
    } catch (err) {
      console.error(`Failed to seed user ${u.email}:`, err.message);
    }
  }
}

module.exports = seedUsers;
