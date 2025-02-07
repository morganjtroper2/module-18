import { User } from '../models/User.js'; // Added .js
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
