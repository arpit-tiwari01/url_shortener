import { getLongUrl} from "@/db/apiUrls";
import {storeClick} from "@/db/apiClicks";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const ReDirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClick, {
    id: data?.id,
    original_url: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, [data]);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        <h1>Redirecting...</h1>
      </>
    );
  }

  return null;
};

export default ReDirectLink;
