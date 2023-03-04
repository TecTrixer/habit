import PocketBase, { type AuthProviderInfo } from "pocketbase";

import { PUBLIC_POCKETBASE_URL, PUBLIC_REDIRECT_URL } from '$env/static/public';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

// returns the authUrl which can be redirected to for OAuth2
export async function getAuthUrl(): Promise<string> {
  const provider = await getProvider();
  return provider.authUrl + PUBLIC_REDIRECT_URL
}

export async function getProvider(): Promise<AuthProviderInfo> {
  const authMethods = await pb.collection('users').listAuthMethods();
  const provider = authMethods.authProviders.find(value => value.name === 'github');
  if (!provider) {
    throw 'could not find github auth provider'
  }

  return provider
}

// authenticate after getting the code from the OAuth2 redirect
export async function authenticate(provider: AuthProviderInfo, code: string) {
  return pb.collection('users').authWithOAuth2(
    provider.name,
    code,
    provider.codeVerifier,
    PUBLIC_REDIRECT_URL,
    {
      points: 0,
    }
  );
}

export function isLoggedIn() {
  return pb.authStore.isValid
}
