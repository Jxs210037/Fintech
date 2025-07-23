// lib/api.js
export const fetchBreakingNews = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=86f36900809b4d6cb68317eed0bca8bb'
  );
  const json = await response.json();
  return json.articles;
};

export const fetchRecommendedNews = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=86f36900809b4d6cb68317eed0bca8bb'
  );
  const json = await response.json();
  return json.articles;
};
