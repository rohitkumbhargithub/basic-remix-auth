// auth.server.ts
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { verifyUser } from './user.server';  // Your custom verification function

const authenticator = new Authenticator();

// Use the FormStrategy for username/password authentication
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    // Ensure email and password are present
    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Invalid form data");
    }

    // Use your verifyUser function to authenticate the user
    return await verifyUser(email, password);
  }),
  "user-pass"  // Register the strategy as 'user-pass'
);

export { authenticator };




