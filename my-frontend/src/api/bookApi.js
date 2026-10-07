const BASE_URL = "http://localhost:3000/api/books";

export async function getAllBooks() {
  const response = await fetch(BASE_URL);
  return await response.json();
}