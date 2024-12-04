// api/data.ts
import { db } from '$lib/server/db';
import { absence, rozvrh, trida, zak } from '$lib/server/db/schema';

export async function GET({ url }) {
    const table = url.searchParams.get('table');  // Parametr 'table' v URL
    let data;

    try {
        switch (table) {
            case 'absence':
                data = await db.select().from(absence);
                break;
            case 'rozvrh':
                data = await db.select().from(rozvrh);
                break;
            case 'trida':
                data = await db.select().from(trida);
                break;
            case 'zak':
                data = await db.select().from(zak);
                break;
            default:
                return new Response(JSON.stringify({ error: 'Invalid table name' }), { status: 400 });
        }

        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
}
