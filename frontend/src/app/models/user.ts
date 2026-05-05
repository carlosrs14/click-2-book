export class User {
    id: number;
    name: string;
    email: string;
    passowrd: string;
    rol_id: number;

    constructor(id: number, name: string, email: string, password: string, rol_id: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passowrd = password;
        this.rol_id = rol_id;
    }
}