import { db } from '$lib/server/db';
import { absence } from '$lib/server/db/schema';

export async function GET() {
	const absencx = await db.select().from(absence);
	return new Response(JSON.stringify(absencx), { status: 200 });
}