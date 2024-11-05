import { setupDB } from '../clients/db';
import SkinModel from '../shared/models/skin';

async function seed() {
    await setupDB();
    const skins = [
        {
            name: 'Default',
            colors: ['#191B27', '#0D1321'],
            price: 0,
        },
        {
            name: 'Magenta',
            colors: ['#34182A', '#25161F'],
            price: 10,
        },
    ];

    await SkinModel.deleteMany({});
    await SkinModel.insertMany(skins);
}

seed()
    .then(() => {
        console.log('Seeding complete');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error seeding database', err);
        process.exit(1);
    });
