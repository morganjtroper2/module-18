import { User } from '../models/User.js';
import { signToken } from '../services/auth.js';

export const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return User.findById(context.user._id);
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Incorrect credentials');
      }

      const token = signToken(user.username, user.email, String(user._id)); // ✅ Ensure _id is a string
      return { token, user };
    },
  },
};