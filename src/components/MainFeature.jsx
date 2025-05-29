import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { useWishlist } from '../providers/WishlistProvider'

const MainFeature = ({ cartCount, setCartCount }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 1000])

  // Mock product data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      originalPrice: 179.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      rating: 4.5,
      reviews: 234,
      inStock: 15,
      features: ["Noise Cancelling", "30hr Battery", "Quick Charge"]
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      category: "clothing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      rating: 4.3,
      reviews: 89,
      inStock: 23,
      features: ["100% Cotton", "Machine Washable", "Classic Fit"]
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 299.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      rating: 4.7,
      reviews: 156,
      inStock: 8,
      features: ["Heart Rate Monitor", "GPS Tracking", "Waterproof"]
    },
    {
      id: 4,
      name: "Leather Laptop Bag",
      price: 89.99,
      originalPrice: 119.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      rating: 4.4,
      reviews: 67,
      inStock: 12,
      features: ["Genuine Leather", "Laptop Compartment", "Adjustable Strap"]
    },
    {
      id: 5,
      name: "Organic Green Tea Set",
      price: 24.99,
      originalPrice: 34.99,
      category: "food",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
      rating: 4.6,
      reviews: 94,
      inStock: 31,
      features: ["Organic", "6 Varieties", "Gift Box Included"]
    },
    {
      id: 6,
      name: "Minimalist Desk Lamp",
      price: 79.99,
      originalPrice: 99.99,
      category: "home",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
      rating: 4.2,
      reviews: 43,
      inStock: 19,
      features: ["LED Bulb", "Touch Control", "Adjustable Brightness"]
    }
  ])

  const categories = [
    { id: 'all', name: 'All Products', icon: 'Grid3X3' },
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
    { id: 'clothing', name: 'Clothing', icon: 'Shirt' },
    { id: 'accessories', name: 'Accessories', icon: 'Watch' },
    { id: 'home', name: 'Home & Living', icon: 'Home' },
    { id: 'food', name: 'Food & Drinks', icon: 'Coffee' }
  ]

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesCategory && matchesSearch && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      toast.success(`Increased ${product.name} quantity`)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
      toast.success(`${product.name} added to cart`)
    }
    
    setCartCount(prev => prev + 1)
  }

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId)
    if (item) {
      if (item.quantity > 1) {
        setCart(cart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ))
        setCartCount(prev => prev - 1)
      } else {
        setCart(cart.filter(item => item.id !== productId))
        setCartCount(prev => prev - item.quantity)
      }
      toast.info(`Removed from cart`)
    }
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
// Wishlist functionality
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-gradient mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Discover Amazing Products
        </motion.h1>
        <motion.p 
          className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Shop the latest trends and exclusive deals from your favorite brands
        </motion.p>
        
        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white dark:bg-surface-800 dark:border-surface-600 dark:text-white text-lg shadow-soft"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Filters and Categories */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mb-12"
      >
        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-200 mb-4">Categories</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-product'
                    : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-600 hover:border-primary-300 shadow-card'
                }`}
              >
                <ApperIcon name={category.icon} className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white dark:bg-surface-800 dark:border-surface-600 dark:text-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
            
            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 btn-primary relative"
            >
              <ApperIcon name="ShoppingCart" className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="product-card overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
/>
                  <div className="absolute top-3 left-3">
                    <motion.button
                      onClick={() => toggleWishlist(product)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm shadow-soft hover:bg-white dark:hover:bg-surface-800 transition-all duration-200"
                    >
                      <ApperIcon 
                        name={isInWishlist(product.id) ? "Heart" : "Heart"} 
                        className={`w-4 h-4 transition-colors duration-200 ${
                          isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-surface-600 dark:text-surface-400'
                        }`} 
                      />
                    </motion.button>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="badge bg-accent text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full btn-primary text-sm py-2 px-4"
                    >
                      <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-surface-800 dark:text-surface-200 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <ApperIcon 
                          key={i} 
                          name={i < Math.floor(product.rating) ? "Star" : "StarHalf"} 
                          className="w-4 h-4 fill-current" 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-surface-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                      <span className="text-sm text-surface-400 line-through">${product.originalPrice}</span>
                    </div>
                    <span className={`badge ${product.inStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.inStock > 0 ? `${product.inStock} left` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                        <ApperIcon name="Check" className="w-3 h-3 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center">
              <ApperIcon name="Search" className="w-12 h-12 text-surface-400" />
            </div>
            <h3 className="text-2xl font-semibold text-surface-700 dark:text-surface-200 mb-2">No products found</h3>
            <p className="text-surface-500 dark:text-surface-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </motion.section>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white dark:bg-surface-900 shadow-cart z-50 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Cart Header */}
                <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
                  <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                    Shopping Cart ({cartCount})
                  </h2>
                  <motion.button
                    onClick={() => setIsCartOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200"
                  >
                    <ApperIcon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  </motion.button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center">
                        <ApperIcon name="ShoppingCart" className="w-8 h-8 text-surface-400" />
                      </div>
                      <p className="text-surface-500 dark:text-surface-400">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="cart-item"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-surface-800 dark:text-surface-200 truncate">
                                {item.name}
                              </h4>
                              <p className="text-primary-600 font-semibold">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <motion.button
                                onClick={() => removeFromCart(item.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                              >
                                <ApperIcon name="Minus" className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                              </motion.button>
                              <span className="w-8 text-center font-medium text-surface-700 dark:text-surface-300">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() => addToCart(item)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                              >
                                <ApperIcon name="Plus" className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Footer */}
                {cart.length > 0 && (
                  <div className="border-t border-surface-200 dark:border-surface-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-surface-800 dark:text-surface-200">Total:</span>
                      <span className="text-2xl font-bold text-primary-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary text-lg py-4"
                      onClick={() => {
                        toast.success('Proceeding to checkout...')
                        setIsCartOpen(false)
                      }}
                    >
                      <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
                      Checkout
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature