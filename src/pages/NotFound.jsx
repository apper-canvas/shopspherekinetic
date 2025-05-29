import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 via-white to-primary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-soft"
          >
            <ApperIcon name="ShoppingBag" className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-bold text-gradient mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl font-semibold text-surface-700 dark:text-surface-200 mb-4"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-surface-600 dark:text-surface-400 mb-8 max-w-sm mx-auto"
          >
            Sorry, we couldn't find the page you're looking for. Let's get you back to shopping!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <ApperIcon name="Home" className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-4 mt-6">
              <button className="flex items-center space-x-2 text-surface-600 hover:text-primary-600 transition-colors duration-200">
                <ApperIcon name="Search" className="w-4 h-4" />
                <span>Search Products</span>
              </button>
              
              <span className="text-surface-400">|</span>
              
              <button className="flex items-center space-x-2 text-surface-600 hover:text-primary-600 transition-colors duration-200">
                <ApperIcon name="HelpCircle" className="w-4 h-4" />
                <span>Get Help</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound