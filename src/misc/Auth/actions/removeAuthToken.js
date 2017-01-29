import store from 'store';

export default () => {
  store.remove('token')
  return {
    type:'AUTH/REMOVE_AUTH_TOKEN',
  }
}