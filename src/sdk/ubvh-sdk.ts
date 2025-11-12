/**
 * UBVH SDK - Universal Blockchain Verification Hub
 * 3-Line Integration for Any Network
 * 
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 * "Build your network in 1 day, not 1 year"
 * 
 * @author Muhammad Adnan Ul Mustafa <adnanmd76@gmail.com>
 * @version 1.0.0
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as crypto from 'crypto';
import { EventEmitter } from 'events';

// SDK Configuration
export interface UBVHConfig {
  apiKey: string;
  networkId?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  islamic?: boolean;
  environment?: 'development' | 'staging' | 'production';
}

// Transaction Data Interface
export interface TransactionData {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
  signature?: string;
  nonce?: number;
}

// Verification Result Interface
export interface VerificationResult {
  transactionId: string;
  networkId: string;
  verified: boolean;
  timestamp: string;
  verificationProof: string;
  securityScore: number;
  complianceScore: number;
  energyUsed: number;
  processingTime: number;
  immutableHash: string;
  genesisProtocolUsed: boolean;
  islamicCompliant: boolean;
  errors?: string[];
  warnings?: string[];
}

// Network Registration Interface
export interface NetworkRegistration {
  name: string;
  type: 'DeFi' | 'NFT' | 'Gaming' | 'Social' | 'Enterprise' | 'Islamic' | 'Other';
  description?: string;
  website?: string;
  compliance: string[];
  islamic: boolean;
  securityLevel: 'Basic' | 'Standard' | 'Premium' | 'Enterprise';
  expectedTPS: number;
  geographicRegions: string[];
  contactEmail: string;
}

// Network Registration Result
export interface NetworkRegistrationResult {
  networkId: string;
  apiKey: string;
  sdkPackage: string;
  dashboardAccess: string;
  verificationEndpoint: string;
  explorerUrl: string;
  complianceStatus: string;
  estimatedIntegrationTime: string;
}

// Search Query Interface
export interface SearchQuery {
  searchTerm: string;
  networks?: string[] | 'all';
  dataTypes?: ('transactions' | 'addresses' | 'contracts' | 'identities')[];
  timeRange?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  includeAnalytics?: boolean;
  islamicOnly?: boolean;
}

// Search Results Interface
export interface SearchResults {
  totalResults: number;
  networkBreakdown: Record<string, number>;
  transactionResults: any[];
  addressResults: any[];
  contractResults: any[];
  identityResults: any[];
  analytics?: any;
  visualization?: any;
}

/**
 * UBVH SDK Main Class
 * 
 * Provides simple integration with the Universal Blockchain Verification Hub
 * 
 * Example Usage:
 * ```typescript
 * const UBVH = require('ubvh-sdk');
 * const verifier = new UBVH.Verifier('YOUR_API_KEY');
 * const result = await verifier.verify(transactionData);
 * ```
 */
export class UBVHVerifier extends EventEmitter {
  private readonly config: UBVHConfig;
  private readonly httpClient: AxiosInstance;
  private readonly baseUrls = {
    development: 'http://localhost:3000/api/v1',
    staging: 'https://staging-api.ubvh.io/api/v1',
    production: 'https://api.ubvh.io/api/v1'
  };

