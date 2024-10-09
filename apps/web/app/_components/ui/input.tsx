import * as React from 'react';
import { cn } from '../../_lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
    'text-gray flex w-full rounded-full bg-white px-4 py-2 font-medium outline-none placeholder:font-light placeholder:italic placeholder:text-opacity-50 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            size: {
                default: 'h-10',
                lg: 'h-12',
            },
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, size, type, ...props }, ref) => {
        return (
            <input
                className={cn(inputVariants({ size }), className)}
                ref={ref}
                type={type}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
