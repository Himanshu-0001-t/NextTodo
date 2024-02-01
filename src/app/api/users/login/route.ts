import {NextRequest , NextResponse} from 'next/server';
import User from '@/model/user.model';
import { connectDB } from '@/db/db';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request : NextRequest){

    try {   

        const reqBody = await request.json();
        const {email , password} = reqBody;

        const findUser = await User.findOne({email})

        if(!findUser){
            return NextResponse.json({message : "user not found" , success : false});
        }
    
        const passwordCheck = await bcryptjs.compare(password , findUser.password);

        if(!passwordCheck){
            return NextResponse.json({message : "Wront Input" , success : false})
        }

        const tokenData = {
            id : findUser._id,
            name : findUser.name,
            email : findUser.email
        }

        const token = jwt.sign({tokenData} , "tokensecret" , {expiresIn : '1d'})

        const response = NextResponse.json({
            message : "Login Successfully",
            success : true
        })

        response.cookies.set("Token" , token, {
            httpOnly : true,
            secure : true
        })
        
        return response

    } catch (error :any) {
        
        return NextResponse.json({message : "Login Faild"})
    }
}