import { Skin } from '@repo/shared-types';

interface SkinBoardProps {
    skin: Skin;
}

export default function SkinBoard({ skin }: SkinBoardProps) {
    return (
        <div className='grid grid-cols-9'>
            {Array.from({ length: 81 }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className='h-8 w-8'
                        style={{
                            background:
                                i % 2 === 0 ? skin.colors[0] : skin.colors[1],
                        }}
                    />
                );
            })}
        </div>
    );
}
