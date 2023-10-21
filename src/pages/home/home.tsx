import CollectionMap from "../../components/map/collectionmap";
import Container from "@mui/material/Container";

import { useParams } from "react-router-dom";
import DynamicMap from "../../components/map/dynamicmap";

export default function Home() {
  const { mapurl } = useParams();
  console.log("mapurl", mapurl);

  return (
    <Container maxWidth="lg">
      <DynamicMap mapurl={mapurl} />
    </Container>
  );
}
