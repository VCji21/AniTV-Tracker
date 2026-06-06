import AnimeCards from "./AnimeCards"
 
const Explore = () => {
 
  return (
    <main className="p-10 bg-black">
        <section className="">
            <h2 className="px-[5px] py-[20px] font-extrabold text-2xl font-extrabold">Top Animes</h2>
            <AnimeCards api_ref={"/top/anime"} />
        </section>
    </main>
  )
}

export default Explore