import { NextResponse } from 'next/server';

const ALLOWED_HOSTS = new Set([
  'drive.google.com',
  'lh3.googleusercontent.com',
  'postimg.cc',
  'i.postimg.cc',
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const u = searchParams.get('u');
  if (!u) return NextResponse.json({ error: 'missing param' }, { status: 400 });

  let url: string;
  try {
    url = Buffer.from(u, 'base64').toString('utf8');
  } catch (err) {
    return NextResponse.json({ error: 'invalid param' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (err) {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: 'host not allowed' }, { status: 403 });
  }

  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const body = res.body;
    return new NextResponse(body, {
      status: res.status,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=3600',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 502 });
  }
}
