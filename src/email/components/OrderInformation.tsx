import { formatCurrency } from "@/lib/formatter";
import { Column, Img, Row, Section, Text } from "@react-email/components"
import Image from "next/image";

type OrderInformationProps = {
    order: {
        id: string,
        pricePaidInCents: number,
        createdAt: Date,
    },
    product: {
        name: string,
        imagePath: string,
        description: string,
    },
}

const dateFormater = new Intl.DateTimeFormat('en', {dateStyle: 'medium'});


export function OrderInformation({order, product}: OrderInformationProps) {
    return <>
    <Section>
        <Row>
            <Column>
                <Text className="mb-0 text-gray-500 whitespace-nowrap mr-4 text-nowrap">Order ID</Text>
                <Text className="mt-0 mr-4">{order.id}</Text>
            </Column>
            <Column>
                <Text className="mb-0 text-gray-500 whitespace-nowrap mr-4 text-nowrap">Purchased On</Text>
                <Text className="mt-0 mr-4">{dateFormater.format(order.createdAt)}</Text>
            </Column>
            <Column>
                <Text className="mb-0 text-gray-500 whitespace-nowrap mr-4 text-nowrap">Price Paid</Text>
                <Text className="mt-0 mr-4">{formatCurrency(order.pricePaidInCents / 100)}</Text>
            </Column>
        </Row>
    </Section>
    <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img width="100%" alt={product.name} src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`} />
    </Section>
    </>
}