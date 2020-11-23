import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Grid, Card, CardContent,CardMedia, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import typeColors from "../src/helpers/typeColors"



const PokemonCard = ({name,url}) => {
    const useStyles = makeStyles({
        pokedexContainer: {
            paddingTop: "20px",
            paddingLeft: "50px",
            paddingRight: "50px"
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
        type: {
            width: "130px",
            margin: "0 auto",
            marginBottom: "20px"
        }
    })

    const classes = useStyles();
    const [fullPokemonData, setFullPokemonData] = useState(null);

    
    

    useEffect(() => {
        if(url) {
            axios
            .get(url)
            .then(function(response) {
                const { data } = response;
                // console.log(data.types[0].type.name);
                let type = data.types[0].type.name
                setFullPokemonData(data);
            });
        }
    }, [url]);
    

        return (
            <>
                {fullPokemonData ? (
                 <Grid item xs={12} sm={4}>
                    <Card key>
                        <img style={{ textAlign:"center", width: "130px", height: "130px" }} src={fullPokemonData.sprites.front_default} alt="null"/>
                        <h1 className={classes.pokeName} >{name}</h1>
                        <div>
                            <p className={classes.type} style={{ backgroundColor: typeColors[fullPokemonData.types[0].type.name]}} >{fullPokemonData.types[0].type.name}</p>
                        </div>
                
                    </Card>
                 </Grid>
                ) : (
                    <CircularProgress/>
                )
                }
            </>
        )
}






export default PokemonCard;