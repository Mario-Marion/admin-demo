
import { defineStore } from 'pinia'
import XE from 'xe-utils'
import {
  TOGGLE_SLIDER,
  SET_TOKEN,
  SET_UNAME,
  SET_MENU_LIST,
  CLEAR_TOKEN_CNAME_MENU
} from "./constant";
import ls, { lStorage } from '@/plugin/ls';
import { staticRoutes } from '@/router/main'

const tokenLs = {
  setItem(key: string, state: string) {
    return ls.set("token", state, 48 * 60 * 60 * 1000)
  },
  getItem(key: string) {
    return ls.get("token");
  }
};


export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      slider: {
        opened: false,
      },
      token: "",
      menuList: <Mock.MenuObj[]>[],
      staticRoutes: staticRoutes,
      uname: "",
    }
  },
  actions: {
    [TOGGLE_SLIDER]() {
      this.slider.opened = !this.slider.opened;
    },
    [SET_TOKEN](token: string) {
      this.token = token;
    },
    [SET_UNAME](uname: string) {
      this.uname = uname;
    },
    [SET_MENU_LIST](menuList: Mock.MenuObj[]) {
      this.menuList = menuList;
    },
    [CLEAR_TOKEN_CNAME_MENU]() {
      this[SET_TOKEN]("")
      this[SET_UNAME]("")
      this[SET_MENU_LIST]([])
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: tokenLs as Storage,
        paths: ['token']
      },
      {
        storage: lStorage as Storage,
        paths: ["uname"]
      }
    ],
  },
})
