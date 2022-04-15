export default function fetcher(url: string, data = undefined) {
  const { email, password } = data;
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      email,
      password
    },
  });
};