import { IPlayer, Player } from "@/models/Player";
import connectDatabase from "@/util/dbConnect";
import { getServerSession } from "next-auth";


export interface RankingData { image: string, name: string, score: number }

export async function GET(req: Request, res: Response) {

    const session = await getServerSession();

    if (!session) return Response.json({ status: 405, message: "Not Allowed." });

    const parsePlayer = (player: IPlayer) => ({ image: player.image, name: player.nickname, score: player.score });
    try {

        await connectDatabase();

        let players = await Player.find() as IPlayer[];

        players = players.sort((a, b) => b.score - a.score)

        const response = players.slice(0, 10).map(parsePlayer);

        return Response.json({ status: 200, players: response });

    } catch (error) {
        return Response.json({ status: 500, message: "Error" });
    }
}