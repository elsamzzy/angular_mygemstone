export class User {
    id!: number;
    user_id!: number;
    name!: string;
    email!: string;
    username!: string;
    phone!: number;
    email_verified_at!: number;
    bank!: string;
    account_name!: string;
    account_number!: string;
    created_at!: number;
    updated_at!: number;
    coupon_id!: number;
    balance!: number;
    withdraw!: number;
    request_withdraw!: number;
}

export class Bank {
    bank!: string;
    name!: string;
    number!: number;
}
