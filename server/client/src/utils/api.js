import axios from 'axios';

const baseUrl = 'http://localhost:4000';


export const signUpApi = (user) => {
    return axios({
        method: 'post', //we can set what request we want to be
        url: `${baseUrl}/api/signup`,
        data: user,
      }) 
        .then(res => res)
        .catch(err => err.response)
};


export const signInApi = (user) => {
    return axios({
        method: 'post', //we can set what request we want to be
        url: `${baseUrl}/api/signin`,
        data: user,
      }) 
        .then(res => res)
        .catch(err => err.response)
};

export const signOutApi = (token) => {
    return axios({
        method: 'get', //we can set what request we want to be
        url: `${baseUrl}/api/signout`,
        headers: {
          Authorization: token
        }
      })    
        .then(res => res)
        .catch(err => err.response)
};



// export const signUpApi = (user) => {
//     return axios.post(`${baseUrl}/api/signup`, user)
//         .then(res => res)
//         .catch(err => err.response)
// }


// export const signInApi = (user) => {
//     return axios.post(`${baseUrl}/api/signin`, user)
//         .then(res => res)
//         .catch(err => err.response)
// }


// export const signOutApi = (token) => {
//     return axios.get(`${baseUrl}/api/signout`, {
//         headers: {
//             Authorization: token
//         }
//     })
//         .then(res => res)
//         .catch(err => err.response)
// }


// export const signUpApi = (user) => {
//     return axios.post('/api/signup', user)
//         .then(res => res)
//         .catch(err => err.response.data)
// }



