"use client";

import { UserData } from "@/app/api/player/route";
import { RankingData } from "@/app/api/ranking/route";
import Button from "@/components/ui/Button";
import { ArrowLeft, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Ranking() {

    const router = useRouter();
    const { data: session, status } = useSession();
    const [players, setPlayers] = useState<RankingData[]>([]);
    const [self, setSelf] = useState<UserData>();

    const menu = () => router.push("/");

    useEffect(() => {
        fetch("/api/ranking").then((res) => res.json().then((response: { status: number, players: RankingData[] }) => {
            setPlayers(response.players);
        }))

        fetch("/api/player").then((res) => res.json().then((response: { status: string, player: UserData }) => {
            setSelf(response.player);
        }))
    }, []);

    if (status === "loading") return <></>;


    return (
        <div className="flex flex-col h-screen w-full">
            <Button variant={"ghost"} size={"sm"} onClick={menu}><ArrowLeft /> Menu</Button>
            <div className="flex w-full h-full p-28">
                <div className="md:flex w-full h-full md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex flex-col rounded-md h-full md:w-1/4 min-w-80 bg-[#2B2B2B] overflow-hidden">
                        <div className="h-72 overflow-hidden">
                            <div className="absolute flex items-center p-2 bg-black/30 rounded-md">
                                <Trophy />
                                <span className="font-bold">{self?.position}°</span>
                            </div>
                            <Image src={session?.user?.image as string} alt={"Profile Photo"} width={50} height={50} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center items-center h-full">
                            <div className="p-4">
                                <h1 className="font-bold text-4xl">{self?.name}</h1>
                            </div>
                            <div className="p-4">
                                <h1 className="font-bold text-4xl">{self?.score} Pontos</h1>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md flex flex-col h-full md:w-3/4 bg-[#2B2B2B] overflow-hidden min-w-80">
                        <div className="flex items-center justify-center w-full h-14 bg-black/50">
                            <h1 className="text-3xl font-bold ">Melhores jogadores</h1>
                        </div>

                        <div className=" flex flex-col h-full w-full p-3 space-y-2">
                            {players.length > 0 ? players.map((player, i) => (
                                <div className="flex justify-between w-full h-10 bg-black/80 rounded-md pl-2 items-center">
                                    <div className="flex space-x-2 items-center">
                                        <span className="text-2xl font-bold">{i + 1}</span>
                                        <Image src={player.image as string} width={30} height={30} alt="Ranking Profile photo" className="rounded-full" />
                                        <span className="font-bold pl-4">{player.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 pr-2">
                                        <span className="font-bold">{player.score}</span>
                                    </div>
                                </div>
                            )) : <></>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}