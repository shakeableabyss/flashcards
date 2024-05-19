import React, {useEffect, useState} from "react";
import Header from "./Header";
import { listDecks } from "../utils/api";
import DeckList from "./DeckList";
import New from "./New";
import EditDeck from "./EditDeck";
import ViewDeck from "./ViewDeck";
import NewCard from "./NewCard";
import EditCard from "./EditCard";
import StudyDeck from "./StudyDeck";
import { Routes, Route } from "react-router-dom";

function Layout() {
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState([]);
  
  useEffect(() => {
    
    listDecks()
      .then((data) => {
        setDecks(data);
        setLoading(false);
      })
  }, []);

  function addDeck(deck) {
    setDecks(currentDecks => [...currentDecks, deck]);
  }

  if (!loading) {

    
    return (
      <div>
        <Header />
        
        <div className="container">
        
            <Routes>
              <Route path="*" element={<h1>Not Found</h1>} />
              <Route path="/" element={<DeckList decks={decks} />} />
              <Route path="decks/new" element={<New addDeck={addDeck} />} />
              <Route path="decks/:deckId" element={<ViewDeck decks={decks} />} />
              <Route path="decks/:deckId/edit" element={<EditDeck decks={decks} />} />
              <Route path="decks/:deckId/study" element={<StudyDeck decks={decks} /> } />
              <Route path="decks/:deckId/cards/new" element={<NewCard decks={decks} /> } />
              <Route path="decks/:deckId/cards/:cardId/edit" element={<EditCard decks={decks} /> } />
            </Routes>
                
        </div>
      </div>
    );

    } else {

      return (
        <div>
        <Header />
		<Routes>
              <Route path="*" element={<h1>Not Found</h1>} />
			  <Route path="/" element={<h1>Loading Decks...</h1>} />
		</Routes>
        </div>
      )

  }}

export default Layout;
