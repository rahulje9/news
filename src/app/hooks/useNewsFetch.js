import { useEffect, useState } from "react";
import axios from "axios";
import { NEWS_API_BASE_URL } from "../constants/urls";
import { NEWS_KEY } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../ducks/news";

export default function useNewsFetch(country, pageNumber) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // useEffect(() => {
  //   setData([]);
  // }, [query]);

  useEffect(() => {
    setError(false);
    fetchNews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, country]);

  const fetchNews = () => {
    if (country && pageNumber) {
      setLoading(true);

      dispatch(getNews(country, pageNumber)).then((res) => {
        console.log({ res });
        setLoading(false);

        setData((prevData) => {
          return [...new Set([...prevData, ...res?.articles])];
        });
        setHasMore(res?.articles?.length > 0);
        setLoading(false);
      });
    }
  };

  return { loading, error, data, hasMore };
}
