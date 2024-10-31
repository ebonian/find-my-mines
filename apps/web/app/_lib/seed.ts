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

    return {
        seed: fullSeed,
    };
};
