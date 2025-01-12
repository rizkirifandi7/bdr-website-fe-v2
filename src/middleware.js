import { NextResponse } from "next/server";

export function middleware(request) {
	const token = request.cookies.get("auth_session");
	const { pathname } = request.nextUrl;

	if (
		!token &&
		(pathname.startsWith("/dashboard-order") ||
			pathname.startsWith("/dashboard-home") ||
			pathname.startsWith("/dashboard-superadmin"))
	) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard-order/:path*",
		"/dashboard-home/:path*",
		"/dashboard-superadmin/:path*",
	],
};
