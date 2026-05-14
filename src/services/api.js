import { MOCK_PRODUCTS } from './mockData';

/**
 * Advanced Mock Backend API Service
 * Simulates a real RESTful API with network latency and local persistence
 * demonstrating ES6+ classes, Promises, Async/Await and data-mapping.
 */
class MockApiService {
  constructor() {
    this.latency = 800; // Simulated network delay (ms)
  }

  /**
   * Simulated Network Latency Helper
   */
  async _delay() {
    return new Promise(resolve => setTimeout(resolve, this.latency));
  }

  /**
   * GET /api/products
   * Fulfills the Fetching and async processing syllabus requirement.
   */
  async getProducts() {
    await this._delay();
    
    // Check LocalStorage cache for dynamic inventory
    const localInventory = localStorage.getItem('mooun_inventory');
    if (localInventory) {
      return JSON.parse(localInventory);
    }
    
    // Cache initial mock data
    localStorage.setItem('mooun_inventory', JSON.stringify(MOCK_PRODUCTS));
    return MOCK_PRODUCTS;
  }

  /**
   * GET /api/products/:id
   */
  async getProductById(id) {
    await this._delay();
    const products = await this.getProducts();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      throw new Error(`Resource Not Found: Product with ID ${id} does not exist.`);
    }
    return product;
  }

  /**
   * POST /api/auth/login
   */
  async login(email, password) {
    await this._delay();
    
    // Simulated Authentication logic
    if (email && password) {
      const user = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        token: 'jwt_mooun_secure_token_xyz123',
        role: 'customer'
      };
      
      localStorage.setItem('mooun_user', JSON.stringify(user));
      return user;
    }
    
    throw new Error('Invalid credentials submitted');
  }

  /**
   * POST /api/orders (Simulated)
   */
  async processOrder(orderData) {
    await this._delay();
    
    // Simple order processing simulation
    const orderConfirmation = {
      orderId: 'ORD-' + Date.now(),
      status: 'CONFIRMED',
      timestamp: new Date().toISOString(),
      details: orderData
    };
    
    // Clear current cart after successful backend processing
    localStorage.removeItem('cartItems');
    return orderConfirmation;
  }
}

// Singleton instance of the backend service
export const api = new MockApiService();
