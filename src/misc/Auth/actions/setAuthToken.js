import store from 'store';

export default (token) => {
  store.set('token', `bearer ${token}`)
  return {
    type:'AUTH/SET_AUTH_TOKEN',
    payload: token
  }
}