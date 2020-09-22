export interface JwtDto{
    token?: string,
    bearer: string,
    nombreUsuario: string,
    authorities: string[]
}