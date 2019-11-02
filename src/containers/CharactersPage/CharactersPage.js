import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CharactersPage.css';
import Character from "../../components/Character/Character";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";

function CharactersPage() {
    const [heroes, setHeroes] = useState([]);
    const [modalShow, setModalShow] = useState("");
    const [quote, setQuote] = useState({});
    const [name, setName] = useState("");
    const [offset, setOffset] = useState(0);
    const [lowerLimit, setLowerLimit] = useState(offset + 1);
    const [upperLimit, setUpperLimit] = useState(offset + 10);
    let newoffset;

    useEffect(() => {
        axios.get("/characters?limit=10&offset=" + offset)
            .then(characters => {
                const people = characters.data.map(character => {
                    const person = {
                        id: character.char_id,
                        name: character.name,
                        occupation: character.occupation,
                        picture: character.img
                    };
                    return person;
                });
                return people;
            })
            .then(people => {
                setHeroes(people);
                setLowerLimit(offset + 1);
                setUpperLimit(offset + people.length);
            })
    }, [offset]);
    useEffect(() => {
        axios.get("/quote/random?author=" + name)
            .then(response => {
                const arr = response.data;
                if (arr.length === 1) {
                    return {
                        author: arr[0].author,
                        quote_id: arr[0].quote_id,
                        quote: arr[0].quote
                    };
                } else {
                    return {
                        author: name,
                        quote_id: Math.random(),
                        quote: "Error: No quote. Nothing is said"
                    }
                }
            })
            .then(quote => {
                setQuote(quote);
            })
    }, [name, modalShow]);
    const GetQuote = (name) => {
        setModalShow(modalShow => !modalShow);
        setName(name);
    };
    const increaseOffset = () => {
        newoffset = offset;
        newoffset = offset + 10;
        if (heroes.length === 10) {
            setOffset(newoffset);
        }
    };

    const decreaseOffset = () => {
        newoffset = offset - 10;
        if (newoffset >= 0) {
            setOffset(newoffset);
        }
    };

    let characters;
    if (heroes.length > 0) {
        characters = heroes.map(hero => (
            <Character
                key={hero.id}
                occupations={hero.occupation}
                imageUrl={hero.picture}
                name={hero.name}
                value="Get quotes"
                btnType="get_quote"
                click={() => GetQuote(hero.name)}
            />
        ));
    } else {
        characters = <p>Error! There are no characters to display...</p>
    }
    return (
        <div className="CharactersPage">
            <h2>Characters</h2>
            <div className="PaginationWrapper">
                <Button
                    btnType={"get_heroes"}
                    click={decreaseOffset}
                    value={"<<"}
                />
                <p>{lowerLimit}...{upperLimit}</p>
                <Button
                    btnType={"get_heroes"}
                    click={increaseOffset}
                    value={">>"}
                />
            </div>
            <section className="Characters">
                {characters}
            </section>
            <Modal
                show={modalShow}
                closed={GetQuote}
                title={`${name} says:`}
                btnType="Close"
                value="X"
                array={[{type: 'Close', label: 'Close', closed: GetQuote}]}
            >
                <p>{quote.quote}</p>
            </Modal>
        </div>
    );
}

export default CharactersPage;