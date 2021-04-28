  
import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://api.github.com',
  // clientId: 'ebda7ce10472fa896df7',
  // headers: {
  //   'Authorization': `token fb8c6029735f137e939a17417a5dd7f3f8661670`
  // }
  // clientSecret: 'fb8c6029735f137e939a17417a5dd7f3f8661670'
});

export const apiParams = {
  clientId: 'ebda7ce10472fa896df7',
  clientSecret: 'fb8c6029735f137e939a17417a5dd7f3f8661670'
}