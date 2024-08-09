import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/context";
import { getClicksforUrls } from "@/db/apiClicks";
import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";
import CreateLink from "@/components/CreateLink";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);


  const {
    loading: loadingClicks,
    data: Clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksforUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#36d7d7" />}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Link Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{Clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between ">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink/>
      </div>
      <div className="relative">
        <Input
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2" />
      </div>
      {error && <Error message={error.message}/>}
      {(filteredUrls || []).map((url,id) => {
        return <LinkCard key={id} url={url} fetchUrls={fnUrls}/>;
      })}
      {console.log(urls)}
    </div>
  );
}

export default Dashboard;
