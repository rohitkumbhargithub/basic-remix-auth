// login.tsx
import { authenticator } from '~/utils/auth.server'; 
import { json, redirect } from '@remix-run/node';
import { getSession, commitSession } from '~/utils/session.server';
import { Form, Link } from '@remix-run/react';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800">Login Page</h1>
      
      <Form method="post" className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Username"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </Form>

      <div className="text-center text-gray-600">
        <p className="text-sm">Don't have an account?</p>
        <Link to="/register" className="text-blue-500 hover:text-blue-700 text-sm font-semibold">
          Register
        </Link>
      </div>
    </div>
  </div>
  );
}

export async function action({ request }: { request: Request }) {
  try {
    // Authenticate the user using the 'user-pass' strategy
    const user = await authenticator.authenticate('user-pass', request); // Pass the request directly

    if (!user) {
      return json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Create session and redirect after successful login
    const session = await getSession(request.headers.get('Cookie'));
    session.set('user', user);

    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.error("Login failed:", error); // Debugging
    return json({ error: 'Authentication failed' }, { status: 400 });
  }
}
