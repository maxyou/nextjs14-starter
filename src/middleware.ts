import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { JwtUser, UserDTO, UserAdd } from '@/app/dto/User';
import { joseVerify, getJoseJwtToken } from "./utilities/calc";
import { ROUTES } from '@/routes';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  console.log('ROUTES.user.edit:', ROUTES.user.edit)

    console.log('====middleware.ts, request.url:', request.url)
    // console.log('middleware.ts, request.nextUrl.pathname:', request.nextUrl.pathname)
    
    const { pathname } = request.nextUrl;
    if(!middlewareMatcher(pathname)) {
      console.log(`====middleware.ts:!middlewareMatcher(${pathname})`)
      return NextResponse.next();
    }

    // const { pathname } = request.nextUrl;
    // if(
    //   pathname === '/user/login' 
    //   || pathname === '/user/register'
    //   || pathname === '/user/logout'
    //   ) {
    //   return NextResponse.next({
    //     // request: {
    //     //   headers
    //     // }
    //   });
    // }

    const headers = new Headers(request.headers);
    // headers.set('middlewareSet', 'mydata');

    const cookies = headers.get('cookie')
    console.log('====middleware.ts, cookies:', cookies)

    const parsedCookies = cookie.parse(cookies || '');

    // Access the specific item you want
    const jwtToken = parsedCookies.jwt;
    console.log('====middleware.ts, jwtToken:', jwtToken)

    const secret = process.env.JWT_SECRET as string;
    console.log('====middleware.ts, secret:', secret)

    const decodedToken = await joseVerify(jwtToken, secret);
    console.log('====middleware.ts, decodedToken:', JSON.stringify(decodedToken))
    
    if(decodedToken.code !== 0) {     

      console.log('====middleware.ts, decodedToken.code !== 0, redirect to ROUTES.account.login')
      return NextResponse.redirect(new URL(ROUTES.account.login, request.url))
    }

    const jwtUser = decodedToken.jwtPayloadWithUser!.jwtUser;
    headers.set('middlewareSet', JSON.stringify(jwtUser));
    console.log('====middleware.ts, user:', jwtUser)

    const resp = NextResponse.next({
      request: {
        headers
      }
    });    

    //refresh jwt
    const refreshJwtToken = await getJoseJwtToken(jwtUser);

    resp.cookies.set('jwt', refreshJwtToken, {
      httpOnly: true,
      secure: true
    })

    return resp;
}


function middlewareMatcher(pathname: string) {
    // Return true if the middleware should be executed for the given URL

    console.log('middlewareMatcher, pathname:', pathname)

    switch (pathname) {
      case ROUTES.user.edit:
      // case ROUTES.account.register:
      // case ROUTES.account.login:
      // case ROUTES.api.userLogin:
      // case ROUTES.api.userRegister:
          return true;
      default:
          return false;
  }
}

//Does not support variables, only hard-coded paths
export const config = {
    matcher: [
      '/(.*)',
      // '/:path*',
      // '/about',
      // '/api/(.*)',     //ok
      // '/api/user/(.*)',
      // '/api/user',
      // '/pages/(.*)',
      // '/pages/user-edit',
      // ROUTES.user.edit,
      // `${ROUTES.user.edit}`,
    ],
}