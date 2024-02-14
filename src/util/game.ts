
interface Difficulty {
    name: string
    cooldown: number
    hitScore: number
    multiplier: number

}



export const GameRules: { [key in DiffKeys]: Difficulty } = {

    "easy": {
        name: "Dislexia",
        cooldown: 2.00,
        hitScore: 4,
        multiplier: 1.1,
    },

    "medium": {
        name: "Atento",
        cooldown: 1.20,
        hitScore: 12,
        multiplier: 1.3,
    },

    "hard": {
        name: "Máquina",
        cooldown: 0.80,
        hitScore: 22,
        multiplier: 1.5,
    }

}

export const colorNames: ColorVariant[] = ["Verde", "Azul", "Amarelo", "Roxo", "Vermelho", "Laranja"];

export const sortColor = () => {
    return Math.floor(Math.random() * (colorNames.length));
}

export const sortWord = (sortedWord: ColorVariant = "Amarelo") => {

    const filtered = colorNames.filter((word) => word !== sortedWord);
    const index = Math.floor(Math.random() * (filtered.length));
    return filtered[index];

};