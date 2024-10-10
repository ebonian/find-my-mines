import * as React from 'react';
import { cn } from '../../../../_lib/utils';
import Image from 'next/image';

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    icon: string;
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, icon, ...props }, ref) => {
        const Comp = 'button';
        return (
            <Comp
                className={cn(
                    'rounded-full disabled:pointer-events-none disabled:opacity-50',
                    'bg-brown/10 border-2 border-transparent px-8 py-4',
                    'transition-all duration-300 hover:border-white/40',
                    className
                )}
                ref={ref}
                {...props}
            >
                <Image src={icon} width={24} height={24} alt='' />
            </Comp>
        );
    }
);
ButtonIcon.displayName = 'ButtonIcon';

export { ButtonIcon };
