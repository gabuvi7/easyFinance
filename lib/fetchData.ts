export async function fetchData(url: string, options: any): Promise<any> {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
