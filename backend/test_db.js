require('dotenv').config();
const mongoose = require('mongoose');
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected!');
  return mongoose.connection.db.collection('users').find({}).toArray();
}).then(users => {
  console.log('Users found:', users.length);
  users.forEach(u => console.log(' -', u.email, '| role:', u.role));
  process.exit(0);
}).catch(err => {
  console.log('Error:', err.message);
  process.exit(1);
});
