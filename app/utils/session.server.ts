import { createCookieSessionStorage } from '@remix-run/node';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',  // Session cookie name
    httpOnly: true,
    maxAge: 60 * 60 * 24,  // Cookie expiration time
    secure: process.env.NODE_ENV === 'production',  // Ensure it's secure in production
    secrets: ['your-secret-key'],  // Use a strong secret key
    sameSite: 'lax',  // or 'strict'
  },
});

export const { getSession, commitSession } = sessionStorage;
