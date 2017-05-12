import { Fetch } from './fetch-lib.js';

const f = new Fetch();
let gitHubFeed = [];

  f.get('https://api.github.com/users/kurtommy/repos')
    .then((response) => {
      gitHubFeed = response.map((item) => item.full_name)
      console.info(response);
      console.info(gitHubFeed);
    }, (error) => {
      console.error(error);
    })


  // let await ret = f.get('https://api.github.com/users/kurtommy/repos')

  async function getFBGithubFeed() {
    let resp = await f.get('https://api.github.com/users/facebook/repos')
    console.info(resp.map(item => item.full_name));
    console.info('the code here have to wait the await');
  }

  getFBGithubFeed()
  console.info('this code is not blocked by the async call');