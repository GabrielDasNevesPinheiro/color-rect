import { IPlayer, Player } from "@/models/Player";
import connectDatabase from "@/util/dbConnect";
import nextAuth from "next-auth"
import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

const getDiscordCredentials = () => {
    try {
        const client_id = process.env.DISCORD_ID;
        const client_secret = process.env.DISCORD_SECRET;

        return { client_id, client_secret };

    } catch (e) {
        throw Error("Error on loading discord credentials");
    }
}

const handler = nextAuth({
    providers: [
        Discord({
            clientId: String(getDiscordCredentials().client_id),
            clientSecret: String(getDiscordCredentials().client_secret)
        }),
    ],
    pages: {
        signIn: "/signin"
    },

    callbacks: {
        async redirect({ }) {

            return "/";
        },
        async signIn({ user }) {
            await connectDatabase();

            let player = await Player.findOne({ email: user.email }) as IPlayer;

            if (!player) {
                player = await Player.create({ nickname: user.name, email: user.email, image: user.image, })
            }

            return true
        },
    }
})

export { handler as GET, handler as POST }