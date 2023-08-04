/*eslint sort-keys: "warn"*/

const ajvErrors = {
  const: 'sabite eşit olmalı: {allowedValue}',
  dependentRequired: '{property} varsa {deps} mevcut olmalı',
  enum: 'sadece izin verilen değerleri girebilirsiniz: {allowedValues}',
  exclusiveMaximum: '{limit} değerinden küçük olmalı',
  exclusiveMinimum: '{limit} değerinden büyük olmalı',
  maxItems: '{limit} ögeden daha fazla olamaz',
  maxLength: '{limit} karakterden daha uzun olamaz',
  maxProperties: '{limit} ögeden daha fazla olamaz',
  maximum: '{limit} veya daha az olmalı',
  minLength: '{limit} karakterden daha kısa olamaz',
  minProperties: '{limit} ögeden daha az öge olamaz',
  minimum: '{limit} veya daha çok olmalı',
  mixItems: '{limit} ögeden daha az öge olamaz',
  multipleOf: 'yalnızca {multipleOf} ve katları olabilir',
  pattern: 'örüntüye uymalı: {pattern}',
  required: 'Bu alan gerekli',
  uniqueItems: 'tekrarlayan ögeler olamaz (öge {j} ve {i} birbirinin aynısı)',
};

const editor = {
  align_center: 'Ortala',
  align_left: 'Sola yasla',
  align_right: 'Sağa yasla',
  bold: 'Kalın',
  header4: 'Başlık 4',
  header5: 'Başlık 5',
  header6: 'Başlık 6',
  highlight: 'Vurgula',
  numbered_list: 'Numaralı liste',
  paragraph: 'Paragraf',
  strike: 'Üstünü çiz',
  table: {
    add_column_after: 'Sonrasına kolon ekle',
    add_column_before: 'Öncesine kolon ekle',
    add_row_after: 'Sonrasına satır ekle',
    add_row_before: 'Öncesine satır ekle',
    delete_column: 'Kolonu sil',
    delete_row: 'Satırı sil',
    delete_table: 'Tabloyu sil',
    merge_cells: 'Hücreleri birleştir',
    split_cell: 'Hücreyi ayır',
  },
  unordered_list: 'Sırasız liste',
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
    add_new: 'Yeni ekle',
    'are-you-sure-you-want-to-delete':
      'Bu ögenin silinmesini istediğinize emin misiniz?',
    cancel: 'Vazgeç',
    close: 'Kapat',
    delete: 'Sil',
    dofilter: 'Filtrele',
    editoropen: 'Aç/Değiştir',
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
    yes: 'Evet',
  },
  confirmations: {
    'repeat-text-above': 'Yukarıdaki yazıyı tekrar edin',
    'will-be-deleted': '{objects} silinecek.',
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
    xitems_selected: '{0} öge seçildi',
  },
  date: {
    inthreemonths: 'Üç ay içinde',
    nextmonth: 'Sonraki ay',
    nextweek: 'Sonraki hafta',
    thismonth: 'Bu ay',
    thisweek: 'Bu hafta',
    today: 'Bugün',
  },
  editor,
  failed: 'Başarısız',
  forms: {
    password: 'Parola',
    rememberMe: 'Beni hatırla',
    titles: {
      generic_create: 'Kayıt Oluşturma Formu',
      generic_update: 'Kayıt Güncelleme Formu',
      item_creation: 'Ürün Oluşturma Formu',
      item_update: 'Ürün Güncelleme Formu',
      create_user_group: 'Kullanıcı grubu oluştur',
      update_user_group: 'Kullanıcı grubunu güncelle',
    },
    username: 'Kullanıcı adı',
  },
  fourofour: 'Aradık bulamadık.',
  gohome: 'Anasayfaya dön',
  invoice_labels: {
    customer: 'Müşteri adı',
    invoice_condition_label: 'Şablonlar',
    items: {
      amount: 'Miktar',
      itemname: 'Ürün/Hizmet',
      price: 'Fiyat',
    },
    new_condition_name: 'Yeni şablon',
    new_condition_placeholder:
      'Burayı değiştirerek yeni bir şablon oluşturabilirsiniz. Fatura ile beraber kaydolur.',
    new_line: 'Yeni satır',
    supplier: 'Satıcı adı',
    tabs: {
      conditions: 'Koşullar',
      'general-information': 'Genel fatura bilgileri',
      items: 'Ürünler/Hizmetler',
    },
    template_is_modified:
      'Şablondan farklılık gösteriyor. Ya şablon ya da fatura koşulları değiştirilmiş.',
  },
  labels: {
    maximum: 'Maksimum',
    minimum: 'Minimum',
  },
  menu: {
    bank: 'Banka | Bankalar',
    'business-relations': 'İş İlişkileri',
    category: 'Kategori | Kategoriler',
    customer: 'Müşteri | Müşteriler',
    employee: 'Çalışan | Çalışanlar',
    finance: 'Finans',
    inventory: 'Envanter',
    invoice_conditions: 'Fatura koşulları',
    invoices: 'Faturalar',
    'item-service': 'Ürün/Hizmet | Ürünler/Hizmetler',
    'new-invoice-condition': 'Yeni fatura koşulu',
    'new-purchase-invoice': 'Yeni Alış',
    'new-refund-purchase-invoice': 'Yeni Alış İade',
    'new-refund-sale-invoice': 'Yeni Satış İade',
    'new-sale-invoice': 'Yeni Satış',
    'payment-account': 'Ödeme Hesabı | Ödeme Hesapları',
    payments: 'Ödemeler',
    'purchase-invoices': 'Alış Faturaları',
    'refund-purchase-invoices': 'Alış İade Faturaları',
    'refund-sale-invoices': 'Satış İade Faturaları',
    'sale-invoices': 'Satış Faturaları',
    supplier: 'Satıcı | Satıcılar',
    unit: 'Birim | Birimler',
    warehouse: 'Depo | Depolar',
    users_and_groups: 'Kullanıcılar ve Gruplar',
    group: 'Grup | Gruplar',
    user: 'Kullanıcı | Kullanıcılar',
  },
  messages: {
    failedToLogIn: 'Giriş denemesi başarısız',
    loggedIn: 'Giriş Yapıldı',
    welcome: 'Hoşgeldin {0}!',
  },
  nav: {
    search: 'Menüde ara',
  },
  notifications: {
    created_successfully: 'Başarıyla oluşturuldu!',
    deleted_successfully: 'Başarıyla silindi!',
    request_failed: 'İstek başarısızlıkla sonuçlandı',
    updated_successfully: 'Başarıyla güncellendi!',
  },
  payment_account: {
    account_number: 'Account number',
    iban: 'IBAN',
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
