import "./App.css";
import React from "react";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import HeaderLanding from "../Header/HeaderLanding/HeaderLanding";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import movieApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Validation from "../../utils/Validation";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { EMPTY, ERROR, EMPTY_RESULT } from "../../utils/consts";
function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const location = useLocation().pathname;
  const [isEditMenuOpen, setEditMenuOpen] = React.useState(false);
  const [searchErr, setSearchErr] = React.useState("");
  const searchValueStorage = localStorage.getItem("searchValue");
  const [searchValue, setSearchValue] = React.useState(searchValueStorage);
  const [searchValueSavedMovie, setsearchValueSavedMovie] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const moviesStorage = JSON.parse(localStorage.getItem("storedMovies"));
  const [movies, setMovies] = React.useState(moviesStorage);
  const savedMoviesStorage = JSON.parse(localStorage.getItem("savedMovies"));
  const [savedMovies, setSavedMovies] = React.useState(savedMoviesStorage);
  const searchFilterStorage = JSON.parse(localStorage.getItem("shortFilter"));
  const [shortMovie, setShortMovie] = React.useState(searchFilterStorage);
  const [shortMovieSavedMovie, setShortMovieSavedMovie] = React.useState(false);
  const { handleChange, errors, values, isValid } = Validation();
  const [submitErr, setSubmitErr] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const REG =
    /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:?#[\]@!$&'()*+,;=]+)/;

  const [checkbox, setCheckbox] = React.useState(false);

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push(location);
        })
        .catch((res) => {
          setLoggedIn(false);
          localStorage.removeItem("jwt");
          localStorage.removeItem("savedMovies");
          localStorage.removeItem("foundedMovies");
          localStorage.removeItem("storedMovies");
          localStorage.removeItem("searchValue");
          localStorage.removeItem("shortFilter");
        });
    }
  }

  React.useEffect(() => {
    setSearchErr("");
    setSavedMovies(savedMoviesStorage)
  }, [location]);

  React.useEffect(() => {
    handleCheckToken();
  }, [history]);

  function handleMenuClick() {
    setEditMenuOpen(true);
  }

  function closeMenu() {
    setEditMenuOpen(false);
  }

  function checkShortMovie(e) {
    if (e.target.checked) {
      setCheckbox(true);
    } else {
      setCheckbox(false);
    }
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    setLoading(true);
    setSearchErr("");
    setMovies([]);

    if (localStorage.getItem("foundedMovies") === null) {
      movieApi
        .getMovies()
        .then((data) => {
          data.forEach((item) => {
            if (item.trailerLink.match(REG) === null) {
              item.trailerLink = "https://www.youtube.com/watch?v=5BZLz21ZS_Y";
            }
          });
          localStorage.setItem("foundedMovies", JSON.stringify(data));
          localStorage.setItem("searchValue", searchValue);
          localStorage.setItem("storedMovies", JSON.stringify(data));
          if (checkbox) {
            localStorage.setItem("shortFilter", true);
            setShortMovie(true);
          } else {
            localStorage.setItem("shortFilter", false);
            setShortMovie(true);
          }

          findMovie(data)
            .then(() => {})
            .catch((err) => {
              setSearchErr(err);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((err) => {
          setSearchErr(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      findMovie(JSON.parse(localStorage.getItem("foundedMovies")))
        .then(() => {})
        .catch((err) => {
          setSearchErr(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function findMovie(allMovies) {
    return new Promise((resolve, reject) => {
      if (searchValue === "") {
        return reject(EMPTY);
      }
      if (!allMovies) {
        return reject(ERROR);
      }
      const foundMovies = allMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (foundMovies.length === 0) {
        reject(EMPTY_RESULT);
      }
      setMovies(foundMovies);
      localStorage.setItem("storedMovies", JSON.stringify(foundMovies));
      localStorage.setItem("searchValue", searchValue);
      if (checkbox) {
        localStorage.setItem("shortFilter", true);
        setShortMovie(true);
      } else {
        localStorage.setItem("shortFilter", false);
        setShortMovie(false);
      }
      resolve();
    });
  }

 
  function  handleSearchInputSave(e) {
    const { value } = e.target;
    setsearchValueSavedMovie(value);
  }


  function handleSearchInput(e) {
    const { value } = e.target;
    setSearchValue(value);
  }

  const handleLogin = (data) => {
    mainApi
      .login(data.email, data.password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setCurrentUser(data.username);
          localStorage.setItem("jwt", res.token);
          history.push("/movies");
        }
      })
      .then(() => {
        mainApi.getSavedMovies().then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
        });
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setSubmitErr(err);
        setLoading(false);
        console.log(err);
      });
  };

  function handleRegister(data) {
    mainApi
      .register(data.name, data.email, data.password)
      .then(() => {
        setLoggedIn(true);
        handleLogin(data);
        setCurrentUser(data.name);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setSubmitErr(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSaveMovie(movie, isLiked, setIsLiked) {
    if (isLiked) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          console.log(res);
          Promise.resolve(res.find((i) => i.movieId === movie.id)).then(
            (movieId) => {
              mainApi.deleteMovie(movieId._id).then(() => {
                const moviesUpdated = savedMovies.filter(
                  (m) => m._id !== movieId._id
                );
                localStorage.setItem(
                  "savedMovies",
                  JSON.stringify(moviesUpdated)
                );
                const movies = JSON.parse(localStorage.getItem("savedMovies"));
                setSavedMovies(movies);
                setIsLiked(false);
              });
            }
          );
        })

        .catch((err) => console.log(err));
    } else {
      mainApi
        .saveMovie(movie)
        .then((res) => {
            console.log(res)
          const movies = JSON.parse(localStorage.getItem("savedMovies"));
          movies.push(res);
          localStorage.setItem("savedMovies", JSON.stringify(movies));
          setSavedMovies(movies);
          console.log(movies);
          setIsLiked(true);
        })
        .catch(() => setIsLiked(false));
    }
  }

  const handleDeleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        const newMovies = savedMovies.filter((m) => m._id !== movie._id);
        localStorage.setItem("savedMovies", JSON.stringify(newMovies));
        const movies = JSON.parse(localStorage.getItem("savedMovies"));
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  };

  function handleSearchSavedMovies(e) {
    e.preventDefault();
    setSearchErr("");
    const movies = JSON.parse(localStorage.getItem("savedMovies"));
    const foundedData = movies.filter((item) =>
      item.nameRU.toLowerCase().includes(searchValueSavedMovie.toLowerCase())
    );
    if (searchValueSavedMovie === "") {
      setSearchErr(EMPTY);
       return
    }
    if (foundedData.length === 0) {
      setSearchErr(EMPTY_RESULT);
    }

    setSavedMovies(foundedData);

    if (checkbox) {
      setShortMovieSavedMovie(true);
    } else {
      setShortMovieSavedMovie(false);
    }
  }

  function handleEditProfile(data, setIsEditable) {
    mainApi
      .updateProfile(data.name, data.email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        setSubmitErr(err.status);
      })
      .finally(() => {
        setLoading(false);
        setIsEditable(false);
      });
  }

  function handleSignOut(e) {
    e.preventDefault();
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("foundedMovies");
    localStorage.removeItem("storedMovies");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("shortFilter");
    history.push("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          {loggedIn ? (
            <Header onEditMenu={handleMenuClick} />
          ) : (
            <HeaderLanding />
          )}
          <Main />
          <Footer />
          <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
        </Route>

        <Route path="/signup">
          {loggedIn ? (
            <Redirect to="./" />
          ) : (
            <Register
              Reg={handleRegister}
              handleChange={handleChange}
              submitErr={submitErr}
              errors={errors}
              loading={loading}
              values={values}
              isValid={isValid}
            />
          )}
        </Route>

        <Route path="/signin">
          {loggedIn ? (
            <Redirect to="./" />
          ) : (
            <Login
              Log={handleLogin}
              handleChange={handleChange}
              loading={loading}
              submitErr={submitErr}
              errors={errors}
              values={values}
              isValid={isValid}
            />
          )}
        </Route>

        <ProtectedRoute path="/movies" loggedIn={loggedIn}>
          <Header onEditMenu={handleMenuClick} />
          <Movies
            onSubmit={handleSearchMovies}
            searchErr={searchErr}
            searchValue={searchValue}
            movies={movies}
            onChange={handleSearchInput}
            handleCheck={checkShortMovie}
            shortMovie={shortMovie}
            loading={loading}
            addsaveMovie={handleSaveMovie}
          />
          <Footer />
          <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
        </ProtectedRoute>

        <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
          <Header onEditMenu={handleMenuClick} />
          <SavedMovies
            handleCheck={checkShortMovie}
            savedMovies={savedMovies}
            onSubmit={handleSearchSavedMovies}
            deleteMovie={handleDeleteMovie}
            onChange={handleSearchInputSave}
            searchValue={searchValueSavedMovie}
            shortMovie={shortMovieSavedMovie}
            searchErr={searchErr}
          />
          <Footer />
          <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" loggedIn={loggedIn}>
          <Header onEditMenu={handleMenuClick} />
          <Profile
            loggedIn={!loggedIn}
            onSubmit={handleEditProfile}
            handleChange={handleChange}
            submitErr={submitErr}
            signOut={handleSignOut}
            values={values}
            loading={loading}
            isValid={isValid}
            errors={errors}
          />
          <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
        </ProtectedRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
