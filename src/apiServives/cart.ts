// services/cartService.ts

// Giả sử cartItems là một mảng các sản phẩm trong giỏ hàng
let cartItems: IProduct[] = []

// Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = (product: IProduct) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id)

    if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        cartItems[existingItemIndex].quantity++
    } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào
        cartItems.push({ ...product, quantity: 1 })
    }

    // Lưu trữ thông tin giỏ hàng vào localStorage hoặc session storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

// Hàm lấy thông tin giỏ hàng từ localStorage khi load lại trang
export const getCartItems = (): IProduct[] => {
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems)
    }
    return cartItems
}
