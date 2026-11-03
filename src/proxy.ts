import { NextResponse } from 'next/server'
import { NextRequest  } from 'next/server'
import { auth } from './app/lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))


  const session = await auth.api.getSession({
    headers: await headers()
  })
 const user = session?.user
    if(!user){
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/add-book', '/my-books', '/my-borrows'],
}