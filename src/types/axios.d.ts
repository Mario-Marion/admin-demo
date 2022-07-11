declare namespace Axios {
  export interface SearchParams {
    sVal?: string;
    sStu?: number,
    limit: number,
    page: number
  }
  interface Return<T> {
    status: number;
    message: string;
    data: T;
  }


  interface RolesReturn extends Return<RolesData> { }
  interface RolesData {
    total: number;
    page: number;
    limit: number;
    list: List[];
  }
  interface RolesList {
    id: number;
    name: string;
    status: number;
  }
}
