import Image from 'next/image';
import React from 'react';

type ColorVariant =
    | 'white'
    | 'brown'
    | 'gray'
    | 'black'
    | 'cyan'
    | 'green'
    | 'orange'
    | 'purple'
    | 'red';
type SizeVariant = 'sm' | 'default' | 'lg';

interface CardCheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label: string;
    imageSrc?: string;
    color?: ColorVariant;
    size?: SizeVariant;
}

const CardCheckbox = React.forwardRef<HTMLInputElement, CardCheckboxProps>(
    (
        {
            className,
            color = 'white',
            size = 'default',
            label,
            imageSrc,
            ...props
        },
        ref
    ) => {
        const getSizeClasses = (size: SizeVariant): string => {
            const sizeMap: Record<SizeVariant, string> = {
                sm: 'w-24',
                default: 'w-36',
                lg: 'w-40',
            };
            return sizeMap[size];
        };

        const getColorClasses = (
            color: ColorVariant,
            isChecked: boolean
        ): string => {
            const colorMap: Record<
                ColorVariant,
                { border: string; text: string }
            > = {
                white: { border: 'border-white', text: 'text-gray' },
                brown: { border: 'border-brown', text: 'text-brown' },
                gray: { border: 'border-gray', text: 'text-gray' },
                black: { border: 'border-black', text: 'text-black' },
                cyan: { border: 'border-cyan', text: 'text-cyan' },
                green: { border: 'border-green', text: 'text-green' },
                orange: { border: 'border-orange', text: 'text-orange' },
                purple: { border: 'border-purple', text: 'text-purple' },
                red: { border: 'border-red', text: 'text-red' },
            };
            return isChecked
                ? `${colorMap[color].border} ${colorMap[color].text}`
                : 'border-white text-white';
        };

        return (
            <label
                className={`bg-brown/10 flex cursor-pointer flex-col items-center rounded-3xl border-2 p-4 transition-all duration-200 ease-in-out ${getSizeClasses(size)} ${getColorClasses(color, props.checked || false)} ${className} `}
            >
                <input
                    type='checkbox'
                    className='sr-only'
                    ref={ref}
                    {...props}
                />
                <div className='mb-2 aspect-square w-full'>
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt=''
                            width={100}
                            height={100}
                            className='h-full w-full rounded-2xl object-cover'
                        />
                    ) : (
                        <div className='h-full w-full rounded-2xl bg-white' />
                    )}
                </div>
                <p className='text-center'>{label}</p>
            </label>
        );
    }
);

CardCheckbox.displayName = 'CardCheckbox';

export { CardCheckbox };
