/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserUpdate = {
    readonly id: number;
    /**
     * Zorunlu. 150 karakter ya da daha az olmalı. Sadece harfler, rakamlar ve @/./+/-/_ karakterleri kullanılabilir.
     */
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string | null;
    /**
     * Kullanıcının bu yönetici sitesine oturum açıp açamayacağını belirler.
     */
    is_staff?: boolean;
    /**
     * Bu kullanıcıya ayrı ayrı izin atamadan tüm izinlerin verilip verilmeyeceğini belirler.
     */
    is_superuser?: boolean;
    avatar?: string | null;
    /**
     * Bu kullanıcının ait olduğu gruplar. Bir kullanıcı kendi gruplarının her birine verilmiş olan tüm izinleri alacak.
     */
    groups?: Array<number>;
};

