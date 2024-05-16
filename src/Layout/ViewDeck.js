import React, {useState, useEffect} from "react";
import CardList from "./CardList";
import Breadcrumb from "./Breadcrumb";
import { deleteDeck, readDeck } from "../utils/api";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function ViewDeck() {

    const navigate = useNavigate();
    const { deckId } = useParams();
	
	const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({});
    const [flipped, setFlipped] = useState(false);
    const [thisCard, setThisCard] = useState(0);
	const [loading, setLoading] = useState(true);
           
    useEffect(() => {
        
	readDeck(deckId)
          .then((data) => {
            setDeck(data);
			setCards(data.cards);
			setLoading(false);
          })
      }, []);

    const handleEdit = () => {
        navigate(`/decks/${deck.id}/edit`);
    }
    
    const handleStudy = () => {
        navigate(`/decks/${deck.id}/study`);
    }
    
	const handleDelete = async () => {
		if (window.confirm("Delete this Deck? You will not be able to recover it.")) {
			await deleteDeck(deck.id);
			navigate("/");
			window.location.reload();
		}
	}

    const handleAddCards = () => {
        navigate(`/decks/${deckId}/cards/new`)
    }
    
	if(!loading) { 
          
    return (
        <div>
        <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                                     { name: deck.name, link: `/decks/${deckId}` }]} />
        <container class="deck">   
            <h4>{deck.name}</h4>     
            <p>{deck.description}</p>
            <button onClick={handleEdit} type="button" class="btn btn-secondary">Edit</button>
            <button onClick={handleStudy} type="button" class="btn btn-primary">Study</button>
            <button onClick={handleAddCards} type="button" class="btn btn-danger">+Add Cards</button>
            <button onClick={handleDelete} type="button" class="btn btn-danger">Delete</button>
        </container>
        <hr></hr>
        <CardList deck={deck} />
        </div>
    )
}
}

export default ViewDeck;