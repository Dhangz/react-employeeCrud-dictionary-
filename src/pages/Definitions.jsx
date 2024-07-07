import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from "react-router-dom";

function Definitions() {

    const [word, setWord] = useState([]);
    const navigate = useNavigate();
    let { search } = useParams();

    useEffect(() => {

        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
        .then((response) => {
            if (!response.ok) {
                console.log(response.status);
                navigate("/404");
            }
            return response.json()
        })
        .then((data) => {
            // console.log(data[0].meanings[0])
            
            setWord(data[0].meanings)
        })
        
    }, [navigate, search]);

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
        
        </>
        
    )
}

export default Definitions