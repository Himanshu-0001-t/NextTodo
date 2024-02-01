import {NextRequest} from "next/server"
import jwt from "jsonwebtoken";

export async function getDataFromToken(request : NextRequest){

    try {
            const token : any= request.cookies.get("Token")?.value;
            const decotedToken : any = jwt.verify(token , "tokensecret")

            return decotedToken
        
    } catch (error) {
        console.log("ERROR IN GET TOKEN" , error)
        return "ERROR IN GET TOKEN"
    }
}