import { json, redirect, type MetaFunction } from "@remix-run/node";
import Logout from "~/components/logout";

import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  if (!user) {
    return redirect("/login");
  }
  return json({});
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {/* Center Content */}
      <div className="text-2xl font-semibold text-gray-800">Home</div>

      {/* Logout Button */}
      <div className="absolute top-4 right-4 p-4">
        <Logout />
      </div>
    </div>
  );
}
