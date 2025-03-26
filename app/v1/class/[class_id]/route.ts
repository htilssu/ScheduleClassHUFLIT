import {NextRequest} from "next/server";
import {notFound} from "next/navigation";

export async function GET(req: NextRequest) {


    return notFound();
}