export async function fetchData<T>(url: string, options: any): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
