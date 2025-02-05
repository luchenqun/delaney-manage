import { useEffect, useMemo, useState } from 'react';

export type IRoute = {
  name: string;
  key: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
  activeKey?: string;
};

export const routes: IRoute[] = [
  {
    name: '首页',
    key: 'dashboard',
    children: [
      {
        name: '数据看板',
        key: 'dashboard/workplace',
      },
      // {
      //   name: 'menu.dashboard.monitor',
      //   key: 'dashboard/monitor',
      //   requiredPermissions: [
      //     { resource: 'menu.dashboard.monitor', actions: ['write'] },
      //   ],
      // },
    ],
  },
  {
    name: '数据列表',
    key: 'list',
    children: [
      {
        name: '用户列表',
        key: 'list/user-table',
        children: [
          {
            ignore: true,
            name: '用户详情',
            key: 'list/user-detail',
            activeKey: 'list/user-table',
          },
        ],
      },
      {
        name: '质押列表',
        key: 'list/delegate-table',
        children: [
          {
            ignore: true,
            name: '质押详情',
            key: 'list/delegate-detail',
            activeKey: 'list/delegate-table',
          },
        ],
      },
      {
        name: '领取奖励列表',
        key: 'list/claim-table',
        children: [
          {
            ignore: true,
            name: '领取奖励详情',
            key: 'list/claim-detail',
            activeKey: 'list/claim-table',
          },
        ],
      },
      {
        name: '动态奖励列表',
        key: 'list/dynamics-table',
      },
      {
        name: '静态奖励列表',
        key: 'list/static-table',
      },
      {
        name: '消息列表',
        key: 'list/message-table',
      },
    ],
  },
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

export const generatePermission = (role: string) => {
  const actions = role === 'admin' ? ['*'] : ['read'];
  const result = {};
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};

const useRoute = (userPermission): [IRoute[], string] => {
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const visible = true;

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
  }, [JSON.stringify(userPermission)]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
