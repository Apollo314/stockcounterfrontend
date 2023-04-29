import { $t } from 'boot/i18n';
import { MenuItem } from 'src/types/MenuTypes/MenuTypes';

export const menuItems = (): MenuItem[] => {
  return [
    {
      title: $t('menu.invoices'),
      shrinkable: true,
      icon: 'folder',
      expandedIcon: 'folder_open',
      iconColor: 'yellow-8',
      children: [
        {
          title: $t('menu.sale-invoices'),
          shrinkable: true,
          icon: 'article',
          to: { name: 'sale-invoice-list' },
          bgColor: 'green-8',
          children: [
            {
              title: $t('menu.new-sale-invoice'),
              icon: 'post_add',
              to: { name: 'sale-invoice-create' },
            },
          ],
        },
        {
          title: $t('menu.purchase-invoices'),
          shrinkable: true,
          icon: 'article',
          bgColor: 'red-8',
          to: { name: 'purchase-invoice-list' },
          children: [
            {
              title: $t('menu.new-purchase-invoice'),
              icon: 'post_add',
              to: { name: 'purchase-invoice-create' },
            },
          ],
        },
        {
          title: $t('menu.refund-sale-invoices'),
          shrinkable: true,
          icon: 'article',
          bgColor: 'yellow-10',
          to: { name: 'refund-sale-invoice-list' },
          defaultClosed: true,
          children: [
            {
              title: $t('menu.new-refund-sale-invoice'),
              icon: 'post_add',
              to: { name: 'refund-sale-invoice-create' },
            },
          ],
        },
        {
          title: $t('menu.refund-purchase-invoices'),
          shrinkable: true,
          icon: 'article',
          bgColor: 'blue-10',
          to: { name: 'refund-purchase-invoice-list' },
          defaultClosed: true,
          children: [
            {
              title: $t('menu.new-refund-purchase-invoice'),
              icon: 'post_add',
              to: { name: 'refund-purchase-invoice-create' },
            },
          ],
        },
      ],
    },
    {
      title: $t('menu.inventory'),
      icon: 'shelves',
      iconColor: 'blue-grey-8',
      shrinkable: true,
      children: [
        {
          title: $t('menu.item-service', 2),
          icon: 'trolley',
          bgColor: 'yellow-10',
          shrinkable: true,
          to: { name: 'items-list' },
          children: [
            {
              title: $t('commons.new', ['menu.item-service']),
              icon: 'conveyor_belt',
              to: { name: 'items-create' },
            },
          ],
        },
        {
          title: $t('menu.unit', 2),
          defaultClosed: true,
          shrinkable: true,
          icon: 'square_foot',
          bgColor: 'purple-8',
          to: { name: 'stockunit-list' },
          children: [
            {
              title: $t('commons.new', ['menu.unit']),
              icon: 'straighten',
              to: { name: 'stockunit-create' },
            },
          ],
        },
        {
          title: $t('menu.category', 2),
          defaultClosed: true,
          shrinkable: true,
          icon: 'category',
          bgColor: 'lime-8',
          to: { name: 'category-list' },
          children: [
            {
              title: $t('commons.new', ['menu.category']),
              icon: 'hexagon',
              to: { name: 'category-create' },
            },
          ],
        },
        {
          title: $t('menu.warehouse', 2),
          defaultClosed: true,
          shrinkable: true,
          bgColor: 'brown-8',
          icon: 'warehouse',
          to: { name: 'warehouse-list' },
          children: [
            {
              title: $t('commons.new', ['menu.warehouse']),
              icon: 'gite',
              to: { name: 'warehouse-create' },
            },
          ],
        },
      ],
    },
    {
      title: $t('menu.business-relations'),
      shrinkable: true,
      icon: 'work',
      iconColor: 'brown-6',
      children: [
        {
          shrinkable: true,
          title: $t('menu.customer', 2),
          icon: 'groups',
          bgColor: 'positive',
          to: { name: 'customer-list' },
          children: [
            {
              shrinkable: true,
              title: $t('commons.new', ['menu.customer']),
              icon: 'person',
              to: { name: 'customer-create' },
            },
          ],
        },
        {
          shrinkable: true,
          title: $t('menu.supplier', 2),
          bgColor: 'negative',
          icon: 'location_city',
          to: { name: 'supplier-list' },
          children: [
            {
              title: $t('commons.new', ['menu.supplier']),
              icon: 'business',
              to: { name: 'supplier-create' },
            },
          ],
        },
      ],
    },
  ];
};
