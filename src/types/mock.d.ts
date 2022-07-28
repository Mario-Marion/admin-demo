declare module "*"
declare namespace Mock {
  export interface MenuObj {
    parentId?: number;
    id?: number;
    name: string;
    url: string;
    type: number;
    icon: string;
    sort: number;
    children?: MenuObj[];
  }
  interface RUAttrs {
    id: number;
    name: string;
    status: number;
  }
  export interface RoleObj extends RUAttrs {
    menuList: MenuObj[];
  }
  export interface UserObj extends RUAttrs {
    username: string,
    password: string,
    roleId: number,
  }
}



