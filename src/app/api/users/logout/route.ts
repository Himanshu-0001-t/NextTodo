import {NextRequest , NextResponse} from "next/server";

export function GET(request : NextRequest){
         try {
                const response = NextResponse.json({
                    message : "Logout successfully",
                    success : true
                })
                response.cookies.set("Token" , "" , {
                    httpOnly : true , expires : new Date(0)
                })

                return response

        } catch (error) {
                 return NextResponse.json({message : "Logout Successfully"})
        }
}

