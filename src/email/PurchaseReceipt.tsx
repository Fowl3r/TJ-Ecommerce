import {Body, Container, Head, Heading, Html, Preview, Tailwind} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
    product: {
        name: string,
        imagePath: string,
    }
    order: {
        id: string,
        pricePaidInCents: number,
        createdAt: Date,
    }
}

PurchaseReceiptEmail.PreviewProps = {
    product: {name: "Product Name", imagePath:"/products/1275efba-6a98-418f-a1be-113b2fb67c64-Screenshot 2023-12-01 173620.png"},
    order: {
        id: crypto.randomUUID(), 
        pricePaidInCents: 10000, 
        createdAt: new Date()}
    } satisfies PurchaseReceiptEmailProps


export default function PurchaseReceiptEmail({product, order}: PurchaseReceiptEmailProps){
    return (
        <Html>
            <Preview> View receipt for {product.name}</Preview>
            <Tailwind >
                <Head />
            <Body className="font-sans bg-white">
                <Container className="max-w-xl">
                    <Heading>Purchase Receipt</Heading>
                    <OrderInformation order={order} product={product} />
                </Container>

            </Body>
            </Tailwind>
        </Html>
    )
}