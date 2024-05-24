import { clerkMiddleware, createRouteMatcher } from "../node_modules/@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Protected routes
const isProtectedRoute = createRouteMatcher([/about\/.*/])


export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect()
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}