import { OktaAuthOptions, OAuthResponseType } from '@okta/okta-auth-js';

export const oktaConfig = {
  clientId: 'UWIxB6ns6FtTg0eb9EnM0qGyJSalKPv8',
  issuer: 'https://dev-77kh7zll8736vhjz.us.auth0.com/oauth2/default',
  redirectUri: 'http://localhost:3000/callback',
  scopes: ['openid', 'profile', 'email'],
  responseType: ['token', 'id_token'] as OAuthResponseType[],
};