import Todo from "@/model/todo.model";
import { connectDB } from "@/db/db";
import {NextRequest , NextResponse} from "next/server"

connectDB()

export async function POST(request  : NextRequest){

    try {
            const reqBody = await request.json()
            const {title , des , userId } = reqBody;

            const createdTodo = new Todo({
                title ,
                des,
                createdBy : userId
            })
            
            console.log(createdTodo)
            
              const SavedTodo =  await createdTodo.save();
              return NextResponse.json({message : "Todo Add successfully" , success : true , SavedTodo})

    } catch (error) {
        
        return NextResponse.json({message : "Todo not add"})
    }
}
