import { PageHeader } from "../_components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/userActions";

function getUsers(){
    return db.user.findMany({
        select: {
            id: true, 
            email: true, 
            orders: {select: {pricePaidInCents: true}}}, 
            orderBy: {createdAt: 'desc'}})
}

export default function UsersPage() {
    return <>
    <PageHeader>Customers</PageHeader>
    <UsersTable />
    </>
}

async function UsersTable(){
    const users = await getUsers();

    if (users.length === 0) return <p>No customers found</p>
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                    <span className="sr-only">Available for Purchase</span>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actons</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{formatNumber(user.orders.length)}</TableCell>
                    <TableCell>{formatCurrency(user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) / 100)}</TableCell>
                    <TableCell className='tyext-center'>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                        <MoreVertical />
                        <span className="sr-only">Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DeleteDropdownItem id={user.id} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}

