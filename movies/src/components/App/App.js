import "./App.css";
import React from "react";
import { Route, Switch, Router, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
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

function App() {
  const EMPTY = "Введите запрос";
  const ERROR =
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
  const EMPTY_RESULT = "Ничего не найдено, попробуйте изменить запрос.";
  //const history = createBrowserHistory();
  const history = useHistory();
  const [isEditMenuOpen, setEditMenuOpen] = React.useState(false);
  const [searchErr, setSearchErr] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [movies, setMovies] = React.useState("");
  const [shortMovie, setShortMovie] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const savedMoviesStorage = JSON.parse(localStorage.getItem("savedMovies"));
  const [savedMovies, setSavedMovies] = React.useState(savedMoviesStorage);
  const { handleChange, errors, values, isValid } = Validation();
  const [submitErr, setSubmitErr] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(true);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    } else {
      setLoggedIn(false);
       history.push('/signin');
    }
  }, [history]);

  React.useEffect(() => {}, [loggedIn]);

  function handleMenuClick() {
    setEditMenuOpen(true);
  }

  function closeMenu() {
    setEditMenuOpen(false);
  }

  function checkShortMovie(e) {
    e.target.checked ? setShortMovie(true) : setShortMovie(false);
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
          localStorage.setItem("foundedMovies", JSON.stringify(data));
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
      localStorage.setItem("storedMovies", JSON.stringify(foundMovies));
      setMovies(foundMovies);
      resolve();
    });
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
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setSubmitErr(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        history.push('/movies');
      });
  };

  function handleRegister(data) {
    mainApi
      .register(data.name, data.email, data.password)
      .then(() => {
        handleLogin(data);
        setCurrentUser(data.name);
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
                const newMovies = savedMovies.filter(
                  (m) => m._id !== movieId._id
                );
                localStorage.setItem("savedMovies", JSON.stringify(newMovies));
                const movies = JSON.parse(localStorage.getItem("savedMovies"));
                setSavedMovies(movies);
                setIsLiked(false);
              });
            }
          );
        })

        .catch((err) => console.log(err));
    } else {
      setIsLiked(true);
      mainApi
        .saveMovie(movie)
        .then(() => {
          mainApi.getSavedMovies().then((res) => {
            localStorage.setItem("savedMovies", JSON.stringify(res));
            const movies = JSON.parse(localStorage.getItem("savedMovies"));
            setSavedMovies(movies);
            setIsLiked(true);
          });
        })
        .catch((err) => console.log(err));
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
    setLoading(true);
    setSearchErr("");
    setSavedMovies(savedMoviesStorage);
    mainApi
      .getSavedMovies()
      .then((data) => {
        if (searchValue === "") {
          throw new Error(EMPTY);
        }
        if (!data) {
          throw new Error(ERROR);
        }

        const foundedData = data.filter((item) =>
          item.nameRU.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (foundedData.length === 0) {
          throw new Error(EMPTY_RESULT);
        }

        setSavedMovies(foundedData);
      })

      .catch((err) => {
        console.log(err);
        setSearchErr(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
    history.push("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
          <Switch>
            <Route exact path="/">
              {loggedIn ? (
                <Header onEditMenu={handleMenuClick} />
              ) : (
                <HeaderLanding />
              )}
              <Main isLoggedIn={loggedIn} />
              <Footer />
            </Route>

            <Route path="/signup">
              <Register
                Reg={handleRegister}
                handleChange={handleChange}
                submitErr={submitErr}
                errors={errors}
                loading={loading}
                values={values}
                isValid={isValid}
              />
            </Route>

            <Route path="/signin">
              <Login
                Log={handleLogin}
                handleChange={handleChange}
                loading={loading}
                submitErr={submitErr}
                errors={errors}
                values={values}
                isValid={isValid}
              />
            </Route>

            <ProtectedRoute path="/movies" loggedIn={loggedIn}>
              <Header onEditMenu={handleMenuClick} />
              <Movies
                loggedIn={loggedIn}
                onSubmit={handleSearchMovies}
                searchErr={searchErr}
                searchValue={searchValue}
                movies={movies}
                onChange={handleSearchInput}
                handleCheck={checkShortMovie}
                shortMovie={shortMovie}
                loading={loading}
                saveMovie={handleSaveMovie}
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
                onChange={handleSearchInput}
                searchValue={searchValue}
                shortMovie={shortMovie}
                searchErr={searchErr}
                loggedIn={loggedIn}
              />
              <Footer />
              <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
            </ProtectedRoute>

            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <Header onEditMenu={handleMenuClick} />
              <Profile
                onSubmit={handleEditProfile}
                handleChange={handleChange}
                loggedIn={loggedIn}
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
