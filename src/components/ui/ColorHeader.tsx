import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, HTMLAttributes } from "react";

const colorheaderVariants = cva(
    'font-bold',
    {
        variants: {
            variant: {
                default: 'hover:cursor-pointer hover:bg-opacity-85',
                ghost: 'hover:cursor-default hover:bg-opacity-100'
            },
            size: {
                default: 'text-7xl',
                sm: 'text-4xl',
                lg: 'text-6xl'
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    },
)

export interface ColorpadProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof colorheaderVariants> {
    color: ColorVariant
}

const colors = {
    "Verde": "text-[#36B042]",
    "Azul": "text-[#2CABE1]",
    "Amarelo": "text-[#E0FB38]",
    "Roxo": "text-[#9F36B0]",
    "Vermelho": "text-[#C32B2B]",
    "Laranja": "text-[#FD5B00]"
}

export const ColorHeader: FC<ColorpadProps> = ({ className, color, children, variant, size, ...props }) => (
    <h1 className={cn(colorheaderVariants({ variant, size, className }), colors[color])} {...props}>
        {children}
    </h1>
)