import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList.jsx";
import BattleArena from "./components/BattleArena.jsx";

const App = () => {
    return (
        <Router>
            <div>
                <h1>Покемоны и Боевая Арена</h1>
                <nav>
                    <Link to="/">Список Покемонов</Link> | <Link to="/arena">Боевая Арена</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/arena" element={<BattleArena />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
