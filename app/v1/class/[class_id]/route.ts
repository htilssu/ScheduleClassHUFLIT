import {NextRequest, NextResponse} from "next/server";
import {notFound} from "next/navigation";

export async function GET(
    req: NextRequest,
    {params}: { params: Promise<{ class_id: string }> }
) {
    try {
        return notFound();
    } catch (error) {
        console.error("Error fetching class:", error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}
