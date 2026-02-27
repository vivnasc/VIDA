import { createMiddleware } from "@vida/auth/middleware";

export default createMiddleware();

export const config = {
  matcher: [
    "/((?!login|_next/static|_next/image|favicon.ico|manifest.json|service-worker.js|icons).*)",
  ],
};
