import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function StudyDeck( {decks} ) {

    const { deckId } = useParams();
    const navigate = useNavigate();
    
    const handleFlip = () => {
        setFlipped(true);
      };
    
    const handleNext = () => {
        if (cards.length - 1 === (thisCard)) {
            if (window.confirm("Restart cards?  Click 'Cancel' to return to the home page."))
                {
                    setThisCard(0);
                    setFlipped(false);
                } else {
                    navigate('/');
                }
        } else {
            setThisCard(thisCard + 1);
            setFlipped(false);
        } 
      };
      
    const handleAddCards = () => {
        navigate(`/decks/${deckId}/cards/new`);
      };

      const [loading, setLoading] = useState(true);
      const [cards, setCards] = useState([]);
      const [deckName, setDeckName] = useState("");
      const [flipped, setFlipped] = useState(false);
      const [thisCard, setThisCard] = useState(0);
           
      useEffect(() => {
        
        readDeck(deckId)
          .then((data) => {
            setCards(data.cards);
            setDeckName(data.name);
            setLoading(false);
          })
      }, []);
      
      if(loading) { 
          return (
            <div>
                <h4> Loading deck... </h4>
            </div>
          )
      } else if (cards.length < 3) {
            return (
                <div>
                <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                    { name: deckName, link: `/decks/${deckId}` },
                    { name: "Study", link: `/decks/${deckId}/Study` }]} />
                <h1>Study: {deckName}</h1>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
                <button onClick={handleAddCards} type="button" className="btn btn-primary">+Add Cards</button>
                </div>
            )
      } else {
            return  (
            <div>
                <Breadcrumb breadcrumb={[{ name: 'Home', link: '/' }, 
                    { name: deckName, link: `/decks/${deckId}` },
                    { name: "Study", link: `/decks/${deckId}/Study` }]} />
                <h1>Study: {deckName}</h1>
                <container>
                    <h4>Card {thisCard + 1} of {cards.length}</h4>
                    {flipped===false && <p>{cards[thisCard].front}</p>}
                    {flipped===true && <p>{cards[thisCard].back}</p>}
                    <button onClick={handleFlip} type="button" className="btn btn-secondary">Flip</button>
                    {flipped===true && <button onClick={handleNext} type="button" className="btn btn-secondary">Next</button>}
                </container>
            </div>
          );
      }

}

export default StudyDeck;