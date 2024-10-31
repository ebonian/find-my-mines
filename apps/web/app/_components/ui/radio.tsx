import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../_lib/utils';

const radioVariants = cva(
    'inline-flex items-center justify-center rounded-full cursor-pointer',
    {
        variants: {
            size: {
                default: 'h-5 w-5',
                sm: 'h-4 w-4',
                lg: 'h-6 w-6',
            },
            color: {
                white: 'border-2 border-white',
                brown: 'border-2 border-brown',
                gray: 'border-2 border-gray',
                black: 'border-2 border-black',
                cyan: 'border-2 border-cyan',
                green: 'border-2 border-green',
                orange: 'border-2 border-orange',
                purple: 'border-2 border-purple',
                red: 'border-2 border-red',
            },
        },
        defaultVariants: {
            size: 'default',
            color: 'white',
        },
    }
);

export interface RadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'>,
        VariantProps<typeof radioVariants> {
    label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({ className, size = 'default', color, label, ...props }, ref) => {
        return (
            <label className='inline-flex cursor-pointer items-center'>
                <div
                    className={cn(
                        radioVariants({ size, className, color }),
                        props.checked
                            ? `transition-all border-${color}`
                            : 'border-white'
                    )}
                >
                    <input
                        type='radio'
                        className='sr-only'
                        ref={ref}
                        {...props}
                    />
                    <div
                        className={`${size == 'lg' ? 'h-4 w-4' : size == 'sm' ? 'h-2 w-2' : 'h-3 w-3'} rounded-full transition-all ${props.checked ? `bg-${color}` : 'bg-transparent'}`}
                    />
                </div>
                {label && <span className='ml-2'>{label}</span>}
            </label>
        );
    }
);

Radio.displayName = 'Radio';

export { Radio, radioVariants };
