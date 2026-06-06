import { useEffect, useState } from "react"
import { get_backend, jikan_api } from "../../../service/api"

/* --- Get anime --- */
const AnimeCards = ({ api_ref }) => {
    
    const [animes, setAnimes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnime, setSelectedAnime] = useState(null);

    /* --- Get animes from jikanAPI and store it into local storage of browser --- */
    useEffect(() => {
        const get_anime = async () => {
            try {
                // Create a unique cache key based on api_ref
                const cacheKey = `anime_cache_${api_ref}`;
                const cacheTimeKey = `anime_cache_time_${api_ref}`;

                // Check if cached data exists and is still valid (e.g., 10 minutes)
                const cachedData = localStorage.getItem(cacheKey);
                const cacheTime = localStorage.getItem(cacheTimeKey);
                const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds

                const now = Date.now();

                if (cachedData && cacheTime && (now - parseInt(cacheTime)) < TEN_MINUTES) {
                    // Use cached data
                    console.log('Using cached data');
                    setAnimes(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }

                // Fetch fresh data
                console.log('Fetching fresh data');
                const api = await jikan_api(api_ref);
                setAnimes(api.data);

                // Cache the data
                localStorage.setItem(cacheKey, JSON.stringify(api.data));
                localStorage.setItem(cacheTimeKey, now.toString());

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        get_anime();
    }, [api_ref]) // Added api_ref as dependency

    /* --- Add selected anime to list --- */
    async function handleClick(data) {
        try {
            await get_backend("/api/anime/add", data);
            setSelectedAnime(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <ul className="grid  grid-cols-[repeat(auto-fit,minmax(200px,1fr))] list-none gap-6 justify-start items-start overflow-auto transition-transform duration-300 ease-in-out cursor-grab">

            {/* Loading */}
            {loading && <>Loading...</>}

            {
                animes.map((anime, index) => {
                    return (<li key={anime.mal_id} className="rounded-md">

                        {/* Show pop-up message for adding anime to list */}
                        {selectedAnime && (
                            <div className="z-50 fixed inset-0 bg-black/50 flex items-center justify-center">
                                <div className="bg-zinc-900 p-6 rounded-lg w-96">
                                    <h2 className="text-xl mb-4 font-bold">Saved</h2>
                                    <p>
                                        <strong>{selectedAnime.title}</strong> added to list
                                    </p>

                                    <button className="mt-4 bg-red-600 px-4 py-2 rounded font-extrabold"
                                        onClick={() => setSelectedAnime(null)}
                                    >Close</button>
                                </div>
                            </div>
                        )}

                        {/* Anime Card */}
                        <figure className="md:w-full min-w-fit h-[300px] w-32 sm:w-48 relative">
                            <svg onClick={() => { handleClick({ animeId: anime.mal_id, title: anime.title, image: anime.images.jpg.image_url, total_episodes: anime.episodes, rating: anime.score }); }}
                                className="p-0.5 absolute left-[3px] top-[5px] cursor-pointer bg-zinc-800/70 rounded-2xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="32" height="32">
                                <path fill="white" fillRule="evenodd" d="M320 64 C461.4 64 576 178.6 576 320 C576 461.4 461.4 576 320 576 C178.6 576 64 461.4 64 320 C64 178.6 178.6 64 320 64 Z M320 128 C213.9 128 128 213.9 128 320 C128 426.1 213.9 512 320 512 C426.1 512 512 426.1 512 320 C512 213.9 426.1 128 320 128 Z M296 408 L296 344 L232 344 C218.7 344 208 333.3 208 320 C208 306.7 218.7 296 232 296 L296 296 L296 232 C296 218.7 306.7 208 320 208 C333.3 208 344 218.7 344 232 L344 296 L408 296 C421.3 296 432 306.7 432 320 C432 333.3 421.3 344 408 344 L344 344 L344 408 C344 421.3 333.3 432 320 432 C306.7 432 296 421.3 296 408 Z" />
                            </svg>
                            <img src={anime.images.jpg.image_url} className="w-full h-full object-cover rounded-t-[8px]" alt={anime.title} />
                            <div className="p-[3px] absolute right-[3px] top-[5px] bg-[rgba(43,42,42,0.75)] border border-[#2f2f2f] text-white rounded-[5px] text-sm">⭐ {anime.score ?? "N/A"}</div>
                        </figure>
                        <figcaption className="w-48 sm:w-48 md:w-full h-[30%] px-[5px] pt-[5px] pb-[10px]">
                            <p className="text-base font-extrabold">{anime.title}</p>
                        </figcaption>
                    </li>)
                })
            }

            {/* Show error if any */}
            {error !== null && <>{error}</>}
        </ul>
    )
}

export default AnimeCards