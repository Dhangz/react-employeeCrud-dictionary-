import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Dictionary() {

    const [word, setWord] = useState("");
    const navigate =  useNavigate();
    
    return (
        <form className="px-2" onSubmit={() => {
            navigate('/Definitions/' + word)
        }}>
            <h1>Dictionary</h1>

            <input value={word}  className="bg-gray-200" onChange={(e) => setWord(e.target.value)} />

            <button type="submit">Search</button>
        
        </form>
    )
}
export default Dictionary