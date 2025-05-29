import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '../providers/WishlistProvider'
import ApperIcon from './ApperIcon'

const Wishlist = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white dark:bg-surface-900 shadow-cart z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Wishlist Header */}
              <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
                <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200 flex items-center space-x-2">
                  <ApperIcon name="Heart" className="w-5 h-5 text-red-500" />
                  <span>Wishlist ({wishlistCount})</span>
                </h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                </motion.button>
              </div>

              {/* Wishlist Items */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 dark:bg-surface-800 rounded-2xl flex items-center justify-center">
                      <ApperIcon name="Heart" className="w-8 h-8 text-surface-400" />
                    </div>
                    <p className="text-surface-500 dark:text-surface-400 mb-2">Your wishlist is empty</p>
                    <p className="text-sm text-surface-400">Add items you love to keep track of them</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((item) => (
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
                            <div className="flex items-center mt-1">
                              <div className="flex items-center text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <ApperIcon 
                                    key={i} 
                                    name={i < Math.floor(item.rating) ? "Star" : "StarHalf"} 
                                    className="w-3 h-3 fill-current" 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-surface-500">({item.reviews})</span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <motion.button
                              onClick={() => removeFromWishlist(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-red-500"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist Footer */}
              {wishlist.length > 0 && (
                <div className="border-t border-surface-200 dark:border-surface-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-surface-800 dark:text-surface-200">
                      {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={clearWishlist}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 btn-secondary text-sm py-3"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                      Clear All
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 btn-primary text-sm py-3"
                      onClick={onClose}
                    >
                      <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
                      Shop More
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Wishlist