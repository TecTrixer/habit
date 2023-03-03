import type { PageLoad } from './$types';
import { getAuthUrl } from "$lib/auth"

export const load = (async () => {
  return { authUrl: await getAuthUrl() };
}) satisfies PageLoad;