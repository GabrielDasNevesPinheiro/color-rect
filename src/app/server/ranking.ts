"use server";

import { IPlayer, Player } from "@/models/Player";
import connectDatabase from "@/util/dbConnect";

export async function getRanking() {
    try {
        await connectDatabase();

        const parsePlayer = (player: IPlayer) => ({ image: player.image, name: player.nickname, score: player.score });

        let players = await Player.find() as IPlayer[];

        players = players.sort((a, b) => b.score - a.score)

        const response = players.slice(0, 10).map(parsePlayer);

        return { data: response };
    } catch (error) {
        return { error: error }
    }

}

export async function getPlayer(email: string) {
    try {

        const player = await Player.findOne({ email }) as IPlayer;
        const ranking = (await Player.find() as IPlayer[]).map((player) => player.email);

        return { data: { player: { name: player.nickname, score: player.score, position: ranking.indexOf(player.email) + 1 } } }

    } catch (error) {
        return { error: error }
    }
}