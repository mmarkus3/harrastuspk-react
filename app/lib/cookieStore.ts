import { cookies } from 'next/headers';

export async function getAthleteFromCookie() {
  const cookieValue = (await cookies()).get('__athlete')?.value;

  return cookieValue || null;
}