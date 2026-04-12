import { auth } from "@/auth";

export default auth((req) => {
  // All routes are public
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
