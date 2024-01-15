import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";


const BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        async function getDeck() {
            const res = await axios.get(`${BASE_URL}/new/shuffle`);
            setDeck(res.data);
        }
        getDeck();
    }, []);

    const drawCard = async () => {
        try{
            const cardRes = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`);

            if (cardRes.data.remaining === 0) throw new Error("No more cards left!");

            const card = cardRes.data.cards[0];

            setCards(cards => [
                ...cards,
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image
                }
            ]);
        } catch (err) {
            alert(err);
        }
    };

    const shuffle = async () => {
        setIsShuffling(true);
        try{
            await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
            setCards([]);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    };

    const renderDrawBtnIfOk = () => {
        if (!deck) return null;

        return (
            <button
                className="Deck-draw"
                onClick={drawCard}
                disabled={isShuffling}
            >
                Draw Card!
            </button>
        );
    };

    const renderShuffleBtnIfOk = () => {
        if (!deck) return null;

        return (
            <button
                className="Deck-draw"
                onClick={shuffle}
                disabled={isShuffling}
            >
                Shuffle!
            </button>
        );
    };

    const cardComponents = cards.map(card => (
        <Card 
            key={card.id}
            name={card.name}
            image={card.image}
        />
    ));

    return (
        <main className="Deck">

            {renderDrawBtnIfOk()}
            {renderShuffleBtnIfOk()}

            <div className="Deck-cardarea">
                {cardComponents}
            </div>

        </main>
    );
}


export default Deck;