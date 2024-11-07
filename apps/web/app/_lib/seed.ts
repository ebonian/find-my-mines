// Seed hashing
export async function seedHash(seed: string, length: number) {
    const encoder = new TextEncoder();
    const data = encoder.encode(seed);

    // Hash the data using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => ('00' + b.toString(16)).slice(-2))
        .join('');

    // Return the first [length] characters of the hash
    return hashHex.slice(0, length);
}

// Seed Generation
export const seedGen = async ({
    seed = '',
    type,
}: {
    seed?: string;
    type: 'normal' | 'extreme';
}) => {
    const seedLength = type === 'normal' ? 11 : 35;

    // original seed
    if (seed.length >= seedLength) {
        seed = seed.substring(0, seedLength);
    } else if (seed.length == 0) {
        while (seed.length < seedLength) {
            var dec = Math.floor(Math.random() * (126 - 33) + 33);
            seed = seed.concat(String.fromCharCode(dec));
        }
    } else {
        seed = await seedHash(seed, seedLength);
    }

    // btoa seed at each position and get index 0 -> hash
    const positionCode: string[] = [];
    for (let i = 0; i < seed.length; i++) {
        positionCode.push(btoa(seed[i] as string).substring(0, 1));
    }
    const positionSeedHashed = await seedHash(
        positionCode.join(''),
        seedLength
    );

    // btoa the whole seed and reverse -> hash
    var btoaSeedHashed = await seedHash(
        btoa(seed).substring(0, seedLength).split('').reverse().join(''),
        seedLength
    );

    // combine each position of btoaSeed and original seed -> hash
    var combinationSeed = '';
    for (let i = 0; i < seed.length; i++) {
        const btoaSeedDec = btoaSeedHashed.charCodeAt(i);
        const seedDec = seed.charCodeAt(i);
        var posDec = btoaSeedDec + seedDec + i;
        while (posDec < 33) {
            posDec += 94;
        }
        while (posDec > 126) {
            posDec -= 94;
        }

        combinationSeed = combinationSeed.concat(String.fromCharCode(posDec));
    }
    const combinationSeedHashed = await seedHash(combinationSeed, seedLength);

    // generate full seed
    var fullSeed = '';
    for (let i = 0; i < seedLength; i++) {
        fullSeed = fullSeed
            .concat(seed[i] as string)
            .concat(positionSeedHashed[i] as string)
            .concat(btoaSeedHashed[i] as string)
            .concat(combinationSeedHashed[i] as string);
    }

    return fullSeed;
};

export const coordinatesGen = ({
    seed,
    type,
}: {
    seed: string;
    type: 'normal' | 'extreme';
}): { x: number; y: number }[] => {
    const coordAmount = type === 'normal' ? 11 : 35;
    const coordMax = type === 'normal' ? 6 : 9;
    const coordinates = new Set<string>();
    let jumper = 0;
    let runner = 0;

    while (coordinates.size < coordAmount) {
        const segmentX = seed.substring(
            runner * 4,
            (runner * 4 + 1 + jumper) % coordAmount
        );
        const segmentY = seed.substring(
            runner * 4 + 2,
            (runner * 4 + 3 + jumper) % coordAmount
        );
        const numCodeX = Array.from(segmentX).reduce(
            (acc, char) => acc + char.charCodeAt(0),
            0
        );
        const numCodeY = Array.from(segmentY).reduce(
            (acc, char) => acc + char.charCodeAt(0),
            0
        );
        const coorX = Math.floor(numCodeX) % coordMax;
        const coorY = Math.floor(numCodeY) % coordMax;
        const coordKey = `${coorX},${coorY}`;

        coordinates.add(coordKey);
        runner += 1;
        if (runner === coordAmount) {
            runner = 0;
            jumper += 1;
        }
    }

    const coordinatesArray = Array.from(coordinates).map((coord: string) => {
        const [x, y] = coord.split(',').map(Number);
        if (x !== undefined && y !== undefined) {
            return { x, y };
        } else {
            throw new Error(`Invalid coordinate generated: ${coord}`);
        }
    });

    return coordinatesArray;
};
