import React, { useState } from 'react';
import axios from "axios";
import "./App.css";


const App = () => {

  const[pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType1, setPokemonType1] = useState("");
  const [pokemonType2, setPokemonType2] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImg, setPokemonImg] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try{
      const url = `http://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url);
      toArray.push(res.data)
      setPokemonType1(capitalizeName(res.data.types[0].type.name))
      setPokemonName(capitalizeName(res.data.species.name))
      setPokemonImg(res.data.sprites.other.home.front_default)
      setPokemonData(toArray)
      console.log(res)
    }
    catch(e){
      console.log(e)
    }
  }

  const capitalizeName = (str) => {
    const string = str.charAt(0).toUpperCase() + str.slice(1);
    return string;
  }

  const handleChange = (e) =>{
    setPokemon(e.target.value.toLowerCase());
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" onChange={handleChange} placeholder="Enter pokémon name"/>
        </label>
      </form>
      {pokemonData.map((data) =>{
        return(
          <div className="container">
            <img src={pokemonImg} alt="" />
            <div className="divTable">
              <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableCell">Specie</div>
                <div className="divTableCell">{pokemonName}</div>

              </div>
              <div className="divTableRow">
                <div className="divTableCell">Type</div>
                <div className="divTableCell">{pokemonType1}</div>

              </div>
              <div className="divTableRow">
                <div className="divTableCell">Height</div>
                <div className="divTableCell">
                  {""}
                  {Math.round(data.height *3.9)} "
                  </div>

              </div>
              <div className="divTableRow">
                <div className="divTableCell">Weight</div>
                <div className="divTableCell">
                  {""}
                  {Math.round(data.weight /4.3)} lbs
                  </div>

              </div>
              <div className="divTableRow">
                <div className="divTableCell">Ability</div>
                <div className="divTableCell">{capitalizeName(data.abilities[0].ability.name)}</div>

              </div>
            </div></div>
          </div>
        )
      })}
    </div>
  );

};



export default App;
