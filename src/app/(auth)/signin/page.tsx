"use client";

import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";

export default function SignIn() {

    return (
        <div className="flex h-screen w-full">
            <div className="m-auto p-4 bg-slate-800 rounded-lg flex flex-col gap-y-5">
                <h1 className="text-4xl">Entre em sua conta</h1>
                <Button onClick={() => signIn("discord")}>Discord</Button>
            </div>
        </div>
    )
}