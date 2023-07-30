import {PrismaClient} from '@prisma/client'

declare global{
    var prismaClient: PrismaClient| undefined
}

var prismadb = globalThis.prismaClient || new PrismaClient()

if(process.env.NODE_ENV !== 'production'){
    globalThis.prismaClient = prismadb
}
export default prismadb