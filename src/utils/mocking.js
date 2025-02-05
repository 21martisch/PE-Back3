import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = (count = 10) => {
    return Array.from({ length: count }, () => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('coder123', 10),
        role: Math.random() > 0.5 ? 'user' : 'admin',
        pets: []
    }));
};

export const generateMockPets = (count = 10) => {
    return Array.from({ length: count }, () => ({
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(15),
        adopted: faker.datatype.boolean(),
        owner: null,
    }));
};