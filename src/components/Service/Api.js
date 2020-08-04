import Axios from "axios";

const API_KEY = "66f23c1b86846c1f0c0b18d0fb8daf16";
const STATIC_URL = "https://api.themoviedb.org/3/";

async function getMoviesData(requestUrl = null, searchQuery = null) {
  if (searchQuery !== null) {
    return await Axios.get(
      `${STATIC_URL}${requestUrl}?api_key=${API_KEY}&query=${searchQuery}&language=en-US&include_adult=false`
    ).then((response) => response.data.results);
  }
  if (requestUrl !== null) {
    return await Axios.get(
      `${STATIC_URL}movie/${requestUrl}?api_key=${API_KEY}`
    ).then((response) => response.data);
  }
  return await Axios.get(
    `${STATIC_URL}trending/all/day?api_key=${API_KEY}&language=en-US&include_adult=false`
  ).then((response) => response.data.results);
}

export default {
  getMoviesData,
};
