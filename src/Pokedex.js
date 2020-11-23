import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mockData from "./mockData";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import SearchIcon from "@material-ui/icons/Search";
// import { getPokemon, getAllPokemon } from './services/pokemon';

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
        textAlign: "center"
    },
    cardMedia: {
        margin: "auto"
    },
    card: {
        background: "red"
    },
    pokeName: {
        textAlign: "center"
    },
    formContainer: {
        display: "flex"
    },
    form: {
        background: "none",
        border: "none",
        outline: "none",
        borderBottom: "2px solid black"
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px"
    },
    button: {
        margin: "0px 20px",
        background: "#FFBB40",
        border: "none",
        padding: "10px 30px",
        outline: "none"
    }
})


const Pokedex = () => {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(9);

    const handleSearchChange = e => {
        setFilter(e.target.value);
    }

    const prev = () => {
        console.log("prev");
        if( offset > 0 ) {
            setOffset(offset - 10);
            setLimit(limit - 10);
            console.log(offset);
        }
    }
    const next = () => {
        console.log("next");
        if( offset < 800 ) {
            setOffset(offset + 10);
            setLimit(limit + 10);
            console.log(offset);
        }
    }
   
    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((response) => {
            const { data } = response;
            const { results } = data;
            setPokemonData(results);
        });
    }, [offset,limit]);


    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ display:"flex", justifyContent: "center" }} >
                    <div className={classes.formContainer}>
                        <SearchIcon/>
                        <input onChange={handleSearchChange} className={classes.form} text="text"></input>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.buttonWrapper}>
                <button className={classes.button} onClick={prev} >
                    Prev
                </button>
                <button className={classes.button} onClick={next}>
                    Next
                </button>
            </div>
           
            {pokemonData.length > 0 ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {pokemonData.map((item,id) => 
                        item.name.includes(filter) &&
                        <PokemonCard name={item.name} url={item.url} key={id}/> )}
                </Grid>
            ) : (
                <CircularProgress/>
            )
            }
            
        </>
    );
}
export default Pokedex;