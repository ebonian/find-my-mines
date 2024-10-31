import { cn } from '../../_lib/utils';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
}

export default function Layout({
    children,
    className,
    leftButton,
    rightButton,
}: LayoutProps) {
    return (
        <div className='flex justify-center px-10'>
            <div className={cn('relative w-full max-w-screen-xl', className)}>
                <div className='absolute left-0 top-10'>{leftButton}</div>
                <div className='absolute right-0 top-10'>{rightButton}</div>
                {children}
            </div>
        </div>
    );
}
