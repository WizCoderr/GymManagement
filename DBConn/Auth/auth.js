import Gym from '../../Modals/gym.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

    try {

        const token = req.cookies.cookie_token;

        if (!token) {

            return res.status(401).json({ error: 'No token, authorization denied' });

        }

        const decode = jwt.verify(token, process.env.JWT_SecretKey);

        req.gym = await Gym.findById(decode.gym_id).select('-password');

        next();



    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
}

export default auth;