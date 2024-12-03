import { db } from '$lib/server/db';
import { trida } from '$lib/server/db/schema';

export async function GET() {
	const tridy = await db.select().from(trida);
	return new Response(JSON.stringify(tridy), { status: 200 });
}