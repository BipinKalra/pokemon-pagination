import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState("")
  const [previousPageUrl, setPreviousPageUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPreviousPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    // A user might make multiple consecutive requests
    // Cancelling the previous request before making the next one
    // Can be achieved by returning a cleanup function from useEffect
    return () => cancel()
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl)
  }

  if (loading) return "Loading..."
  
  return (
    <div className="App">
      <PokemonList pokemon = {pokemon} />
      <Pagination 
        goToNextPage = {nextPageUrl ? goToNextPage : null}
        goToPreviousPage = {previousPageUrl ? goToPreviousPage : null}
      />
    </div>
  );
}

export default App;
