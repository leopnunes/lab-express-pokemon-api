const express = require("express");

//importando cors
const cors = require("cors")

const PORT = 4000;

// Importing all the pokemon for our data file
let allPokemon = require("./data");

//instanciando o express na variável APP
const app = express();
app.use(cors({origin: "http://localhost:3000"})) // se colocar origin: "*" quer dizer que vai aceitar TODAS as requisições, isso não é legal


//configurando o nosso servidor para receber e enviar arquivos em JSON
app.use(express.json());

// -- Define your route listeners here! --



//pegar todos os Pokemons
app.get("/pokemon", (req, res) => {
  return res.status(200).json(allPokemon);
});


//pegar apenas um pokemon
app.get("/pokemon/:id", (req, res) => {
  const {id} = req.params

  const pokemonObj = allPokemon.filter((pokemon) => {

    return pokemon.id === +id
  })

  pokemon = pokemonObj

  return res.status(200).json(pokemon);
});


//adicionar pokemon
app.post("/pokemon/add/:id", (req, res) => {
    const form = req.body

    allPokemon.push(form)

    return res.status(201).json(allPokemon)
})


//editar um pokemon
app.put("/pokemon/edit/:id", (req, res) => {
    const {id} = req.params

    allPokemon.forEach((pokemon, index) => {
        if (pokemon.id === +id) {
            allPokemon[index] = {...pokemon, ...req.body}
        }
    })

    return res.status(200).json(allPokemon)
})



//deletar um pokemon
app.delete("/allPokemon/delete/:id", (req, res) => {
    const {id} = req.params
    
    const newArray = allPokemon.filter((pokemon) => {
        return pokemon.id !== +id
    })

    allPokemon = newArray  

    return res.status(200).json(allPokemon)

})


//buscar um pokemon por NOME
app.get("/search", (req, res, next) => {

    let foundPokemon = []

    if (req.query.name) {
        console.log("sim, estão procurando por NOME")

        allPokemon.forEach((pokemon) => {
            if (pokemon.name === req.query.name) {
                foundPokemon.push(pokemon)
            }

        })
        return res.status(200).json(foundPokemon)
    }
    
    if (req.query.types) {
        console.log("sim, estão procurando por TYPE")

        allPokemon.forEach((pokemon) => {
            if (pokemon.types.includes(req.query.types)) {
                foundPokemon.push(pokemon)
            }

        })
        return res.status(200).json(foundPokemon)
    }

})



app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
