"use server"

import db from "@/db/db";

// Might not be needed as would i want to stop people from ordering the same product multiple times?
export async function userOrderExists(email: string, productId: string){
    return (await db.order.findFirst({
        where: {
            user:{email},
            productId,
        }, select: {id: true},
    })) != null;
}