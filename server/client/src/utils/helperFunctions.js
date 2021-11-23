export function setToken(userToken) {
   return sessionStorage.setItem('token', userToken);
//    sessionStorage.setItem('user', userToken);
}

export function getToken() {
    return sessionStorage.getItem('token');
};