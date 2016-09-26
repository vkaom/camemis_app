class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      //'tokenId': 'Pu0QUvj82xZ15AcO0PTe6L2EnOLNTB1QJaH'
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params, headers = null) {
    return this.xhr(route, params, headers, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, headers, verb) {
    //const host = 'https://raw.githubusercontent.com'
    //const url = `${host}${route}`
    //if(true){ return false; }
    const url = route;
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Object.assign(Api.headers(), headers);
    //console.log(options);
    return fetch(url, options)
      .then( resp => {
        //console.log(resp);
        let json = resp.json();
        if (resp.ok) {
          return json
        }
        return json.then(err => {throw err});
      })
      .then( json => json );
  }
}

export default Api
