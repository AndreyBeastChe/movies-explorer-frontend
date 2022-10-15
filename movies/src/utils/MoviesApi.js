class Api {
    constructor(options){
        this._url = options.url;
        this._headers = options.headers;
    }

    checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      }

    getMovies() {
        return fetch(`${this._url}`, {
            headers: {
              "Content-Type": "application/json",
          }, 
          }).then(this.checkResponse);
      };

}


const movieApi = new Api({
    url: "https://api.nomoreparties.co/beatfilm-movies/"
  });
  
  export default movieApi;
















