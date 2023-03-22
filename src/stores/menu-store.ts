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
          to: { name: 'invoices' },
          bgColor: 'green-8',
          children: [
            {
              title: $t('menu.new-sale-invoice'),
              icon: 'post_add',
              to: { name: 'nest', params: { id: 2 } },
            },
          ],
        },
        {
          title: $t('menu.purchase-invoices'),
          shrinkable: true,
          icon: 'article',
          bgColor: 'red-8',
          to: { name: 'nest', params: { id: 3 } },
          children: [
            {
              title: $t('menu.new-purchase-invoice'),
              icon: 'post_add',
              to: { name: 'nest', params: { id: 4 } },
            },
          ],
        },
        {
          title: $t('menu.refund-sale-invoices'),
          shrinkable: true,
          icon: 'article',
          bgColor: 'yellow-10',
          to: { name: 'nest', params: { id: 5 } },
          defaultClosed: true,
          children: [
            {
              title: $t('menu.new-refund-sale-invoice'),
              icon: 'post_add',
              to: { name: 'nest', params: { id: 6 } },
            },
          ],
        },
        {
          title: $t('menu.refund-purchase-invoices'),
          shrinkable: true,
          icon: 'article',
          bgColor: 'blue-10',
          to: { name: 'nest', params: { id: 7 } },
          defaultClosed: true,
          children: [
            {
              title: $t('menu.new-refund-purchase-invoice'),
              icon: 'post_add',
              to: { name: 'nest', params: { id: 8 } },
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
          to: { name: 'nest', params: { id: 9 } },
          children: [
            {
              title: $t('commons.new', ['menu.item-service']),
              icon: 'conveyor_belt',
              to: { name: 'nest', params: { id: 10 } },
            },
          ],
        },
        {
          title: $t('menu.unit', 2),
          defaultClosed: true,
          shrinkable: true,
          icon: 'square_foot',
          bgColor: 'purple-8',
          to: { name: 'nest', params: { id: 11 } },
          children: [
            {
              title: $t('commons.new', ['menu.unit']),
              icon: 'straighten',
              to: { name: 'nest', params: { id: 12 } },
            },
          ],
        },
        {
          title: $t('menu.category', 2),
          defaultClosed: true,
          shrinkable: true,
          icon: 'category',
          bgColor: 'lime-8',
          to: { name: 'nest', params: { id: 13 } },
          children: [
            {
              title: $t('commons.new', ['menu.category']),
              icon: 'hexagon',
              to: { name: 'nest', params: { id: 14 } },
            },
          ],
        },
        {
          title: $t('menu.warehouse', 2),
          defaultClosed: true,
          shrinkable: true,
          bgColor: 'brown-8',
          icon: 'warehouse',
          to: { name: 'nest', params: { id: 15 } },
          children: [
            {
              title: $t('commons.new', ['menu.warehouse']),
              icon: 'gite',
              to: { name: 'nest', params: { id: 16 } },
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
          to: { name: 'nest', params: { id: 17 } },
          children: [
            {
              shrinkable: true,
              title: $t('commons.new', ['menu.customer']),
              icon: 'person',
              to: { name: 'nest', params: { id: 18 } },
            },
          ],
        },
        {
          shrinkable: true,
          title: $t('menu.supplier', 2),
          bgColor: 'negative',
          icon: 'location_city',
          to: { name: 'nest', params: { id: 19 } },
          children: [
            {
              title: $t('commons.new', ['menu.supplier']),
              icon: 'business',
              to: { name: 'nest', params: { id: 20 } },
            },
          ],
        },
      ],
    },
  ];
};
