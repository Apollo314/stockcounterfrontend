const ajvErrors = {
  const: 'must be equal to constant: {allowedValue}',
  dependentRequired:
    'must have properties {deps} when property {property} is present',
  enum: 'must be equal to one of the allowed values: {allowedValues}',
  exclusiveMaximum: 'must be < {limit}',
  exclusiveMinimum: 'must be > {limit}',
  maxItems: 'must NOT have more than {limit} items',
  maxLength: 'must NOT have more than {limit} characters',
  maxProperties: 'must NOT have more than {limit} items',
  maximum: 'must be <= {limit}',
  minLength: 'must NOT have less than {limit} characters',
  minProperties: 'must NOT have fewer than {limit} items',
  minimum: 'must be >= {limit}',
  mixItems: 'must NOT have less than {limit} items',
  multipleOf: 'must be multiple of {multipleOf}',
  pattern: 'Must match pattern {pattern}',
  required: 'This field is required',
  uniqueItems:
    'must NOT have duplicate items (items {j} and {i} are identical)',
};

const editor = {
  align_center: 'Align center',
  align_left: 'Align left',
  align_right: 'Align right',
  bold: 'Bold',
  header4: 'Header 4',
  header5: 'Header 5',
  header6: 'Header 6',
  highlight: 'Highlight',
  numbered_list: 'Numbered list',
  paragraph: 'Paragraph',
  strike: 'Strikethrough',
  table: {
    add_column_after: 'Add column after',
    add_column_before: 'Add column before',
    add_row_after: 'Add row after',
    add_row_before: 'Add row before',
    delete_column: 'Delete column',
    delete_row: 'Delete row',
    delete_table: 'Delete table',
    merge_cells: 'Merge cells',
    split_cell: 'Split cell',
  },
  unordered_list: 'Unordered list',
};

export default {
  dashboard: {
    'best-customers': 'Best Customers',
    'customer-name': 'Customer name',
    'customer-cash-in': 'Customer Cash In',
    'last-users': 'Last Users',
    'last-items': 'Last Items',
    'item-name': 'Name',
    'item-stock': 'Stock',
    'item-buy-sell': 'Buy - Sell',
    'account-balance': 'Account Balance',
    'balance-graph': {
      all_accounts: 'All Accounts',
      cumulative: 'Cumulative',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
    },
  },
  'ajv-errors': ajvErrors,
  appName: 'Stock Counter',
  buttons: {
    back: 'Back',
    forgotmypassword: 'Forgot my password',
    login: 'Log in',
    generate_random: 'Generate random',
    show_password: 'Show password',
  },
  commons: {
    add_new: 'Add new',
    'are-you-sure-you-want-to-delete': 'Are you sure you want to delete this?',
    cancel: 'Cancel',
    close: 'Close',
    delete: 'Delete',
    dofilter: 'Filter',
    editoropen: 'Edit/Open',
    email: 'Email',
    fields: {
      created_at: 'Create Date',
      created_by: 'Created By',
      updated_at: 'Update Date',
      updated_by: 'Updated By',
    },
    new: 'New @:{0}',
    'no-result': 'No Result',
    ok: 'Okay',
    phone: 'Phone',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    yes: 'Yes',
  },
  confirmations: {
    'repeat-text-above': 'Repeat the text above',
    'will-be-deleted': '{objects} will be deleted.',
  },
  data_table: {
    cards: 'Cards view',
    exitfullscreen: 'Exit Fullscreen',
    file: 'File',
    filter: 'Filter',
    gofullscreen: 'Go Fullscreen',
    order: 'Ordering',
    ordering: {
      buttons: {
        decreasing: 'Decreasing order',
        increasing: 'Increasing order',
      },
    },
    refresh: 'Refresh',
    rows: 'Rows view',
    table_type: 'Table Type',
    view: 'View',
    xitems_selected: '{0} items selected',
  },
  date: {
    inthreemonths: 'In three months',
    nextmonth: 'Next month',
    nextweek: 'Next week',
    thismonth: 'This month',
    thisweek: 'This week',
    today: 'Today',
  },
  editor,
  failed: 'Action failed',
  forms: {
    password: 'Password',
    rememberMe: 'Remember me',
    titles: {
      generic_create: 'Create Form',
      generic_update: 'Update Form',
      item_creation: 'Item Creation Form',
      item_update: 'Item Update Form',
      create_user_group: 'Create user group',
      update_user_group: 'Update user group',
      update_user_account: 'Create user account',
      create_user_account: 'Update user account',
    },
    username: 'Username',
  },
  fourofour: 'Oops. Nothing here...',
  gohome: 'Go home',
  invoice_labels: {
    customer: 'Customer name',
    invoice_condition_label: 'Templates',
    items: {
      amount: 'Amount',
      itemname: 'Item/Service',
      price: 'Price',
    },
    new_condition_name: 'New template',
    new_condition_placeholder:
      "You can create a new template here. it'll be saved when you save the invoice.",
    new_line: 'New line',
    supplier: 'Supplier name',
    tabs: {
      conditions: 'Conditions',
      'general-information': 'General invoice information',
      items: 'Items/Services',
    },
    template_is_modified:
      'Different than the template. Either template or invoice condition is modified.',
  },
  labels: {
    maximum: 'Maximum',
    minimum: 'Minimum',
  },
  menu: {
    bank: 'Bank | Banks',
    'business-relations': 'Business Relations',
    category: 'Category | Categories',
    customer: 'Customer | Customers',
    employee: 'Employee | Employees',
    finance: 'Finance',
    inventory: 'Inventory',
    invoice_conditions: 'Invoice Conditions',
    invoices: 'Invoices',
    'item-service': 'Item/Service | Items/Services',
    'new-invoice-condition': 'New invoice condition',
    'new-purchase-invoice': 'New Purchase',
    'new-refund-purchase-invoice': 'New Purchase Refund',
    'new-refund-sale-invoice': 'New Sale Refund',
    'new-sale-invoice': 'New Sales',
    'payment-account': 'Payment Account | Payment Accounts',
    payments: 'Payments',
    'purchase-invoices': 'Purchase Invoices',
    'refund-purchase-invoices': 'Refund Purchase Invoices',
    'refund-sale-invoices': 'Refund Sale Invoices',
    'sale-invoices': 'Sale Invoices',
    supplier: 'Supplier | Suppliers',
    unit: 'Unit | Units',
    warehouse: 'Warehouse | Warehouses',
    users_and_groups: 'Users and Groups',
    group: 'Group | Groups',
    user: 'User | Users',
  },
  messages: {
    failedToLogIn: 'Failed to log in',
    loggedIn: 'Logged In',
    welcome: 'Welcome {0}!',
  },
  nav: {
    search: 'Search in menu',
  },
  notifications: {
    created_successfully: 'Created successfully!',
    deleted_successfully: 'Deleted successfully!',
    request_failed: 'Request failed',
    updated_successfully: 'Updated succesfully!',
  },
  payment_account: {
    account_number: 'Account number',
    iban: 'IBAN',
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
    ui: {
      compact: 'Compact',
      'navigation-menu-type': 'Navigation menu type',
      relax: 'Relax',
    },
  },
  success: 'Action was successful',
  titles: {
    activeColumns: 'Active columns',
    filter: 'Filter',
    login: 'Login',
    ordering: 'Ordering',
  },
};
