import {NextResponse , NextRequest} from "next/server";
import Todo from "@/model/todo.model";
import { connectDB } from "@/db/db";
import { getDataFromToken } from "@/util/helper";

connectDB()

export async function GET(required : NextRequest){
        try {

            const token = await getDataFromToken(required);
            const userTokenId = token.tokenData.id;

            const allTods = await Todo.find({createdBy : userTokenId}).select("-createdBy") ; 

            return NextResponse.json({message : "Todo Find" , allTods})

        } catch (error) {
            
            return NextResponse.json({message : "Todes Not Find"})
        }
}