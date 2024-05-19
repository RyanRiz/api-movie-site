import bcrypt from 'bcrypt';
import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';

async function register(req, res) {
    const { username, email, password, confPassword } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ error: 'Password and Confirm Password do not match.' });
    }

    try {
        const existingnameUser = await Users.findOne({ where: { username } });
        const existingEmail = await Users.findOne({ where: { email } });

        if (existingnameUser) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'Username already exists.' 
            });
        }

        if (existingEmail) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'Email already exists.' 
            });
        }

        await Users.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10)
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully.'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while processing your request.',
            error: error.message 
        });
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            status: 'fail',
            message: 'Username and password are required.' 
        });
    }

    try {
        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'User not found.' 
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ 
                status: 'fail',
                message: 'Invalid password.' 
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000});

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully.'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while processing your request.',
            error: error.message 
        });
    }
}

async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        status: 'success',
        message: 'User logged out successfully.'
    });
}

export default { register, login, logout };