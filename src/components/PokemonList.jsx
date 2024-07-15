import React from 'react'

export default function PokemonList({ pokemon }) {
  return (
    <div>
      {
        pokemon.map((name) => {
          return <div key = {name}>{name}</div>
        })
      }   
    </div>
  )
}
