import type { PageLoad } from './$types';
import { getAuthUrl, isLoggedIn } from "$lib/auth"

export const load = (async () => {
  return { authUrl: await getAuthUrl(), loggedIn: isLoggedIn() };
}) satisfies PageLoad;