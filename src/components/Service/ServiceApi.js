const API_KEY = '41431482-f58044795534ed1451dcf24b8';
const BASE_URL = 'https://pixabay.com/api/';
export default async function FetchApi(nameSearch, page) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${nameSearch}&page=${page}&per_page=12`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
} 
