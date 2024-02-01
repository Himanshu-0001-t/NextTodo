import {NextRequest , NextResponse} from 'next/server'
import { connectDB } from '@/db/db'
import { getDataFromToken } from '@/util/helper'
import User from '@/model/user.model';

connectDB()

export async function GET(request : NextRequest){
    try {
            const userId = await getDataFromToken(request);
            const findUser = await User.findOne({_id : userId.tokenData.id }).select("-password")
          
            return NextResponse.json({
                message : "User Found",
                findUser
            })
          
    } catch (error) {
            
            return NextResponse.json({message : "User Id Not Match"})
    }
}