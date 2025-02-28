import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Select, Button } from "antd";

const BattleArena = () => {
    const caughtPokemons = useSelector((state) => state.pokemon.caughtPokemons);
    const [selectedPokemon1, setSelectedPokemon1] = useState(null);
    const [selectedPokemon2, setSelectedPokemon2] = useState(null);
    const [winner, setWinner] = useState("");

    const determineWinner = () => {
        if (!selectedPokemon1 || !selectedPokemon2) {
            setWinner("Выберите двух покемонов");
            return;
        }
        const stats1 = selectedPokemon1.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
        const stats2 = selectedPokemon2.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
        setWinner(stats1 > stats2 ? selectedPokemon1.name : selectedPokemon2.name);
    };

    return (
        <div className="arena-container">
            <h2>Боевая Арена</h2>
            <Select
                style={{ width: 200, marginRight: 10 }}
                placeholder="Выберите 1 покемона"
                onChange={(value) => setSelectedPokemon1(caughtPokemons.find((p) => p.name === value))}
            >
                {caughtPokemons.map((p) => (
                    <Select.Option key={p.name} value={p.name}>{p.name}</Select.Option>
                ))}
            </Select>
            <Select
                style={{ width: 200 }}
                placeholder="Выберите 2 покемона"
                onChange={(value) => setSelectedPokemon2(caughtPokemons.find((p) => p.name === value))}
            >
                {caughtPokemons.map((p) => (
                    <Select.Option key={p.name} value={p.name}>{p.name}</Select.Option>
                ))}
            </Select>
            <Button onClick={determineWinner} type="primary" style={{ marginLeft: 10 }}>Сразиться!</Button>
            <h3>Победитель: {winner}</h3>
        </div>
    );
};

export default BattleArena;
