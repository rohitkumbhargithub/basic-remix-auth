// routes/register.tsx
import { json, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { registerUser } from "~/utils/user.server";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Register Page
        </h1>

        <Form method="post" className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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
              Register
            </button>
          </div>
        </Form>

        <div className="text-center text-gray-600">
          <p className="text-sm">Already have an account?</p>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    await registerUser(email, password); // Save user to DB
    return redirect("/login"); // Redirect to login page
  } catch (error) {
    return json({ error: "User already exists or something went wrong." });
  }
}
