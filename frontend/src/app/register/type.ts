export interface User {
    name: string,
    email: string,
    companyName: string,
    password: string,
    birth: string,
    tel: string,
    role?: string
    _id?: string
    squad?: string
}

export interface ValidatePass {
    confirmPassword: string
}
