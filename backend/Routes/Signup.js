
import express from 'express';
import { verifyToken } from '../middleware/Authmiddle.js';
import User from '../models/User.js'
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/signup',
    [body('email').isEmail(),
    body('name'),
    body('password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        
        // Securely assign role
        let assignedRole = "customer";
        if (req.body.role === "admin") {
            const token = req.header("auth-token");
            if (token) {
                try {
                    const decoded = verifyToken(token);
                    if (decoded && decoded.role === "admin") {
                        assignedRole = "admin";
                    }
                } catch (err) {
                    console.error("Token verification failed during signup:", err.message);
                }
            }
        }

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                role: assignedRole
            }).then(user => {
                console.log("User registered successfully:", user);
                res.status(200).json({ message: "User registered successfully", user: user });
            })
        }
        catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ success: false, message: "Email already exists" });
            }
            res.status(400).send(error);
        }
    });

router.get('/signup', async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json(allUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});

export default router;