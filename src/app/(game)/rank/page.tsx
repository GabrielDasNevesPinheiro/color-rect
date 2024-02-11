"use client";

import { UserData } from "@/app/api/player/route";
import { getPlayer, getRanking } from "@/app/server/ranking";
import Button from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2Icon, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Ranking() {


    const router = useRouter();
    const { data: session, status } = useSession();
    const [self, setSelf] = useState<UserData>();

    const { data: ranking, isLoading } = useQuery({
        queryKey: ['ranking'],
        queryFn: async () => {
            const res = await getRanking();

            return res
        }
    });

    const { data: user, isLoading: isPlayerLoading } = useQuery({
        queryKey: ['player'],
        queryFn: async () => {
            const res = await getPlayer(session?.user?.email as string);

            return res.data;
        }
    })


    const menu = () => router.push("/");


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
                                <span className="font-bold">{user?.player?.position}°</span>
                            </div>
                            <Image src={session?.user?.image as string} alt={"Profile Photo"} width={50} height={50} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center items-center h-full">
                            {isPlayerLoading ?
                                <div><Loader2Icon className="animate-spin" /></div>
                                :
                                <></>}
                            <div className="p-4">
                                <h1 className="font-bold text-4xl">{user?.player?.name}</h1>
                            </div>
                            <div className="p-4">
                                <h1 className="font-bold text-4xl">{user?.player?.score + " Pontos"} </h1>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md flex flex-col h-full md:w-3/4 bg-[#2B2B2B] overflow-hidden min-w-80">
                        <div className="flex items-center justify-center w-full h-14 bg-black/50">
                            <h1 className="text-3xl font-bold ">Melhores jogadores</h1>
                        </div>

                        <div className=" flex flex-col h-full w-full p-3 space-y-2 items-center">
                            {isLoading ?
                                <div><Loader2Icon className="animate-spin" /></div>
                                :
                                <></>
                            }
                            {ranking?.data?.length as number > 0 ? ranking?.data?.map((player, i) => (
                                <div className="flex justify-between w-full h-10 bg-black/80 rounded-md pl-2 items-center" key={i}>
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