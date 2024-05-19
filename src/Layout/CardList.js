import React, {useEffect, useState} from "react";
import Card from "./Card";
import { deleteCard, readDeck } from "../utils/api";

export const CardList = ( {deck} ) => {

    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState(deck.cards);
    
    if (cards.length !== 0) {
        return (
            <div>
                {cards.map((card) => (
                <Card key={card.id} card={card} />
                ))}
            </div>
        );
    } else {
       return <h4> This deck does not have any cards right now! </h4>
    }
}

export default CardList;