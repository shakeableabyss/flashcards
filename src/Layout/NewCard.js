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
import CardForm from "./CardForm";
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
		

    return (
        <div>
            <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                                     { name: deck.name, link: `/decks/${deckId}` },
                                     { name: 'Add Card', link: `/decks/${deckId}/cards/new`}]} />
            <h1>{deck.name}: Add Card</h1>
            <CardForm />

        </div>
    )

}

export default NewCard;