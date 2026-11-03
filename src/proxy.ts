import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request: NextRequest) {
  // Get Better Auth session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If user is not logged in
  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);

    // Remember the requested page
    loginUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
  ],
};