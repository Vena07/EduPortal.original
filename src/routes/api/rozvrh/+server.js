import { db } from '$lib/server/db';
import { rozvrh } from '$lib/server/db/schema';

export async function GET() {
	const rozvrhy = await db.select().from(rozvrh);
	return new Response(JSON.stringify(rozvrhy), { status: 200 });
}