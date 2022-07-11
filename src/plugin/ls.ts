import Storage from 'vue-ls';
const options = {
  // namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

const { ls } = Storage.useStorage(options)

export const lStorage = {
  setItem(key: string, state: string) {
    return ls.set(key, state)
  },
  getItem(key: string) {
    return ls.get(key);
  }
};

export default ls