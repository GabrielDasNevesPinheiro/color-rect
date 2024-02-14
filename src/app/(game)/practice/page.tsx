"use client";

import Button from "@/components/ui/Button";
import { ColorHeader } from "@/components/ui/ColorHeader";
import { Colorpad } from "@/components/ui/Colorpad";
import { colorNames, sortColor, sortWord } from "@/util/game";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Practice() {
    const router = useRouter();

    const [word, setWord] = useState(sortWord());
    const [color, setColor] = useState(sortColor());

    const menu = () => router.push("/");

    const padClick = (colorName: ColorVariant) => {
        if (colorName === colorNames[color]) {
            setWord(sortWord());
            setColor(sortColor());
        }
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="flex w-full md:p-4 p-2">
                <Button variant={"ghost"} size={"sm"} onClick={menu}><ArrowLeft /> Menu</Button>
            </div>

            <div className="h-full w-full flex flex-col items-center p-2 md:p-4 md:space-y-10 space-y-4">
                <ColorHeader color={colorNames[color]}>{word}</ColorHeader>

                <div className="grid grid-rows-3 grid-cols-2 md:grid-cols-3 md:grid-rows-2 rounded-xl overflow-hidden">
                    {colorNames.map((colorName, i) => (
                        <Colorpad key={i} onClick={() => padClick(colorName)} color={colorName as ColorVariant} className="h-40 w-40 md:h-52 md:w-52" />
                    ))
                    }
                </div>

            </div>
        </div>
    )
}