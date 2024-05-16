import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCard } from "../utils/api";

export const Card = ( {card} ) => {

    const navigate = useNavigate();
    const { deckId, cardId } = useParams();

    const handleEdit = () => {
        navigate(`/decks/${deckId}/cards/${card.id}/edit`)
    }

    const handleDelete = (deleteId) => {
        if (window.confirm("Delete this Card? You will not be able to recover it.")) {
            deleteCard(card.id);
            navigate(`/decks/${deckId}`)
            window.location.reload();
        }
    }
    
    return (
        <container class="deck">   
            <p>{card.front}</p>     
            <p>{card.back}</p>
            <button onClick={handleEdit} type="button" class="btn btn-secondary">Edit</button>
            <button onClick={handleDelete} type="button" class="btn btn-danger">Delete</button>
        </container>
    )
}

export default Card;