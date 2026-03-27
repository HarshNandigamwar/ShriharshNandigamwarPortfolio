import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {password} = await request.json();

    if (password === process.env.ADMIN_KEY) {
        return NextResponse.json({success: true}, {status: 200});
    }

    return NextResponse.json({success: false, message: "Unauthorized access denied."}, {status: 401});
}
