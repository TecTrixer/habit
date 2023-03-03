import type { PageLoad } from './$types';
import { getProvider } from '$lib/auth'
 
export const load = (async ({ url }) => {
  return {
    code: url.searchParams.get('code'),
    provider: await getProvider(),
  };
}) satisfies PageLoad;