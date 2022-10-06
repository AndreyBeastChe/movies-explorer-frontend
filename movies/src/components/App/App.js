import "./App.css";
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
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

function App() {
  const [isEditMenuOpen, setEditMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setEditMenuOpen(true);
  }

  function closeMenu() {
    setEditMenuOpen(false);
  }

  return (
    <div className="page">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HeaderLanding />
            <Main />
            <Footer />
          </Route>

          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="/movies">
            <Header onEditMenu={handleMenuClick} />
            <Movies />
            <Footer />
            <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
          </Route>

          <Route path="/saved-movies">
            <Header onEditMenu={handleMenuClick} />
            <SavedMovies />
            <Footer />
            <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
          </Route>

          <Route path="/profile">
            <Header onEditMenu={handleMenuClick} />
            <Profile />
            <Navigation isOpen={isEditMenuOpen} onClose={closeMenu} />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
