import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../ducks/news";

export default function useNewsFetch(country, pageNumber) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const newsDetails = useSelector((state) => state?.newsReducer?.newsDetails);

  const newsDetailsSuccess = useSelector(
    (state) => state?.newsReducer?.newsDetailsSuccess
  );
  const newsDetailsError = useSelector(
    (state) => state?.newsReducer?.newsDetailsError
  );

  const newsDetailsRef = useRef();
  const newsDetailsSuccessRef = useRef();
  const newsDetailsErrorRef = useRef();

  newsDetailsRef.current = newsDetails;
  newsDetailsSuccessRef.current = newsDetailsSuccess;
  newsDetailsErrorRef.current = newsDetailsError;

  useEffect(() => {
    setError(false);
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, country]);

  const fetchNews = () => {
    if (country && pageNumber) {
      setLoading(true);

      dispatch(getNews(country, pageNumber)).then((res) => {
        setLoading(false);

        setData((prevData) => [
          ...new Set([...prevData, ...newsDetailsRef.current]),
        ]);

        setHasMore(newsDetailsRef.current?.length > 0);
      });
    }
  };

  return { loading, error, data, hasMore };
}
