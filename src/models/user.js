const db = require('../config/firestore');

const usersCollection = db.collection('users'); // Nama koleksi pengguna

const User = {
  // Simpan data pengguna baru
  async createUser({ googleId, name, email, avatar }) {
    try {
      if (!googleId || !name || !email) {
        throw new Error('Missing required fields: googleId, name, or email');
      }

      const userRef = usersCollection.doc(googleId);
      const newUser = {
        googleId,
        name,
        email,
        avatar: avatar || null, // Avatar opsional
        role: 'user', // Tambahkan atribut role
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await userRef.set(newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  },

  // Cari pengguna berdasarkan Google ID
  async findUserByGoogleId(googleId) {
    try {
      if (!googleId) {
        throw new Error('Google ID is required to find user');
      }

      const userRef = usersCollection.doc(googleId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error finding user by Google ID:', error);
      throw new Error('Failed to find user');
    }
  },
};

module.exports = User;
