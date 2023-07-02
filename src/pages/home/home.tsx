import CollectionMap from '../../components/map/collectionmap';
import Container from '@mui/material/Container';

import { useParams } from 'react-router-dom';

export default function Home() {
    const { mapurl } = useParams();
    console.log("mapurl", mapurl); 

    return (
        <Container maxWidth="lg">
            <CollectionMap mapurl={mapurl}/>
        </Container>
    );
}
