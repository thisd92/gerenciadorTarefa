export interface User {
    name: string,
    email: string,
    password: string,
    birth: string,
    tel: string,
    role?: string
}

export interface ValidatePass {
    confirmPassword: string
}
