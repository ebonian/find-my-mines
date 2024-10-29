const coordinatesGen = (seed: string): { x: number; y: number }[] => {
    const coordinates = new Set<string>();
    let jumper = 0;
    let runner = 0

    while (coordinates.size < 35) {
        const segmentX = seed.substring(runner * 4, ((runner * 4) + 1 + jumper) % 35);
        const segmentY = seed.substring((runner * 4) + 2, ((runner * 4) + 3 + jumper) % 35);
        const numCodeX = Array.from(segmentX).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const numCodeY = Array.from(segmentY).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const coorX = Math.floor(numCodeX) % 9;
        const coorY = Math.floor(numCodeY) % 9;
        const coordKey = `${coorX},${coorY}`;
        
        coordinates.add(coordKey);
        runner += 1;
        if (runner === 35) {
            runner = 0;
            jumper += 1;
        }
    }

    const coordinatesArray = Array.from(coordinates).map((coord: string) => {
        const [x, y] = coord.split(',').map(Number);
        return { x, y };
    });

    return coordinatesArray;
}