import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { absence } from '$lib/server/db/schema.js';

export async function POST({ request }) {
	try {
		const { datum, duvod, id_zaka } = await request.json();

		if (!datum || !duvod) {
			return json({ error: 'Jméno a věk jsou povinné.' }, { status: 400 });
		}

		await db.insert(absence).values({ datum, duvod, id_zaka });
		return json({ messduvod: 'Uživatel přidán.' }, { status: 200 });
		
	} catch (error) {
		console.error('Chyba při přidávání uživatele:', error);
		return json({ error: 'Interní chyba serveru.' }, { status: 500 });
	}
}