const WP_URL = process.env.WP_URL!;
const WP_USER = process.env.WP_USER!;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD!;

const authHeader =
  "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

export async function wpFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${WP_URL}/wp-json/wp/v2${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
      ...options.headers,
    },
  });
}

export async function findProjectByToken(token: string) {
  const res = await wpFetch(`/projekte?token=${encodeURIComponent(token)}`);
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.length > 0 ? posts[0] : null;
}

export function generateToken(): string {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let token = "";
  for (let i = 0; i < 12; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
