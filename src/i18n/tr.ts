/*eslint sort-keys: "error"*/

import { ItemOut } from 'src/client';

const itemLabels: Record<keyof ItemOut, string> = {
  barcode: 'Barkod',
  buycurrency: 'Alış para birimi',
  buyprice: 'Alış fiyatı',
  category: 'Kategori',
  created_at: 'Oluşturulma tarihi',
  created_by: 'Oluşturan',
  description: 'Tanım',
  id: 'ID',
  kdv: 'KDV',
  name: 'Ürün/Hizmet adı',
  sellcurrency: 'Satış para birimi',
  sellprice: 'Satış fiyatı',
  stock_code: 'Stok kodu',
  stock_unit: 'Stok birimi',
  stocks: 'Stoklar',
  thumbnail: 'Önizleme Resmi',
  updated_at: 'Güncelleme tarihi',
  updated_by: 'Güncelleyen',
};

const ajvErrors = {
  const: 'sabite eşit olmalı: {allowedValue}',
  dependentRequired: '{property} varsa {deps} mevcut olmalı',
  enum: 'sadece izin verilen değerleri girebilirsiniz: {allowedValues}',
  exclusiveMaximum: '{limit} değerinden küçük olmalı',
  exclusiveMinimum: '{limit} değerinden büyük olmalı',
  maxItems: '{limit} öğeden daha fazla olamaz',
  maxLength: '{limit} karakterden daha uzun olamaz',
  maxProperties: '{limit} öğeden daha fazla olamaz',
  maximum: '{limit} veya daha az olmalı',
  minLength: '{limit} karakterden daha kısa olamaz',
  minProperties: '{limit} öğeden daha az öğe olamaz',
  minimum: '{limit} veya daha çok olmalı',
  mixItems: '{limit} öğeden daha az öğe olamaz',
  multipleOf: 'yalnızca {multipleOf} ve katları olabilir',
  pattern: 'örüntüye uymalı: {pattern}',
  required: 'Bu alan gerekli',
  uniqueItems: 'tekrarlayan öğeler olamaz (öğe {j} ve {i} birbirinin aynısı)',
};

export default {
  'ajv-errors': ajvErrors,
  appName: 'Stok Takibi',
  buttons: {
    back: 'Geri',
    forgotmypassword: 'Şifremi unuttum',
    login: 'Giriş yap',
  },
  commons: {
    cancel: 'Vazgeç',
    dofilter: 'Filtrele',
    fields: {
      created_at: 'Oluşturma Tarihi',
      created_by: 'Oluşturan',
      updated_at: 'Güncelleme Tarihi',
      updated_by: 'Güncelleyen',
    },
    new: 'Yeni @:{0}',
    'no-result': 'Sonuç Yok',
    ok: 'Tamam',
    refresh: 'Yenile',
    reset: 'Sıfırla',
    search: 'Ara',
  },
  data_table: {
    cards: 'Kart görünümü',
    exitfullscreen: 'Tam Ekrandan Çık',
    file: 'Dosya',
    filter: 'Filtrele',
    gofullscreen: 'Tam Ekran Yap',
    order: 'Sıralama',
    ordering: {
      buttons: {
        decreasing: 'Azalan sıralama',
        increasing: 'Artan sıralama',
      },
    },
    refresh: 'Yenile',
    rows: 'Satır görünümü',
    table_type: 'Tablo Tipi',
    view: 'Görünüm',
    xitems_selected: '{0} öğe seçildi',
  },
  date: {
    inthreemonths: 'Üç ay içinde',
    nextmonth: 'Sonraki ay',
    nextweek: 'Sonraki hafta',
    thismonth: 'Bu ay',
    thisweek: 'Bu hafta',
    today: 'Bugün',
  },
  failed: 'Başarısız',
  forms: {
    password: 'Parola',
    rememberMe: 'Beni hatırla',
    username: 'Kullanıcı adı',
  },
  fourofour: 'Aradık bulamadık.',
  gohome: 'Anasayfaya dön',
  itemlabels: itemLabels,
  labels: {
    maximum: 'Maksimum',
    minimum: 'Minimum',
  },
  menu: {
    'business-relations': 'İş İlişkileri',
    category: 'Kategori | Kategoriler',
    customer: 'Müşteri | Müşteriler',
    inventory: 'Envanter',
    invoices: 'Faturalar',
    'item-service': 'Ürün/Hizmet | Ürünler/Hizmetler',
    'new-purchase-invoice': 'Yeni Alış',
    'new-refund-purchase-invoice': 'Yeni Alış İade',
    'new-refund-sale-invoice': 'Yeni Satış İade',
    'new-sale-invoice': 'Yeni Satış',
    'purchase-invoices': 'Alış Faturaları',
    'refund-purchase-invoices': 'Alış İade Faturaları',
    'refund-sale-invoices': 'Satış İade Faturaları',
    'sale-invoices': 'Satış Faturaları',
    supplier: 'Satıcı | Satıcılar',
    unit: 'Birim | Birimler',
    warehouse: 'Depo | Depolar',
  },
  messages: {
    failedToLogIn: 'Giriş denemesi başarısız',
    loggedIn: 'Giriş Yapıldı',
    welcome: 'Hoşgeldin {0}!',
  },
  nav: {
    search: 'Menüde ara',
  },
  settings: {
    language: {
      label: 'Dil',
    },
    settings: 'Ayarlar',
    theme: {
      dark: 'Karanlık',
      device: 'Cihaz Teması',
      label: 'Tema',
      light: 'Aydınlık',
    },
    transitionAnimations: {
      alternative: 'Alternatif',
      animationType: 'Geçiş Animasyonu Tipi',
      aroundCorner: 'Köşelerden Döndür',
      aroundX: 'X Ekseninde Döndür',
      aroundY: 'Y Ekseninde Döndür',
      aroundZ: 'Z Ekseninde Döndür',
      checkboxLabel: 'Geçiş Animasyonları Göster',
      standard: 'Standart',
      swipeLeft: 'Sola Kaydır',
      swipeRight: 'Sağa Kaydır',
    },
    ui: {
      compact: 'Kompakt',
      'navigation-menu-type': 'Navigasyon menü tipi',
      relax: 'Rahat',
    },
  },
  success: 'Başarılı',
  titles: {
    activeColumns: 'Aktif kolonlar',
    filter: 'Filtre',
    login: 'Giriş',
    ordering: 'Sıralama',
  },
};
