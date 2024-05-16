import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export const Deck = ( {deck} ) => {

    const navigate = useNavigate();

	const numberOfCards = `${deck.cards.length} cards`
	
    const handleView = () => {
        navigate(`/decks/${deck.id}`);
    }
    
    const handleStudy = () => {
        navigate(`/decks/${deck.id}/study`);
    }
    
    const handleDelete = () => {
        if (window.confirm("Delete this Deck? You will not be able to recover it.")) {
            deleteDeck(deck.id);
            window.location.reload();
        }
    }

    return (
        <container class="deck">   
            <h4>{deck.name}</h4>     
            <h6>{numberOfCards}</h6>
            <p>{deck.description}</p>
            <button onClick={handleView} type="button" class="btn btn-secondary">View</button>
            <button onClick={handleStudy} type="button" class="btn btn-primary">Study</button>
            <button onClick={handleDelete} type="button" class="btn btn-danger">Delete</button>
        </container>
    )
}

export default Deck;