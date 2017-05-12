(function () {
'use strict';

class Fetch {
  constructor() {}

  get(url) {
    return this._fetch(url);
  }

  _fetch(url) {
     return fetch(url).then(this.handleResponse.bind(this))
  }

  handleResponse(response) {
    let contentType = response.headers.get('content-type');
    if (contentType.includes('application/json')) {
      return this.handleJSONResponse(response)
    } else if (contentType.includes('text/html')) {
      return this.handleTextResponse(response)
    } else {
      Promise.reject(`Sorry, content-type ${contentType} not supported`);
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

function unusedFn() {
  console.log('LOL');
}

unusedFn();

const f = new Fetch();
let gitHubFeed = [];

  f.get('https://api.github.com/users/kurtommy/repos')
    .then((response) => {
      gitHubFeed = response.map((item) => item.full_name);
      console.info(response);
      console.info(gitHubFeed);
    }, (error) => {
      console.error(error);
    });


  // let await ret = f.get('https://api.github.com/users/kurtommy/repos')

  async function getFBGithubFeed() {
    let resp = await f.get('https://api.github.com/users/facebook/repos');
    console.info(resp.map(item => item.full_name));
    console.info('the code here have to wait the await');
  }

  getFBGithubFeed();
  console.info('this code is not blocked by the async call');

}());
