import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../../lib/userRepository';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    console.log("api GET");
    if (req.query && req.query.id) {
        console.log(req.query.id);
        const user = getUser(Number(req.query.id));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        console.log("api GET all users");
        const users = getAllUsers();
        res.status(200).json(users);
    }
}

export async function POST(request: NextApiRequest) {
    console.log("api POST");
    if(request.body == undefined) 
        return { message: 'Invalid request' };

    const newUser = createUser(request.body.name, request.body.email);
    return newUser;
}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}


// export default (req: NextApiRequest, res: NextApiResponse) => {
//     console.log("api user route");
//     switch (req.method) {
//         case 'GET':
//             console.log("api user route GET");
//             if (req.query.id) {
//                 const user = getUser(Number(req.query.id));
//                 if (user) {
//                     res.status(200).json(user);
//                 } else {
//                     res.status(404).json({ message: 'User not found' });
//                 }
//             } else {
//                 const users = getAllUsers();
//                 res.status(200).json(users);
//             }
//             break;
//         case 'POST':
//             const newUser = createUser(req.body.name, req.body.email);
//             res.status(201).json(newUser);
//             break;
//         case 'PUT':
//             updateUser(Number(req.body.id), req.body.name, req.body.email);
//             res.status(200).json({ message: 'User updated' });
//             break;
//         case 'DELETE':
//             deleteUser(Number(req.body.id));
//             res.status(200).json({ message: 'User deleted' });
//             break;
//         default:
//             res.status(405).json({ message: 'Method not allowed' });
//             break;
//     }
// };
