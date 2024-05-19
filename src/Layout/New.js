import React, {useEffect, useState} from "react";
import {
    Link,
    NavLink,
    useParams,
    Router,
    Routes,
    Route,
    useNavigate} from "react-router-dom";
import { createDeck } from "../utils/api";

function New( {addDeck} ) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const x = new Date().getTime();
        const newDeck = {"id": x, "name": name, "description": description, cards: []};
        createDeck(newDeck)
            .then(() => {
                addDeck(newDeck);
                navigate(`/decks/${x}`);
    });
      };
    
    const handleCancel = () => {
        setName("");
        setDescription("");
        navigate("/");
      };

    return (
        <div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <br />
                <input  type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Deck Name"
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        ></input>
                <br />
                <label htmlFor="description">Description: </label>
                <br />
                <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Deck Description"
                        rows="2" 
                        cols="50"
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        ></textarea>
                <br />
                <button onClick={handleCancel} type="button" className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )

}

export default New;