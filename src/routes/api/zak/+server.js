import { db } from '$lib/server/db';
import { zak } from '$lib/server/db/schema';

export async function GET() {
	const zaci = await db.select().from(zak);
	return new Response(JSON.stringify(zaci), { status: 200 });
}