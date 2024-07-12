import { useState, useEffect } from "react";
import { createApi } from "unsplash-js";

const useUnsplashImage = (query) => {
  const [imageUrl, setImageUrl] = useState(null);
  const unsplashApiKey = import.meta.env.REACT_APP_UNSPLASH_API_KEY;

  const api = createApi({
    accessKey: unsplashApiKey,
  });

  useEffect(() => {
    if (query) {
      api.search
        .getPhotos({ query, perPage: 1 })
        .then((result) => {
          if (result.response && result.response.results.length > 0) {
            setImageUrl(result.response.results[0].urls.small);
          } else {
            setImageUrl(null);
          }
        })
        .catch(() => {
          setImageUrl(null);
        });
    }
  }, [query]);

  return imageUrl;
};

export default useUnsplashImage;
