import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

const savedMovies = [
  {
    _id: "1",
    image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
  {
    _id: "2",
    image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
  {
    _id: "3",
    image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
  {
    _id: "4",
    image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
];

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList movies={savedMovies} isSavedMovie={true} />
    </>
  );
}

export default SavedMovies;
