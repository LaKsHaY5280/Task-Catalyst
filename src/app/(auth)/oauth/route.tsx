import { loginwithGoogle } from "@/lib/actions/user";
import { NextResponse } from "next/server";

interface Request {
  nextUrl: URL;
}

export async function GET(request: Request): Promise<NextResponse> {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");


  if (!userId || !secret) {
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  await loginwithGoogle(userId, secret);

  return NextResponse.redirect(`${request.nextUrl.origin}/profile`);
}
