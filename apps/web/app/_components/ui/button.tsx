import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../_lib/utils';

const buttonVariants = cva(
    'font-bold inline-flex items-center justify-center whitespace-nowrap rounded-full disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'hover:opacity-90',
                outline: 'bg-transparent border-1 hover:opacity-80',
            },
            size: {
                default: 'h-10 px-20 py-2',
                sm: 'h-9 px-10',
                lg: 'h-12 px-16 text-lg',
                icon: 'h-10 w-10',
            },
            color: {
                white: {
                    default: 'bg-white text-gray',
                    outline: 'border-gray text-gray',
                },
                brown: {
                    default: 'bg-brown text-white',
                    outline: 'border-brown text-brown',
                },
                gray: {
                    default: 'bg-gray text-white',
                    outline: 'border-gray text-gray',
                },
                black: {
                    default: 'bg-black text-white',
                    outline: 'border-black text-black',
                },
                cyan: {
                    default: 'bg-cyan text-gray',
                    outline: 'border-cyan text-cyan',
                },
                green: {
                    default: 'bg-green text-gray',
                    outline: 'border-green text-green',
                },
                orange: {
                    default: 'bg-orange text-gray',
                    outline: 'border-orange text-orange',
                },
                purple: {
                    default: 'bg-purple text-gray',
                    outline: 'border-purple text-purple',
                },
                red: {
                    default: 'bg-red text-gray',
                    outline: 'border-red text-red',
                },
            },
        },
        compoundVariants: [
            {
                variant: 'default',
                color: 'white',
                class: 'bg-white text-gray',
            },
            {
                variant: 'outline',
                color: 'white',
                class: 'border-gray text-gray',
            },
            {
                variant: 'default',
                color: 'brown',
                class: 'bg-brown text-white',
            },
            {
                variant: 'outline',
                color: 'brown',
                class: 'border-brown text-brown',
            },
            {
                variant: 'default',
                color: 'gray',
                class: 'bg-gray text-white',
            },
            {
                variant: 'outline',
                color: 'gray',
                class: 'border-gray text-gray',
            },
            {
                variant: 'default',
                color: 'black',
                class: 'bg-black text-white',
            },
            {
                variant: 'outline',
                color: 'black',
                class: 'border-black text-black',
            },
            {
                variant: 'default',
                color: 'cyan',
                class: 'bg-cyan text-gray',
            },
            {
                variant: 'outline',
                color: 'cyan',
                class: 'border-cyan text-cyan',
            },
            {
                variant: 'default',
                color: 'green',
                class: 'bg-green text-gray',
            },
            {
                variant: 'outline',
                color: 'green',
                class: 'border-green text-green',
            },
            {
                variant: 'default',
                color: 'orange',
                class: 'bg-orange text-gray',
            },
            {
                variant: 'outline',
                color: 'orange',
                class: 'border-orange text-orange',
            },
            {
                variant: 'default',
                color: 'purple',
                class: 'bg-purple text-gray',
            },
            {
                variant: 'outline',
                color: 'purple',
                class: 'border-purple text-purple',
            },
            {
                variant: 'default',
                color: 'red',
                class: 'bg-red text-gray',
            },
            {
                variant: 'outline',
                color: 'red',
                class: 'border-red text-red',
            },
        ],
        defaultVariants: {
            variant: 'default',
            size: 'default',
            color: 'white',
        },
    }
);

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, color, ...props }, ref) => {
        const Comp = 'button';
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, color, className })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
