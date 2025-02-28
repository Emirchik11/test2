import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, catchPokemon } from "../redux/PokemonSLice.js";
import { Link } from "react-router-dom";
import { Card, Button, Spin, List } from "antd";

const PokemonList = () => {
    const dispatch = useDispatch();
    const { pokemons, caughtPokemons, status } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    const handleCatch = (pokemon) => {
        dispatch(catchPokemon(pokemon));
    };

    return (
        <div className="container">
            <h2>Список Покемонов</h2>

            <Link to="/arena">
                <Button type="primary" style={{ marginBottom: 20 }}>Перейти в арену</Button>
            </Link>

            {status === "loading" && <Spin />}
            {status === "failed" && <p>Ошибка загрузки данных</p>}

            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={pokemons}
                renderItem={(pokemon) => (
                    <List.Item>
                        <Card
                            title={pokemon.name}
                            cover={<img src={pokemon.sprites.front_default} alt={pokemon.name} />}
                            actions={[<Button onClick={() => handleCatch(pokemon)}>Поймать</Button>]}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PokemonList;
