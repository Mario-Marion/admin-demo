/**
 * @description: 权限成员列表查询
 * @param {sLimit:显示数目, sPage:页数, sList:成员列表}
 * @return {*}
 */
type Slist = Mock.RoleObj[] | Mock.UserObj[];
const searchList = (sLimit: number, sPage: number, slist: Slist) => {
  type res = {
    total: number,
    page: number,
    limit: number,
    list: Slist
  }
  const res: res = {
    total: slist.length,
    page: sPage * 1,
    limit: sLimit * 1,
    list: slist.slice((sPage - 1) * sLimit, (sPage - 1) * sLimit + sLimit)
  };
  return {
    message: "查询成功!",
    status: 200,
    data: res,
  };
};
/**
 * @param {parentId:父级Id, id:自身id, name:菜单名, url:路径,组件路径,路由路径setting-Roles}
 * @param {type:[1 是一级菜单, 2是二级菜单, 3是权限], icon: 小图标, sort: 排序}
 */
const menuList: Mock.MenuObj[] = [
  {
    // parentId: -1,
    id: 100,
    name: "系统设置",
    url: "",
    menu: "",
    type: 0,
    icon: "Setting",
    sort: 1,
  },
  {
    parentId: 100,
    id: 1,
    name: "用户管理",
    url: "setting/Users",
    menu: "",
    type: 1,
    icon: "UserFilled",
    sort: 1,
  },
  {
    parentId: 100,
    id: 11,
    name: "角色管理",
    url: "setting/Roles",
    menu: "",
    type: 1,
    icon: "HelpFilled",
    sort: 2,
  },
  {
    // parentId: -1,
    id: 110,
    name: "PRACTICE",
    url: "",
    menu: "",
    type: 0,
    icon: "CollectionTag",
    sort: 0,
  },
  // {
  //   parentId: 110,
  //   id: 18,
  //   name: "TODOS",
  //   url: "praction/Todos",
  //   menu: "",
  //   type: 1,
  //   icon: "EditPen",
  //   sort: 1,
  // }
];
const userList: Mock.UserObj[] = [
  {
    id: -1,
    name: "参苓白术丸",
    username: "Administrator",
    password: "123456",
    roleId: -1, // 关联 roleList 表 Id
    status: 1,
  },
  {
    id: 0,
    name: "七步断肠散",
    username: "admin",
    password: "123456",
    roleId: 0,
    status: 1,
  },
];
const roleList: Mock.RoleObj[] = [
  {
    id: -1,
    name: "super",
    status: 1,
    menuList: menuList,
  },
  {
    id: 0,
    name: "ceshi",
    status: 0,
    menuList: menuList,
  },
];
type user = {
  menus: Mock.MenuObj[];
  [propName: string]: number | string | Mock.MenuObj[]
}
const user: user = {
  name: "",
  userId: "",
  roleId: "",
  menus: []
};

export default {
  users: {
    url: "/user/users",
    type: "post",
    mock: true,
    response: (opt: any) => {
      const {
        body: { role, limit, page },
      } = opt;
      const list = userList.filter((item) => item.roleId + "" === role + "");
      return searchList(limit, page, list);
    },
  },
  roles: {
    url: "/role/roles",
    type: "post",
    mock: true,
    response: (opt: any) => {
      const { body } = opt;
      const { limit, page } = JSON.parse(body);
      return searchList(limit, page, roleList);
    },
  },
  roleMenuList: {
    url: "/role/menu",
    type: "get",
    response: () => {
      const role = roleList.find((item) => item.id == user.roleId);
      if (role) user.menus = role.menuList
      return {
        message: "查询成功!",
        status: 200,
        data: user.menus,
      };
    },
  },
  login: {
    url: "/user/login",
    type: "post",
    response: (opt: any) => {
      const { body } = opt;
      const { username, password } = JSON.parse(body);
      type loginRs = {
        token?: number
        name?: string
        status: number
        message: string
      }
      user.name = username;
      let _user = userList.find((item) => item.username == user.name);
      let data: loginRs = {
        status: 200,
        message: "登录成功!",
        token: new Date().getTime(),
        name: _user?.name,
      };
      if (!_user) {
        data = {
          status: 500,
          message: "账户不存在",
        };
      } else {
        if (_user.password !== password) {
          data = {
            status: 500,
            message: "密码错误",
          };
        } else {
          if (_user.status == 0) {
            data = {
              status: 500,
              message: "账户停用",
            };
          } else {
            user.userId = _user.id;
            user.roleId = _user.roleId;
          }
        }
      }
      return {
        status: data.status,
        data
      };
    },
  },
}
