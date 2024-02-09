"use client";

import Button from "@/components/ui/Button";
import { ColorHeader } from "@/components/ui/ColorHeader";
import { Colorpad } from "@/components/ui/Colorpad";
import { GameRules, colorNames } from "@/util/game";
import { ArrowLeft, TimerIcon, TrophyIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Play() {

    const { data: session, status } = useSession();


    const router = useRouter();
    const searchParams = useSearchParams();

    const menu = () => router.push("/");
    const play = () => location.reload();
    const rank = () => router.push("/rank");


    const [initialCooldown, setInitialCooldown] = useState(3);
    const [diff] = useState(searchParams.get("mode") as DiffKeys ?? "easy");
    const [timer, setTimer] = useState(GameRules[diff].cooldown);
    const [lost, setLost] = useState(false);
    const [sortedColor, setSortedColor] = useState(0);
    const [started, setStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [sequence, setSequence] = useState(0);
    const [sortedWord, setSortedWord] = useState("");
    const [total, setTotal] = useState(0);


    const sortColor = () => {
        return Math.floor(Math.random() * (colorNames.length - 1));
    }

    const sortWord = () => {

        const filtered = colorNames.filter((word) => word !== sortedWord);
        const index = Math.floor(Math.random() * (filtered.length - 1));
        return filtered[index];

    };

    const gameOver = async () => {
        setLost(true);
        await fetch("/api/gameover", {
            method: "POST",
            body: JSON.stringify({ score: total })
        });
    }

    // the initial timer hook && cooldown timer
    useEffect(() => {

        setTotal(Math.floor((score + (sequence * 0.1)) * GameRules[diff].multiplier));

        const timeout = setTimeout(() => {
            if (initialCooldown > 0)
                setInitialCooldown(initialCooldown - 1);
        }, 1000);


        if (initialCooldown == 0) {

            if (!started) {
                setSortedColor(sortColor());
                setSortedWord(sortWord());
                setStarted(true);
            }

            if (!lost) {

                const timerTimeout = setTimeout(() => {
                    if (timer > 0.00)
                        setTimer(timer - 0.01);
                }, 10);

                if (timer < 0.01) gameOver();

                return () => {
                    clearTimeout(timeout);
                    clearTimeout(timerTimeout);
                };

            }

        }

        return () => clearTimeout(timeout);

    }, [initialCooldown, timer]);


    // color pad click event
    const padClick = async (color: string) => {

        if (colorNames[colorNames.indexOf(color as ColorVariant)] === colorNames[sortedColor]) {
            setTimer(GameRules[diff].cooldown); // clock timer set when hit
            setSortedColor(sortColor());
            setSortedWord(sortWord());
            setScore(score + GameRules[diff].hitScore);
            setSequence(sequence + 1); // counts the hits
        } else {
            gameOver();

        }
    }


    if (status === "loading") return <></>; // put loading element
    if (status === "unauthenticated") menu();


    return (
        <div className="w-full h-screen">
            {/** Initial timer */}
            {initialCooldown > 0 ?
                <div className="absolute w-full h-screen bg-black/60 flex items-center justify-center text-9xl">
                    <span>{initialCooldown}</span>
                </div> :
                <></>
            }
            {/** Displays on lose game */}
            {lost ?
                <div className="absolute max-h-96 m-auto left-0 right-0 top-0 bottom-0 flex justify-center">
                    <div className="flex h-80 w-96 bg-black/90 rounded-md p-4 flex-col gap-y-5 shadow-lg">
                        <h1 className="text-4xl text-center">Game over</h1>
                        <div className="self-center flex flex-col">
                            <span>Pontos: {score}</span>
                            <span>Acertos: {sequence}</span>
                            <span>Ganhos totais: {total}</span>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Button onClick={menu}>Menu</Button>
                            <Button onClick={play}>Jogar novamente</Button>
                            <Button onClick={rank}>Rank</Button>
                        </div>
                    </div>
                </div>
                : <></>
            }
            <div className="flex flex-col w-full h-full items-center">
                <div className="flex justify-between w-full p-4">

                    {/* Button to back to <menu type="toolbar"></menu> */}
                    <Button variant={"ghost"} size={"sm"} onClick={menu}><ArrowLeft /> Menu</Button>

                    {/** Color to Click component */}
                    <ColorHeader color={colorNames[sortedColor] as ColorVariant}>{
                        started ? sortedWord : "Iniciando..."
                    }</ColorHeader>

                    {/* Score component */}
                    <div className="flex flex-col">
                        <div className="flex space-x-2 font-bold items-center">
                            <TrophyIcon size={30} />
                            <p className="text-xl">{score}</p>
                        </div>
                        <h3 className="text-xl">{session?.user?.name}</h3>
                    </div>
                </div>

                {/* Generic Color Pad */}
                <div className="flex w-full justify-center pt-16">
                    <div className="grid grid-rows-3 grid-cols-2 md:grid-cols-3 md:grid-rows-2 rounded-xl overflow-hidden">
                        {!lost ?
                            colorNames.map((colorName, i) => (
                                <Colorpad key={i} onClick={() => padClick(colorName)} color={colorName as ColorVariant} />
                            )) :
                            colorNames.map((colorName, i) => (
                                <Colorpad key={i} color={colorName as ColorVariant} variant={"ghost"} />
                            ))
                        }
                    </div>
                </div>

                {/* Timer Component */}
                <div className="flex w-full items-center justify-center">
                    <div className="flex items-center space-x-2 pt-8">
                        <TimerIcon size={90} />
                        <p className="text-7xl">{Math.abs(timer).toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}