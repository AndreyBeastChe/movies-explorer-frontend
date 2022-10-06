import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import MoreResuls from "./MoreResuls/MoreResuls";


const movies = [
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
{
  _id: "5",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},
{
  _id: "6",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},
{
  _id: "7",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},
{
  _id: "8",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},
{
  _id: "9",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},
{
  _id: "10",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},
{
  _id: "11",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},
{
  _id: "12",
  image:
      "https://sun9-86.userapi.com/impf/c857416/v857416114/fd627/MzqHxY4rpBo.jpg?size=0x0&quality=90&proxy=1&sign=b8ff5b7db2c87c97e2b87afb5b1bf381&c_uniq_tag=9Kmzx3AbVPmNAI92RGjz_MVLzqSXJdfvP8aTcgh-7ZA&type=video_thumb",
  title: "33 слова о дизайне",
  duration: "1ч 47м",
},

];

function Movies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList movies={movies} />
      <MoreResuls />
    </>
  );
}

export default Movies;