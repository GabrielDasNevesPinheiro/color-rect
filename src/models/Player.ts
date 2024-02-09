import mongoose, { Document } from "mongoose";

interface IPlayer extends Document {
    nickname: string
    email: string
    image: string
    score: number
}

const playerSchema = new mongoose.Schema<IPlayer>({
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: false,
        default: 0
    },
}, {
    timestamps: true
});

const Player = mongoose.models.Player || mongoose.model<IPlayer>("Player", playerSchema);

export { Player, type IPlayer }