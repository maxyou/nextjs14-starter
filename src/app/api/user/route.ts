import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../../lib/userRepository';
import { json } from 'micro';

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     console.log("api GET");
//     if (req.query && req.query.id) {
//         console.log(req.query.id);
//         const user = getUser(Number(req.query.id));
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } else {
//         console.log("api GET all users");
//         const users = getAllUsers();
//         res.status(200).json(users);
//     }
// }

export async function GET(request: NextRequest) {
    console.log("api GET");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        console.log(id);
        const user = await getUser(Number(id));
        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } else {
        console.log("api GET all users");
        const users = await getAllUsers();
        return NextResponse.json(users, { status: 200 });
    }
}

// export async function POST(request: NextRequest, response: NextResponse) {
//     console.log("api POST");
//     if(request.body == undefined) 
//         return { message: 'Invalid request' };

//     const body = await request.json();
//     console.log(body.name, body.email);
//     console.log(JSON.stringify(body));

//     const newUser = createUser(body.name, body.email);
//     return newUser;
// }
export async function POST(request: NextRequest) {
    console.log("api POST");

    try {
        const body = await request.json();
        console.log(body.name, body.email);
        console.log(JSON.stringify(body));

        const newUser = await createUser(body.name, body.email);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
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
