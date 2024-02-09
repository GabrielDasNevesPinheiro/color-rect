import { IPlayer, Player } from "@/models/Player";
import connectDatabase from "@/util/dbConnect";
import { getServerSession } from "next-auth";

type GameData = {
    score: number
}


export async function POST(req: Request, res: Response) {

    const session = await getServerSession();


    if (!session) return Response.json({ status: 405, message: "Not Allowed." });

    try {

        await connectDatabase();

        const { score } = await req.json() as GameData;

        const player = await Player.findOne({ email: session.user?.email }) as IPlayer;

        player.score += score;

        await player.save();

        return Response.json({ status: 200, message: "Well Done" });

    } catch (error) {
        return Response.json({ status: 500, messag: "Error" });
    }




}