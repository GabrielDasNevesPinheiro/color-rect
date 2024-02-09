"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { GameRules } from "@/util/game";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const { status } = useSession();
  const [diffselect, setDiffSelect] = useState(false);

  const router = useRouter();
  const play = (diff: "easy" | "medium" | "hard") => router.push(`/rect?mode=${diff}`);
  const rank = () => router.push("/rank");
  const login = () => router.push("/signin");

  const textColors = ["text-[#36B042]", "text-[#2CABE1]", "text-[#E0FB38]", "text-[#9F36B0]", "text-[#C32B2B]", "text-[#FD5B00]"];

  if (status === "loading") return <></>; // loading element
  if (status === "unauthenticated") login();

  return (
    <div className="h-screen w-full flex justify-center ">
      {diffselect ?
        <div className="flex flex-col space-y-4 absolute h-full w-full bg-black/90 items-center justify-center">
          <h1 className="text-4xl">Selecione uma dificuldade</h1>
          <div className="flex space-x-4">
            {Object.keys(GameRules).map((key) => (
              <Button onClick={() => play(key as DiffKeys)} key={key}>{GameRules[key as DiffKeys].name}</Button>
            ))
            }
          </div>
        </div>
        : <></>

      }
      <div className="w-96 h-full">
        <div className="flex flex-col w-full justify-center text-center pt-44">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-bold transition-transform">COLOR</h1>
            <h1 className="text-6xl font-bold">{
              "RECT".split("").map((char, i) => (
                <span key={char} className={cn(textColors[i])}>{char}</span>
              ))
            }</h1>
          </div>
          <div className="flex flex-col w-full gap-3 pr-12 pl-12 pt-10">
            <Button onClick={() => setDiffSelect(true)} size={"lg"}>Jogar</Button>
            <Button onClick={rank} size={"lg"}>Ranking</Button>
            <Link href={"/tutorial"} className="self-end text-white/50">como jogar?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
