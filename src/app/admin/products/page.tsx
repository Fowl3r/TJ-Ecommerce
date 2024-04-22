import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import  Link  from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import { MoreVertical } from "lucide-react";

export default function AdminProdcutsPage() {
    return <>
    <div className="flex justify-between items-center gap-4">
    <PageHeader>Products</PageHeader>
    <Button asChild>
        <Link href="/admin/products/new">Add Product</Link>
    </Button>
    </div>
    <ProductsTable />
    </>
}

async function ProductsTable(){
    const products = await db.product.findMany({ select: {id : true, name: true, priceInCents: true, _count: {select: {orders:true}}}, orderBy: {name: 'asc'}})

    if (products.length === 0) return <p>No products found</p>
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                    <span className="sr-only">Available for Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actons</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map(product => (
                <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                    <TableCell>{formatNumber(product._count.orders)}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                        <MoreVertical />
                        <span className="sr-only">Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/products/${product.id}/edit`}>
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";