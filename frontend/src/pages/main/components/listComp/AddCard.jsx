import { useState, useEffect, useMemo } from "react";
import { get_backend_data, update_backend, delete_from_backend } from "../../../../service/api";
import { useNavigate } from "react-router-dom";
import Empty from "./Empty";

// Set constraints
const STATUS_RULES = {
  "Plan to Watch": {
    progress: () => 0,
    rating: () => 0,
  },
  "Completed": {
    progress: (total) => total,
  },
};

const AddCard = ({ statusCat }) => {
  const navigate = useNavigate();

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const res = await get_backend_data("/api/anime/mylist");
        setAnimes(res.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  /* ---------------- FILTER BY STATUS ---------------- */
  const filteredAnimes = useMemo(() => {
    if (statusCat === "All") return animes;
    return animes.filter((a) => a.status === statusCat);
  }, [animes, statusCat]);

  /* ---------------- OPEN EDIT MODAL ---------------- */
  const handleClick = (anime) => {
    setData(anime);
    setStatus(anime.status);
    setProgress(anime.episode_progress);
    setRating(anime.rating ?? 0);
    setOpen(true);
  };

  /* ---------------- PROGRESS HANDLERS ---------------- */
  const addProgress = () => {
    if (STATUS_RULES[status]?.progress)
      return setProgress(STATUS_RULES[status].progress(data.total_episodes));

    setProgress((p) => Math.min(p + 1, data.total_episodes));
  };

  const minusProgress = () => {
    if (STATUS_RULES[status]?.progress)
      return setProgress(STATUS_RULES[status].progress(data.total_episodes));

    setProgress((p) => Math.max(p - 1, 0));
  };

  /* ---------------- RATING HANDLERS ---------------- */
  const addRating = () => {
    if (STATUS_RULES[status]?.rating)
      return setRating(STATUS_RULES[status].rating());

    setRating((r) => Math.min(r + 0.5, 10));
  };

  const minusRating = () => {
    if (STATUS_RULES[status]?.rating)
      return setRating(STATUS_RULES[status].rating());

    setRating((r) => Math.max(r - 0.5, 0));
  };

  /* ---------------- Instant Rendering ---------------- */
  useEffect(() => {
    addProgress()
    minusProgress()
    addRating()
    minusRating()
  }, [STATUS_RULES[status]])

  /* ---------------- SAVE ---------------- */
  const saveData = async () => {
    try {
      const res = await update_backend("/api/anime/update", {
        animeId: data.animeId,
        status,
        progress,
        rating,
      });

      alert(res.message);
      navigate("/list", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteAnime = async (data) => {
    try {
      const res = await delete_from_backend(`/api/anime/remove/${data.animeId}`);
      alert(res.message);
      navigate("/list", {replace: true});
    } catch (err) {
      console.error(err)
    }
  }

  /* ---------------- RENDER ---------------- */
  if (loading) return <div className="w-48 bg-zinc-700">Loading...</div>;
  if (error) return <>{error}</>;

  return (
    <>
      {!open && filteredAnimes.length === 0 && (
        <div className="h-[70vh] w-full">
          <Empty />
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {open && (
        <div className="m-4 z-50 p-4 bg-zinc-900 rounded-md">
          <div className="flex">
            <img
              src={data.image}
              alt={data.title}
              className="w-24 rounded-md"
            />
            <div className="p-4 text-lg font-extrabold">{data.title}</div>
          </div>

          {/* ---------------- STATUS ---------------- */}
          <div className="pt-4">
            <div className="text-xl font-bold">Status</div>
            <select
              className="mt-2 px-4 py-2 bg-zinc-900 border border-zinc-500 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Plan to Watch</option>
              <option>Watching</option>
              <option>Completed</option>
              <option>On Hold</option>
              <option>Dropped</option>
            </select>
          </div>

          {/* ---------------- EPISODES ---------------- */}
          <div className="pt-4">
            <div className="text-xl font-bold">Episodes Watched</div>
            <div className="flex gap-4 items-center p-2">
              <button onClick={minusProgress} className="bg-zinc-800/70 rounded-full p-1 hover:bg-zinc-700 border border-zinc-600">
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
                  <path fill="white" d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/>
                </svg>
              </button>
              <span>
                {progress} / {data.total_episodes}
              </span>
              <button onClick={addProgress} className="bg-zinc-800/70 rounded-full p-1 hover:bg-zinc-700 border border-zinc-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
                  <path fill="white" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ---------------- RATING ---------------- */}
          <div className="pt-4">
            <div className="text-xl font-bold">Rating</div>
            <div className="flex gap-4 items-center p-2">
              <button onClick={minusRating} className="bg-zinc-800/70 rounded-full p-1 hover:bg-zinc-700 border border-zinc-600">
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
                  <path fill="white" d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/>
                </svg>
              </button>
              <span>⭐ {rating}</span>
              <button onClick={addRating} className="bg-zinc-800/70 rounded-full p-1 hover:bg-zinc-700 border border-zinc-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
                  <path fill="white" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ---------------- Buttons ---------------- */}
          <div className="flex gap-4 mt-4">
            <button onClick={saveData}
              className="px-4 py-1 bg-blue-500 rounded-md font-bold"
            >
              Save
            </button>
            <button onClick={() => setOpen(false)}
              className="px-4 py-1 bg-red-500 rounded-md font-bold"
            >
              Cancel
            </button>
            <button onClick={() => {deleteAnime({animeId: data.animeId})}} 
              className="ml-2 py-1 px-4 bg-red-500 rounded-md border border-zinc-500 font-bold"
            >
              Delete
            </button> 
          </div>
        </div>
      )}

      {/* ---------------- LIST ---------------- */}
      <ul className="flex flex-wrap gap-6">
        {!open &&
          filteredAnimes.map((anime) => (
            <li key={anime.animeId}
              className="w-48 bg-zinc-900 flex flex-col"
            >
              <div className="relative w-full h-[16em]">
                <img className="h-full w-full" src={anime.image} alt={anime.title} />
                <button onClick={() => handleClick(anime)}
                  className="absolute top-2 left-2 bg-zinc-800 p-1 rounded"
                >
                  <svg className="z-10 p-1 absolute left-[3px] top-[5px] cursor-pointer bg-zinc-800/80 rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                      <path fill="white" d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"/>
                  </svg>
                </button>
              </div>

              <div className="p-2">
                <div className="text-lg font-bold">{anime.title}</div>
                <div>⭐ {anime.rating ?? "N/A"}</div>
                <div className="text-red-500 font-bold">{anime.status}</div>
                <div>
                  {anime.episode_progress} / {anime.total_episodes}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default AddCard;