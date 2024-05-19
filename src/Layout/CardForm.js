import React, {useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

function CardForm( {frontinit, backinit} ) {

    const navigate=useNavigate();
    
    let { deckId, cardId } = useParams();
    deckId = parseInt(deckId);
    cardId = parseInt(cardId);
    	
	const [front, setFront] = useState(frontinit);
    const [back, setBack] = useState(backinit);

    const handleSave = (event) => {
        event.preventDefault();
        if (frontinit) {
            console.log(cardId, front, back, deckId)
            updateCard({"id": cardId, "front": front, "back": back, "deckId": deckId})
            .then(() => navigate(`/decks/${deckId}`));
        } else {
            const x = new Date().getTime();
            createCard(deckId,{"id": x, "front": front, "back": back, "deckId": deckId})
            .then(() => {
                setFront("");
                setBack("");
            });                    
        }
      };
    
    const handleDone = () => {
        setFront("");
        setBack("");
        navigate(`/decks/${deckId}`)
      };
 
      useEffect(() => {
        setFront(frontinit);
        setBack(backinit);
    }, [frontinit, backinit]);


    return (
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
                <label htmlFor="back">Back: </label>
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
    )

}

export default CardForm;