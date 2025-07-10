// src/authService.ts
import { OktaAuth } from '@okta/okta-auth-js';
import { oktaConfig } from './oktaConfig'
import { AccessToken } from '@okta/okta-auth-js';

const authClient = new OktaAuth(oktaConfig);

export const login = async () => {
  await authClient.token.getWithRedirect({
    responseType: oktaConfig.responseType,
    scopes: oktaConfig.scopes,
  });
};

export const handleCallback = async () => {
  const tokens = await authClient.token.parseFromUrl();
  authClient.tokenManager.setTokens(tokens.tokens);
};

export const getAccessToken = async () => {
  const token = await authClient.tokenManager.get('accessToken');

  // Check if it's an AccessToken
  if (token && 'accessToken' in token) {
    return (token as AccessToken).accessToken;
  }

  return null;
};
