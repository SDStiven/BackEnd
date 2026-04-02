import {hash,compare} from "bcrypt"

//funcao para fazer o hash da senha
export async function hashPassword(passwordEmTexto: string) {
 return await hash(passwordEmTexto,12)
}

//funcao para comparar a senha
export async function comparePassword(passwordEmTexto: string,passwordHash: string) {
 return await compare(passwordEmTexto,passwordHash)
}