  constructor(config: UBVHConfig | string) {
    super();
    
    // Handle simple string API key or full config object
    if (typeof config === 'string') {
      this.config = {
        apiKey: config,
        baseUrl: this.baseUrls.production,
        timeout: 30000,
        retries: 3,
        islamic: false,
        environment: 'production'
      };
    } else {
      this.config = {
        baseUrl: this.baseUrls[config.environment || 'production'],
        timeout: 30000,
        retries: 3,
        islamic: false,
        environment: 'production',
        ...config
      };
    }

    // Create HTTP client
    this.httpClient = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'X-API-Key': this.config.apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'UBVH-SDK/1.0.0',
        'X-Network-ID': this.config.networkId || 'unknown'
      }
    });

    // Add request interceptor for retries
    this.setupRetryInterceptor();
    
    // Add response interceptor for error handling
    this.setupResponseInterceptor();

    this.emit('initialized', {
      config: this.config,
      timestamp: new Date().toISOString(),
      blessing: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
    });
  }

  /**
   * Verify a transaction using UBVH Master Layer
   * This is the main method that provides universal verification
   */
  async verify(transactionData: TransactionData): Promise<VerificationResult> {
    try {
      this.emit('verification_started', { transactionId: transactionData.id });
      
      const response: AxiosResponse<VerificationResult> = await this.httpClient.post(
        '/verification/verify',
        {
          ...transactionData,
          networkId: this.config.networkId,
          timestamp: new Date().toISOString(),
          sdkVersion: '1.0.0'
        }
      );

      const result = response.data;
      
      this.emit('verification_completed', {
        transactionId: transactionData.id,
        verified: result.verified,
        processingTime: result.processingTime,
        energyUsed: result.energyUsed
      });

      return result;

    } catch (error) {
      this.emit('verification_failed', {
        transactionId: transactionData.id,
        error: error.message
      });
      throw new Error(`UBVH Verification failed: ${error.message}`);
    }
  }

  /**
   * Register a new network with UBVH
   * This enables the "15-minute integration" process
   */
  async registerNetwork(networkData: NetworkRegistration): Promise<NetworkRegistrationResult> {
    try {
      this.emit('network_registration_started', { networkName: networkData.name });
      
      const response: AxiosResponse<NetworkRegistrationResult> = await this.httpClient.post(
        '/networks/register',
        {
          ...networkData,
          registrationTimestamp: new Date().toISOString(),
          sdkVersion: '1.0.0'
        }
      );

      const result = response.data;
      
      // Update config with new network ID
      this.config.networkId = result.networkId;
      this.httpClient.defaults.headers['X-Network-ID'] = result.networkId;
      
      this.emit('network_registration_completed', {
        networkId: result.networkId,
        integrationTime: result.estimatedIntegrationTime
      });

      return result;

    } catch (error) {
      this.emit('network_registration_failed', {
        networkName: networkData.name,
        error: error.message
      });
      throw new Error(`Network registration failed: ${error.message}`);
    }
  }

  /**
   * Search across all connected networks
   */
  async search(query: SearchQuery): Promise<SearchResults> {
    try {
      this.emit('search_started', { searchTerm: query.searchTerm });
      
      const response: AxiosResponse<SearchResults> = await this.httpClient.post(
        '/explorer/search',
        {
          ...query,
          timestamp: new Date().toISOString(),
          sdkVersion: '1.0.0'
        }
      );

      const results = response.data;
      
      this.emit('search_completed', {
        searchTerm: query.searchTerm,
        totalResults: results.totalResults
      });

      return results;

    } catch (error) {
      this.emit('search_failed', {
        searchTerm: query.searchTerm,
        error: error.message
      });
      throw new Error(`Universal search failed: ${error.message}`);
    }
  }

  /**
   * Get network status and statistics
   */
  async getNetworkStatus(): Promise<any> {
    try {
      const response = await this.httpClient.get('/networks/status');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get network status: ${error.message}`);
    }
  }

  /**
   * Get UBVH system statistics
   */
  async getSystemStats(): Promise<any> {
    try {
      const response = await this.httpClient.get('/system/stats');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get system stats: ${error.message}`);
    }
  }

  /**
   * Get Genesis Protocol statistics
   */
  async getGenesisProtocolStats(): Promise<any> {
    try {
      const response = await this.httpClient.get('/genesis/stats');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get Genesis Protocol stats: ${error.message}`);
    }
  }

  /**
   * Validate Islamic compliance for a transaction
   */
  async validateIslamicCompliance(transactionData: TransactionData): Promise<any> {
    try {
      const response = await this.httpClient.post('/compliance/islamic', transactionData);
      return response.data;
    } catch (error) {
      throw new Error(`Islamic compliance validation failed: ${error.message}`);
    }
  }

  /**
   * Get ADN_iD identity information
   */
  async getIdentityInfo(address: string): Promise<any> {
    try {
      const response = await this.httpClient.get(`/identity/${address}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get identity info: ${error.message}`);
    }
  }

  // Private helper methods
  private setupRetryInterceptor(): void {
    this.httpClient.interceptors.request.use(
      (config) => {
        config.metadata = { startTime: Date.now() };
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private setupResponseInterceptor(): void {
    this.httpClient.interceptors.response.use(
      (response) => {
        const duration = Date.now() - response.config.metadata.startTime;
        this.emit('api_call_completed', {
          url: response.config.url,
          method: response.config.method,
          status: response.status,
          duration
        });
        return response;
      },
      async (error) => {
        const config = error.config;
        
        // Retry logic
        if (!config._retry && config._retryCount < this.config.retries) {
          config._retryCount = config._retryCount || 0;
          config._retryCount++;
          
          const delay = Math.pow(2, config._retryCount) * 1000; // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
          
          return this.httpClient(config);
        }
        
        this.emit('api_call_failed', {
          url: config?.url,
          method: config?.method,
          error: error.message,
          retries: config?._retryCount || 0
        });
        
        return Promise.reject(error);
      }
    );
  }
}

/**
 * Network Adapter Base Class
 * Extend this class to create custom network integrations
 */
export abstract class NetworkAdapter {
  protected ubvh: UBVHVerifier;
  protected networkId: string;

  constructor(config: UBVHConfig) {
    this.ubvh = new UBVHVerifier(config);
    this.networkId = config.networkId || 'unknown';
  }

  /**
   * Process a transaction with automatic UBVH verification
   */
  async processTransaction(transactionData: TransactionData): Promise<any> {
    // Verify with UBVH first
    const verification = await this.ubvh.verify(transactionData);
    
    if (verification.verified) {
      return await this.executeTransaction(transactionData, verification);
    } else {
      throw new Error(`Transaction verification failed: ${verification.errors?.join(', ')}`);
    }
  }

  /**
   * Get universal network status from UBVH
   */
  async getUniversalNetworkStatus(): Promise<any> {
    return await this.ubvh.getNetworkStatus();
  }

  /**
   * Search across all networks
   */
  async universalSearch(query: SearchQuery): Promise<SearchResults> {
    return await this.ubvh.search(query);
  }

  // Abstract methods to be implemented by specific network adapters
  protected abstract executeTransaction(transactionData: TransactionData, verification: VerificationResult): Promise<any>;
}

/**
 * UBVH SDK Factory
 * Provides convenient factory methods for creating SDK instances
 */
export class UBVH {
  /**
   * Create a new UBVH Verifier instance
   */
  static Verifier(config: UBVHConfig | string): UBVHVerifier {
    return new UBVHVerifier(config);
  }

  /**
   * Create a network adapter
   */
  static NetworkAdapter(config: UBVHConfig): NetworkAdapter {
    return new (class extends NetworkAdapter {
      protected async executeTransaction(transactionData: TransactionData, verification: VerificationResult): Promise<any> {
        // Default implementation - override in specific adapters
        return {
          transactionId: transactionData.id,
          executed: true,
          verification,
          timestamp: new Date().toISOString()
        };
      }
    })(config);
  }

  /**
   * Register a new network (static method)
   */
  static async registerNetwork(networkData: NetworkRegistration, apiKey?: string): Promise<NetworkRegistrationResult> {
    const verifier = new UBVHVerifier(apiKey || 'temp_registration_key');
    return await verifier.registerNetwork(networkData);
  }

  /**
   * Quick verification (static method)
   */
  static async verify(transactionData: TransactionData, apiKey: string): Promise<VerificationResult> {
    const verifier = new UBVHVerifier(apiKey);
    return await verifier.verify(transactionData);
  }

  /**
   * Get SDK version and info
   */
  static getInfo(): any {
    return {
      name: 'UBVH SDK',
      version: '1.0.0',
      description: 'Universal Blockchain Verification Hub SDK',
      motto: 'One Verification Layer, Infinite Possibilities',
      islamicBlessing: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      author: 'Muhammad Adnan Ul Mustafa <adnanmd76@gmail.com>',
      website: 'https://ubvh.io',
      github: 'https://github.com/Adnanmd76/ADANiD-Genesis-Core'
    };
  }
}

// Export everything for easy importing
export default UBVH;
export { UBVHVerifier, NetworkAdapter };

// CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UBVH;
  module.exports.UBVH = UBVH;
  module.exports.UBVHVerifier = UBVHVerifier;
  module.exports.NetworkAdapter = NetworkAdapter;
  module.exports.default = UBVH;
}