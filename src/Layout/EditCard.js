import React, {useEffect, useState} from "react";
import {
    Link,
    NavLink,
    useParams,
    Router,
    Routes,
    Route,
    useNavigate} from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { readDeck, readCard, updateCard } from "../utils/api";

function EditCard( {decks} ) {

    const { deckId, cardId } = useParams();
	
	const [front, setFront] = useState("");
    const [back, setBack] = useState("");
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

    useEffect(() => {
        
      readDeck(deckId)
          .then((data) => {
            setDeck(data);
		    setCards(data.cards);
			setLoading(false);
          })
		
	  readCard(cardId)
		  .then((data) => {
		    setFront(data.front);
		    setBack(data.back);
      })}, []);
    
    
    const handleSave = () => {
        updateCard({"id": cardId, "front": front, "back": back, "deckId": deck.id});        
        setFront("");
        setBack("");
        navigate(`/decks/${deckId}`)
      };
    
    const handleCancel = () => {
        navigate(`/decks/${deckId}`)
      };
 
    return (
        <div>
            <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                                     { name: deck.name, link: `/decks/${deckId}` },
                                     { name: `Edit Card #${cardId}`, link: `/decks/${deckId}/cards/${cardId}/edit`}]} />
            <h1>Edit Card</h1>
            <form>
                <label htmlFor="front">Front: </label>
                <textarea
                        id="front" 
                        name="front" 
                        rows="2" 
                        cols="50"
                        value={front} 
                        onChange={e => setFront(e.target.value)}
                        ></textarea>
                <label hrmlFor="back">Back: </label>
                <textarea 
                        id="back" 
                        name="back" 
                        rows="2" 
                        cols="50"
                        value={back} 
                        onChange={e => setBack(e.target.value)}
                        ></textarea>
                <button onClick={handleCancel} type="button" className="btn btn-secondary">Cancel</button>
                <button onClick={handleSave} type="button" className="btn btn-primary">Save</button>
            </form>

        </div>
    )
}

export default EditCard;