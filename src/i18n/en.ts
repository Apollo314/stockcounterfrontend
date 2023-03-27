/*eslint sort-keys: "error"*/

import { ItemOut } from 'src/client';

const itemLabels: Record<keyof ItemOut, string> = {
  barcode: 'Barcode',
  buycurrency: 'Buy currency',
  buyprice: 'Buy price',
  category: 'Category',
  created_at: 'Created at',
  created_by: 'Created by',
  description: 'Description',
  id: 'ID',
  kdv: 'Tax(KDV)',
  name: 'Item/Service name',
  sellcurrency: 'Sell currency',
  sellprice: 'Sell crice',
  stock_code: 'Stock code',
  stock_unit: 'Stock unit',
  stocks: 'Stocks',
  thumbnail: 'Thumbnail',
  updated_at: 'Updated at',
  updated_by: 'Updated by',
};

export default {
  appName: 'Stock Counter',
  buttons: {
    back: 'Back',
    forgotmypassword: 'Forgot my password',
    login: 'Log in',
  },
  commons: {
    fields: {
      created_at: 'Create Date',
      created_by: 'Created By',
      updated_at: 'Update Date',
      updated_by: 'Updated By',
    },
    new: 'New @:{0}',
    'no-result': 'No Result',
    percentage: '{0}%',
    search: 'Search',
  },
  failed: 'Action failed',
  forms: {
    password: 'Password',
    rememberMe: 'Remember me',
    username: 'Username',
  },
  fourofour: 'Oops. Nothing here...',
  gohome: 'Go home',
  itemlabels: itemLabels,
  menu: {
    'business-relations': 'Business Relations',
    category: 'Category | Categories',
    customer: 'Customer | Customers',
    inventory: 'Inventory',
    invoices: 'Invoices',
    'item-service': 'Item/Service | Items/Services',
    'new-purchase-invoice': 'New Purchase',
    'new-refund-purchase-invoice': 'New Purchase Refund',
    'new-refund-sale-invoice': 'New Sale Refund',
    'new-sale-invoice': 'New Sales',
    'purchase-invoices': 'Purchase Invoices',
    'refund-purchase-invoices': 'Refund Purchase Invoices',
    'refund-sale-invoices': 'Refund Sale Invoices',
    'sale-invoices': 'Sale Invoices',
    supplier: 'Supplier | Suppliers',
    unit: 'Unit | Units',
    warehouse: 'Warehouse | Warehouses',
  },
  messages: {
    failedToLogIn: 'Failed to log in',
    loggedIn: 'Logged In',
    welcome: 'Welcome {0}!',
  },
  nav: {
    search: 'Search in menu',
  },
  settings: {
    language: {
      label: 'Language',
    },
    settings: 'Settings',
    theme: {
      dark: 'Dark',
      device: 'Device Theme',
      label: 'Theme',
      light: 'Light',
    },
    transitionAnimations: {
      alternative: 'Alternative',
      animationType: 'Transition Animation Type',
      aroundCorner: 'Rotate Around Corners',
      aroundX: 'Rotate Around X-Axis',
      aroundY: 'Rotate Around Y-Axis',
      aroundZ: 'Rotate Around Z-Axis',
      checkboxLabel: 'Show Transition Animations',
      standard: 'Standard',
      swipeLeft: 'Swipe Left',
      swipeRight: 'Swipe Right',
    },
  },
  success: 'Action was successful',
  titles: {
    login: 'Login',
  },
};
