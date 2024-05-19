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
            console.log("deck", data)
            setDeck(data);
		        setCards(data.cards);
			      setLoading(false);
          })
		
	  readCard(cardId)
		  .then((data) => {
        console.log("card", data)
		    setFront(data.front);
		    setBack(data.back);
      })}, []);
    
    
    return (
        <div>
            <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                                     { name: deck.name, link: `/decks/${deckId}` },
                                     { name: `Edit Card #${cardId}`, link: `/decks/${deckId}/cards/${cardId}/edit`}]} />
            <h1>Edit Card</h1>
            <CardForm frontinit={front} backinit={back} />

        </div>
    )
}

export default EditCard;