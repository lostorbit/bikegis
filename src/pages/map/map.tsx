import { useParams } from "react-router-dom";
import DynamicMap from "../../components/map/dynamicmap";

export default function Map() {
  const { mapurl } = useParams();
  console.log("mapurl", mapurl);

  return (
    <div>
      <DynamicMap mapurl={mapurl} />
    </div>
  );
}
