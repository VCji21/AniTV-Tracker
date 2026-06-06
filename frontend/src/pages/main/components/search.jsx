import AnimeCards from "./AnimeCards"
import { useSearchParams } from "react-router-dom";

/* --- Get searched data --- */
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
 
  return (
    <main>
        <section className="p-10">
            <h2 className="px-[5px] py-[20px] font-extrabold text-2xl text-extrabold" >Search Animes</h2>
            <AnimeCards api_ref={`/anime?q=${encodeURIComponent(query)}`} />
        </section>
    </main>
  ) 
}

export default Search