import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function EditDeck( {decks} ) {

    const { deckId } = useParams();
    
	const [deck, setDeck] = useState({})
	const [name, setName] = useState(deck.name);
  const [description, setDescription] = useState(deck.description);
	const [loading, setLoading] = useState(true);
	const [front, setFront] = useState("");
	const [back, setBack] = useState("");
    const navigate = useNavigate();
    
	useEffect(() => {
        
      readDeck(deckId)
          .then((data) => {
            setDeck(data);
			setName(data.name);
		    setDescription(data.description);
		    setLoading(false);
		  })
		
	  }, []);
    
	const handleSave = () => {
        deck.name = name;
        deck.description = description;
        updateDeck(deck);        
        navigate(`/decks/${deck.id}`);
      };
    
    const handleDone = () => {
        setDescription("");
        navigate("/");
      };
      
	if(loading) { 
          return (
            <div>
                <h4> Loading deck... </h4>
            </div>
          )
      } else {
    return (
		        <div>
            <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                                     { name: deck.name, link: `/decks/${deckId}` },
                                     { name: "Edit Deck", link: `/decks/${deckId}/edit` }]} />
            <h1>Edit Deck</h1>
            <form>
                <label htmlFor="name">Name: </label>
                <input  type="text" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        ></input>
                <label htmlFor="description">Description: </label>
                <textarea 
                        id="description" 
                        name="description" 
                        rows="2" 
                        cols="50"
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        ></textarea>
                <button onClick={handleDone} type="button" className="btn btn-secondary">Done</button>
                <button onClick={handleSave} type="button" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
	  }

}

export default EditDeck;