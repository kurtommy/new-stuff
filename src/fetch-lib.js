export class Fetch {
  constructor() {}

  get(url) {
    return this._fetch(url);
  }

  _fetch(url) {
     return fetch(url).then(this.handleResponse.bind(this))
  }

  handleResponse(response) {
    let contentType = response.headers.get('content-type')
    if (contentType.includes('application/json')) {
      return this.handleJSONResponse(response)
    } else if (contentType.includes('text/html')) {
      return this.handleTextResponse(response)
    } else {
      Promise.reject(`Sorry, content-type ${contentType} not supported`)
    }
  }

  handleJSONResponse(response) {
    return response.json()
      .then(json => {
        if (response.ok) {
          return json
        } else {
          return Promise.reject(Object.assign({}, json, {
            status: response.status,
            statusText: response.statusText
          }))
        }
      })
  }

  handleTextResponse(response) {
    return response.text()
      .then(text => {
        if (response.ok) {
          return json
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            err: text
          })
        }
      })
    }
}