// app/routes/logout.tsx
import { json, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utils/session.server";

export let action = async ({ request }: { request: Request }) => {
  // Get the session from the request cookies
  let session = await getSession(request.headers.get('Cookie'));

  // Unset the user session data
  session.unset('user'); // Assuming 'user' is the key where user data is stored

  // Redirect to login page after clearing the session
  return redirect('/login', {
    headers: {
      'Set-Cookie': await commitSession(session), // Commit the session with no user data
    },
  });
};
