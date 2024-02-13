"use client";

import Button from "@/components/ui/Button";
import { ColorHeader } from "@/components/ui/ColorHeader";
import { Colorpad } from "@/components/ui/Colorpad";
import { ArrowDown, ArrowLeft, ArrowRight, TimerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Tutorial() {

    const router = useRouter();
    const menu = () => router.push("/");

    const [page, setPage] = useState(0);

    const [hints, setHints] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        setHints([
            <h1 className="md:text-4xl text-2xl" key={"presentation"}>Color Rect é um jogo de <strong className="text-green-500">resposta rápida</strong>.</h1>,

            <h1 className="md:text-4xl text-2xl" key={"game rule"}>Você deve clicar no botão com a <strong className="text-blue-400">cor</strong> que preenche o <strong className="text-blue-400">texto</strong>.</h1>,

            <div className="flex flex-col items-center space-y-4" key={"game tutorial"}>
                <h1 className="md:text-4xl text-xl">Caso você se depare com o texto</h1><ColorHeader color={"Laranja"} className="text-3xl md:text-7xl">Amarelo</ColorHeader>
                <span className="md:text-3xl text-xl">Você deve selecionar</span>

                <div className="flex flex-col items-center">
                    <ArrowDown className="animate-bounce" />
                    <div className="flex rounded-md overflow-hidden">
                        <Colorpad color={"Amarelo"} className="hidden md:block" />
                        <Colorpad color={"Laranja"} />
                        <Colorpad color={"Verde"} className="hidden md:block" />
                    </div>
                </div>
            </div>,

            <div className="flex flex-col md:space-y-4 space-y-2 text-center" key={"timer tutorial"}>
                <h1 className="md:text-4xl text-2xl">Fique de olho no <strong className="text-purple-500">cronômetro</strong>!</h1>
                <h2 className="md:text-4xl text-2xl">Se ele zerar você <strong className="text-red-500">perde</strong>,</h2>
                <h2 className="md:text-4xl text-2xl">Ele <strong className="text-green-500">reseta</strong> sempre que você acerta.</h2>
                <div className="flex items-center space-x-2 justify-center animate-pulse">
                    <TimerIcon className="text-purple-500 md:w-32 md:h-32 w-12 h-12" />
                    <p className="md:text-7xl text-3xl text-purple-500">{Math.abs(2.00).toFixed(1)}</p>
                </div>

            </div>,

            <div className="flex flex-coll" key={"gamemodes tutorial"}>
                <h1 className="md:text-4xl text-2xl">Existem <strong className="text-orange-500">dificuldades</strong>, elas modificam o <strong className="text-purple-500">cronômetro</strong> e a <strong className="text-yellow-500">pontuação</strong>.</h1>
            </div>,

            <div className="flex flex-col space-y-4" key={"ending"}>
                <h1 className="text-3xl">Você já está pronto(a)</h1>
                <Button size={"lg"} onClick={() => menu()}>Menu</Button>
            </div>
        ]);
    }, []);

    return (
        <div className="flex flex-col h-screen w-full items-center md:p-10 text-center md:text-start">
            <h1 className="text-3xl">{page + 1} / {hints.length}</h1>
            <div className="flex h-full w-full  justify-between items-center md:p-4">
                <ArrowLeft onClick={() => setPage(page < 1 ? 0 : page - 1)} className="hover:cursor-pointer min-h-12 min-w-12" />
                <div className="flex flex-col p-5 space-y-3 items-center">
                    {hints[page]}
                </div>
                <ArrowRight onClick={() => setPage(page >= hints.length - 1 ? page : page + 1)} className="hover:cursor-pointer min-h-12 min-w-12" />
            </div>
        </div>
    )
}