import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, HTMLAttributes } from "react";

const colorpadVariants = cva(
    'transition-colors',
    {
        variants: {
            variant: {
                default: 'hover:cursor-pointer hover:bg-opacity-85',
                ghost: 'hover:cursor-default hover:bg-opacity-100'
            },
            size: {
                default: 'h-52 w-52',
                sm: 'h-32 w-32',
                lg: 'h-72 w-72'
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    },
)



export interface ColorpadProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof colorpadVariants> {
    color: ColorVariant
}

const colors = {
    "Verde": "bg-[#36B042]",
    "Azul": "bg-[#2CABE1]",
    "Amarelo": "bg-[#E0FB38]",
    "Roxo": "bg-[#9F36B0]",
    "Vermelho": "bg-[#C32B2B]",
    "Laranja": "bg-[#FD5B00]"
}

export const Colorpad: FC<ColorpadProps> = ({ className, color, variant, size, ...props }) => (
    <div className={cn(colorpadVariants({ variant, size, className }), colors[color])} {...props}>
    </div>
)