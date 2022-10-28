class Api {
    constructor(options){
        this._url = options.url;
        this._headers = options.headers;
    }

    checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      }

     register = (name, email, password) => {
        return fetch(`${this._url}/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }).then(this.checkResponse);
      };


      login = (email, password) => {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then((res) => {
            if (res.status === 401) {
              console.log('Нет пользователя с таким email')
            }
          if (!res.ok) {
              return Promise.reject(`${res.status}`);
          }
          return res.json()
        })
        .then((res) => {
          return res
        })
      }
      

    checkToken = (jwt) => {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          }
        })
          .then(this.checkResponse)
      }

      updateProfile = (name, email) => {
        return fetch(`${this._url}/users/me`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
          body: JSON.stringify({
            name: name,
            email: email,
          })
        }).then(this.checkResponse);
      };

      saveMovie(movie) {

        const {
          country,
          director,
          duration,
          year,
          description,
          trailer = movie.trailerLink,
          nameRU,
          nameEN,
          movieId = movie.id,
        } = movie;
      
        const image = `http://api.nomoreparties.co/${movie.image?.url}`;
        const thumbnail = `http://api.nomoreparties.co/${movie.image?.formats.thumbnail.url}`;

      
        return fetch(`${this._url}/movies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            thumbnail,
            movieId,
            nameRU,
            nameEN,
          }),
        }).then(this.checkResponse);
      };

    deleteMovie(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }).then(this.checkResponse);
    }


    getSavedMovies ()  {
        return fetch(`${this._url}/movies`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }).then(this.checkResponse);
      };


}

const mainApi = new Api({
    url: "https://api.movies.nomoredomains.sbs"
  });
  
  export default mainApi;
