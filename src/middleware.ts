import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
interface CustomJwtPayload extends JwtPayload {
  role: string;
}

export function middleware(request: NextRequest) {
  console.log("Requested URL:", request.nextUrl.pathname);

  // Check Cookie
  const refreshTokenCookies = request.cookies.get("refreshToken");
  console.log(refreshTokenCookies);
  if (!refreshTokenCookies?.value) {
    console.log("No refresh token found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decodedRefreshToken = jwtDecode(refreshTokenCookies?.value as string);
  if (decodedRefreshToken.exp! * 1000 < Date.now()) {
    console.log("Refresh token expired");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { role } = decodedRefreshToken as CustomJwtPayload;
  console.log("User role:", role);

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  if (isUser) {
    const userAllowedPaths = ["/profile", "/content"];
    const requestedPath = request.nextUrl.pathname;

    const isAllowedPath = userAllowedPaths.some((path) =>
      requestedPath.startsWith(path)
    );
    if (isAllowedPath) {
      return NextResponse.next();
    }
  }

  if (isAdmin) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/profile/:path*", "/content/:path*"],
};
