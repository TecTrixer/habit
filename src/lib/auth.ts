import PocketBase, { type AuthProviderInfo } from "pocketbase"

const pb = new PocketBase('http://127.0.0.1:8090');
const redirectUrl = 'http://localhost:5173/redirect';

// returns the authUrl which can be redirected to for OAuth2
export async function getAuthUrl(): Promise<string> {
  const provider = await getProvider();
  return provider.authUrl + redirectUrl
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
    // TODO: maybe add a real redirect here
    redirectUrl,
    {
      points: 0,
    }
  );
}

export function isLoggedIn() {
  return pb.authStore.isValid
}
