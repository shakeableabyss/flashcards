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
import { createCard, readDeck, readCard } from "../utils/api";

function NewCard( {decks} ) {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();
    const { deckId, cardId } = useParams();
	const [loading, setLoading] = useState(true);

    useEffect(() => {
        
      readDeck(deckId)
          .then((data) => {
            setDeck(data);
		    setCards(data.cards);
			setLoading(false);
      })}, []);
		
    const handleSave = () => {
        const x = new Date().getTime();
        createCard(deckId,{"id": x, "front": front, "back": back, "deckId": deckId});        
        setFront("");
        setBack("");
      };
    
    const handleDone = () => {
        setFront("");
        setBack("");
        navigate(`/decks/${deckId}`)
      };
 
    return (
        <div>
            <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                                     { name: deck.name, link: `/decks/${deckId}` },
                                     { name: 'Add Card', link: `/decks/${deckId}/cards/new`}]} />
            <h1>{deck.name}: Add Card</h1>
            <form>
                <label htmlFor="front">Front: </label>
                <br />
                <textarea
                        id="front" 
                        name="front" 
                        placeholder="Front side of card"
                        rows="2" 
                        cols="50"
                        value={front} 
                        onChange={e => setFront(e.target.value)}
                        ></textarea>
                <br />
                <label hrmlFor="back">Back: </label>
                <br />
                <textarea 
                        id="back" 
                        name="back" 
                        placeholder="Back side of card"
                        rows="2" 
                        cols="50"
                        value={back} 
                        onChange={e => setBack(e.target.value)}
                        ></textarea>
                <br />                        
                <button onClick={handleDone} type="button" className="btn btn-secondary">Done</button>
                <button onClick={handleSave} type="button" className="btn btn-primary">Save</button>
            </form>

        </div>
    )

}

export default NewCard;