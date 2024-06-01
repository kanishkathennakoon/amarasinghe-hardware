import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Amarasinghe',
        email: 'amare@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Siril',
        email: 'siril@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }
];

export default users;
