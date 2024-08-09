import { getLongUrl } from "@/db/apiUrls"
import { useParams } from "react-router-dom"
import useFetch from "@/hooks/useFetch"


const ReDirectLink = () => {
  const {id} =useParams()

  const { loading , data ,fn } = useFetch( getLongUrl,id)

  const {}=useFetch( storeClicks)
  return (
    <div>ReDirectLink</div>
  )
}

export default ReDirectLink