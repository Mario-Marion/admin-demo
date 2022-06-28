
import { defineStore } from 'pinia'
import { ADD_MENULIST, TOGGLE_SLIDER } from "./constant";
import type { RouteRecordName } from "vue-router";

export interface MenuObj { id: number, name: RouteRecordName, icon: string }
export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      slider: {
        opened: true,
      },
      menuList: <MenuObj[]>[],
    }
  },
  actions: {
    [ADD_MENULIST](arr: MenuObj[]) {
      this.menuList = arr
    },
    [TOGGLE_SLIDER]() {
      this.slider.opened = !this.slider.opened;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ["slider"]
      },
    ],
  },
})
