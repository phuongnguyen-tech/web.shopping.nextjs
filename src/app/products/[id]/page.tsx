import ProductDetail from '@/components/productDetail'
import { baseUrl } from '@/utils/baseUrl'

interface Params {
    params: { id: string }
}

async function getDetailProduct({ id }: { id: string }): Promise<IProduct> {
    const res = await fetch(`${baseUrl}/products/${id}`)
    const prod: IProduct = await res.json()
    return prod
}

export default async function Page({ params }: Params) {
    const product = await getDetailProduct(params)
    return <ProductDetail product={product} />
}
