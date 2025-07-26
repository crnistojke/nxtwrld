"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { CheckoutPage } from "@/components/checkout-page"
import { useWishlist } from "@/hooks/use-wishlist"
import { Product, CheckoutDetails } from "@/types"
// Predvidevam, da imate komponento za filtriranje, ki jo bomo poimenovali FilterSidebar
// import { FilterSidebar } from "@/components/filter-sidebar" 

// --- DEFINICIJA TIPA ZA FILTRE ---
interface FilterState {
  category: string;
  price: {
    min: number;
    max: number;
  };
  sort: string;
}

// Začasna definicija, če datoteka ne obstaja
const FilterSidebar = ({ onApplyFilters }: { onApplyFilters: (filters: FilterState) => void }) => {
    // To je samo placeholder. Zamenjajte z vašo dejansko komponento.
    return <div className="bg-gray-100 p-4 rounded-lg">Filter Sidebar Placeholder</div>
}


export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null)
  
  const { wishlistItems, toggleWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  // Začasni podatki o izdelkih, zamenjajte z vašimi dejanskimi podatki
  const [products, setProducts] = useState<Product[]>([
     {
      id: 1,
      name: "NXT WRLD Globe Tee - White",
      images: ["/images/nxtwrldtshirtwhite.webp", "/images/nxtwrldtshirtwhite2.webp"],
      price: "€29.99",
      category: "t-shirt",
      description: "...",
      sizes: ["S", "M", "L"],
      details: ["..."],
    },
    {
      id: 2,
      name: "NXT WRLD Globe Tee - Black",
      images: ["/images/nxtwrldtshirt.webp", "/images/nxtwrldtshirt2.webp"],
      price: "€29.99",
      category: "t-shirt",
      description: "...",
      sizes: ["S", "M", "L"],
      details: ["..."],
    },
    {
      id: 3,
      name: "NXT WRLD Globe Hoodie",
      images: ["/images/nxtwrldhoodie2.webp", "/images/nxtwrldhoodie.webp"],
      price: "€54.99",
      category: "hoodie",
      description: "...",
      sizes: ["S", "M", "L"],
      details: ["..."],
    },
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleBuyNow = (details: CheckoutDetails) => {
    setCheckoutDetails(details)
    setIsProductModalOpen(false)
    setIsCheckoutOpen(true)
  }

  const handleBackFromCheckout = () => {
    setIsCheckoutOpen(false)
    setCheckoutDetails(null)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  // --- POPRAVLJENA FUNKCIJA ---
  // Parametru 'filters' smo dodali prej definirani tip 'FilterState'
  const handleApplyFilters = (filters: FilterState) => {
    let tempProducts = [...products]

    // Uporabi filter po kategoriji
    if (filters.category && filters.category !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === filters.category)
    }

    // Uporabi filter po ceni
    const minPrice = filters.price.min || 0;
    const maxPrice = filters.price.max || Infinity;
    tempProducts = tempProducts.filter(p => {
        const price = parseFloat(p.price.replace('€', ''));
        return price >= minPrice && price <= maxPrice;
    });

    // Uporabi sortiranje
    if (filters.sort === 'price-asc') {
      tempProducts.sort((a, b) => parseFloat(a.price.replace('€', '')) - parseFloat(b.price.replace('€', '')))
    } else if (filters.sort === 'price-desc') {
      tempProducts.sort((a, b) => parseFloat(b.price.replace('€', '')) - parseFloat(a.price.replace('€', '')))
    }

    setFilteredProducts(tempProducts)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          {/* Tukaj bi bila vaša komponenta za filtriranje */}
          <FilterSidebar onApplyFilters={handleApplyFilters} />
        </aside>
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onToggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </main>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        onBuy={handleBuyNow}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
      />

      <CheckoutPage
        isOpen={isCheckoutOpen}
        details={checkoutDetails}
        onBack={handleBackFromCheckout}
      />
    </div>
  )
}
