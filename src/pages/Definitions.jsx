import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from '../components/NotFound';
function Definitions() {

    const [word, setWord] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();
    let { search } = useParams();

    useEffect(() => {

        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
        .then((response) => {
            if (!response.ok) {
                setNotFound(true)
            }
            return response.json()
        })
        .then((data) => {           
            setWord(data[0].meanings)
        })
        
    }, [navigate, search]);


    if (notFound){
        return <NotFound />
    }

    return (

        <>
        {word ? (
            <> 
                <h3>Definition: </h3>
                {
                    word.map((meaning) => {
                        return <p key={uuidv4()}>
                                {meaning.partOfSpeech}: &nbsp;
                                {meaning.definitions[0].definition} 
                                </p>
                    })
                }
            </>) : null
        }

        <Link to={'/Dictionary'}>Search Again</Link>
        
        </>
        
    )
}

export default Definitions