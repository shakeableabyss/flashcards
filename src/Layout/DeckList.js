import React, {useEffect} from "react";
import Deck from "./Deck";
import {
  useNavigate} from "react-router-dom";


export const DeckList = ( {decks} ) => {

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/decks/new");
  }

    return (
        <div>
          <button onClick={handleCreate} type="button" className="btn btn-secondary">+ Create Deck</button>
          {decks.map((deck, index) => (
            <Deck key={deck.id} deck={deck} />
          ))}
        </div>
      );
}

export default DeckList;