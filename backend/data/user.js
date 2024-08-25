import bcryptjs from "bcryptjs";

const users = [
    {
        name: 'Barnali Sikdar',
        email: 'barnaliskdr@gmail.com',
        phone: '7897654321',
        password: bcryptjs.hashSync('123456',10),//10 is called salt. the higher the number, more secure the bcryption will be.
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'doeJohn@gmail.com',
        phone:"6470923811",
        password: bcryptjs.hashSync('123456',10),
        isAdmin: false
    },
    {
        name: 'Richa Jackson',
        email: 'doeJane@gmail.com',
        phone: "38438593492",
        password: bcryptjs.hashSync('123456',10),
        isAdmin: false
    }
]

export default users;