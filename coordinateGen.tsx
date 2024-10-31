const coordinatesGen = ({
    seed = '',
    type,
}: {
    seed?: string;
    type: 'normal' | 'extreme';
}): { x: number; y: number }[] => {
    const bombSeedLength = type === 'normal' ? 11 : 35;
    const gridMax = type === 'normal' ? 6 : 9;
    const coordinates = new Set<string>();
    let jumper = 0;
    let runner = 0;

    while (coordinates.size < bombSeedLength) {
        const segmentX = seed.substring(
            runner * 4,
            (runner * 4 + 1 + jumper) % bombSeedLength
        );
        const segmentY = seed.substring(
            runner * 4 + 2,
            (runner * 4 + 3 + jumper) % bombSeedLength
        );
        const numCodeX = Array.from(segmentX).reduce(
            (acc, char) => acc + char.charCodeAt(0),
            0
        );
        const numCodeY = Array.from(segmentY).reduce(
            (acc, char) => acc + char.charCodeAt(0),
            0
        );
        const coorX = Math.floor(numCodeX) % gridMax;
        const coorY = Math.floor(numCodeY) % gridMax;
        const coordKey = `${coorX},${coorY}`;

        coordinates.add(coordKey);
        runner += 1;
        if (runner === bombSeedLength) {
            runner = 0;
            jumper += 1;
        }
    }

    const coordinatesArray = Array.from(coordinates).map((coord: string) => {
        const [x, y] = coord.split(',').map(Number);
        return { x, y };
    });

    return coordinatesArray;
};
