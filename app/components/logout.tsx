// app/components/Logout.tsx
import { Form } from "@remix-run/react";

export default function Logout() {
  return (
    <div className="flex justify-end p-4">
      <Form method="post" action="/logout">
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </Form>
    </div>
  );
}
