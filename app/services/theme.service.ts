export async function getTheme() {
  const response = await fetch('http://localhost:3000/api/theme');
  if (!response.ok) throw new Error('Failed to fetch theme');
  return response.json();
}

export async function setTheme(theme: string) {
  const response = await fetch('http://localhost:3000/api/theme', {
    method: 'POST',
    body: JSON.stringify({
      theme,
    }),
  });
  if (!response.ok) throw new Error('Failed to set theme');
  return response.json();
}
