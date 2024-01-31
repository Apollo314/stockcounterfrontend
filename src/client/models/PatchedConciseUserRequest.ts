/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PatchedConciseUserRequest = {
    /**
     * Zorunlu. 150 karakter ya da daha az olmalı. Sadece harfler, rakamlar ve @/./+/-/_ karakterleri kullanılabilir.
     */
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string | null;
    date_joined?: string;
    last_login?: string | null;
    /**
     * Bu kullanıcının etkin olarak işlem görüp görmediğini belirler. Hesapları silmek yerine bunun işaretini kaldırın.
     */
    is_active?: boolean;
    /**
     * Kullanıcının bu yönetici sitesine oturum açıp açamayacağını belirler.
     */
    is_staff?: boolean;
    /**
     * Bu kullanıcıya ayrı ayrı izin atamadan tüm izinlerin verilip verilmeyeceğini belirler.
     */
    is_superuser?: boolean;
    avatar?: Blob | null;
};

