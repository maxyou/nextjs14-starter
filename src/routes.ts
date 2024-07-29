// routes.ts

export const ROUTES = {
  user: {
    edit: '/pages/user-edit',
  },
  account: {
    register: '/pages/account/register',
    login: '/pages/account/login',
  },
  home: '/',
  api: {
    userLogin: '/api/account/login',
    userRegister: '/api/account/register',
    userLogout: '/api/account/logout',
    user: '/api/user',
  },
  // 其他路由和API端点
} as const;

// 定义类型
type Routes = typeof ROUTES;
export type RouteKeys = keyof Routes;