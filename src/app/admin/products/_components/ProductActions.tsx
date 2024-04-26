"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct } from "../../_actions/products";
import { useTransition} from "react";
import { useRouter } from "next/navigation";

// Also not needed as no product availability option
// export function ActiveToggleDropdownItem({
//     id,
// } : {
//     id: string,
// }) {
//     const [isPending, startTransition] = useTransition();
//     return <DropdownMenuItem onClick={() => {
//         startTransition(async() => {
//             await toggleProductAvailability(id)
//         })
//     }}></DropdownMenuItem>
// }

export function DeleteDropdownItem({
    id,
    disabled,
} : {
    id: string,
    disabled: boolean,
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return <DropdownMenuItem
    variant="destructive"
    disabled={isPending}
    onClick={() => {
        startTransition(async () => {
            await deleteProduct(id)
            router.refresh();
        })
    }}>
        Delete
    </DropdownMenuItem>
}