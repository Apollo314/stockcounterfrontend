import { RouteLocationRaw } from 'vue-router';

export type MenuItem = {
  title: string;
  to?: RouteLocationRaw;
  icon?: string;
  bgColor?: string;
  expandedIcon?: string;
  iconColor?: string;
  children?: MenuItem[];
  caption?: string;
  parent?: MenuItem;
  defaultClosed?: boolean;
  shrinkable?: boolean;
};

export type FilterableMenuItem = Omit<MenuItem, 'children' | 'parent'> & {
  visible?: boolean;
  children?: FilterableMenuItem[];
  parent?: FilterableMenuItem;
};
