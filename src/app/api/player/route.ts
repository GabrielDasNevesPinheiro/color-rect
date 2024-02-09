import { IPlayer, Player } from "@/models/Player";
import { getServerSession } from "next-auth";

export interface UserData {
    name: string
    score: number
    position: number
}

export async function GET(req: Request, res: Response) {
    const session = await getServerSession();

    if (!session) return Response.json({ status: 405, message: "Not Allowed." });

    try {

        const player = await Player.findOne({ email: session.user?.email }) as IPlayer;
        const ranking = (await Player.find() as IPlayer[]).map((player) => player.email);

        return Response.json({ status: 200, player: { name: player.nickname, score: player.score, position: ranking.indexOf(player.email) + 1 } });

    } catch (error) {
        return Response.json({ status: 500, message: "Error" });
    }
}