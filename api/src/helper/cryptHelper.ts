import bcrypt from 'bcrypt';

class Crypt {
  async encrypt(password: string) {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      return hash;
    } catch (error) {
      throw error;
    }
  }
  async compare(hash1: string, hash2: string) {
    try {
      const result = await bcrypt.compare(hash1, hash2);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export const cryptHelper = new Crypt();
