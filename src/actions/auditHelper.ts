import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createAuditLog(
    userMail: string,
    ipAddress: string,
    orgId: string,
    type: string, 
    tableName: string, 
    oldValues: string, 
    newValues: string, 
    rowId: string
    ) {
    return await prisma.audit.create({
        data: {
            userMail,
            ipAddress,
            orgId,
            type,
            tableName,
            oldValues,
            newValues,
            rowId
        }
    });
};

// export{
//     createAuditLog
// }