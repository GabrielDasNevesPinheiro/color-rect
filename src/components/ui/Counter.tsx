import { motion, useAnimate } from 'framer-motion';
import { useEffect } from 'react';


export default function Counter({ children }: { children: React.ReactNode }) {
    const [scope, animate] = useAnimate();

    const doAnimation = async () => {

        await animate(scope.current, { scale: 0.8 }, { duration: 0.0 });
        await animate(scope.current, { scale: 1.0 }, { duration: 0.5, ease: "anticipate" });
    }

    useEffect(() => {
        doAnimation();
    }, [children]);

    return (
        <div className='absolute w-full h-screen bg-black/60 flex items-center justify-center text-9xl'>
            <motion.div ref={scope}>
                <span>{children}</span>
            </motion.div>
        </div>
    )
}