import {NextRequest , NextResponse} from 'next/server';
import User from '@/model/user.model';
import { connectDB } from '@/db/db';
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request : NextRequest){

        try {   
             const reqBody = await request.json();
             const {name , email , password} = reqBody;

             const findUser = await User.findOne({email});

             if(findUser){
            
                    return NextResponse.json({
                        message : "Email is already exist Provide defrent email",
                        userExist : true
                    })
             }

             const salt = await bcryptjs.genSalt(10);
             const hashedPassword = await bcryptjs.hash(password , salt);

             const newUser = new User({
                name,
                email,
                password : hashedPassword
             })

             const savedUser =  await newUser.save()      
             
             return NextResponse.json(
                {
                    message : "User created successfully",
                    success : true,
                    savedUser
                })

        } catch (error) {
           
            return NextResponse.json({message : "User not created"} , {status : 500})
        }
}

