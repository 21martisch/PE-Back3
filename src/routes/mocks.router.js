import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import bcrypt from 'bcrypt';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(10); 
    res.json({ status: 'success', pets });
});

router.get('/mockingusers', async (req, res) => {
    const users = generateMockUsers(50);
    res.json({ status: 'success', users });
});

router.post('/generateData', async (req, res) => {
    const { users = 10, pets = 10 } = req.body;

    try {
        const usersData = generateMockUsers(users);
        await UserModel.insertMany(usersData);

        const petsData = generateMockPets(pets);
        await PetModel.insertMany(petsData);

        res.json({ status: 'success', message: 'Datos generados correctamente', users, pets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error al generar datos' });
    }
});

export default router;