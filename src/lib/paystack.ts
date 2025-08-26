// Paystack integration
export const PAYSTACK_PUBLIC_KEY = 'pk_test_your_paystack_public_key_here';

export interface PaystackConfig {
  reference: string;
  email: string;
  amount: number; // Amount in kobo (multiply by 100)
  publicKey: string;
  text?: string;
  currency?: string;
  channels?: string[];
  callback?: (response: any) => void;
  close?: () => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: PaystackConfig) => {
        openIframe: () => void;
      };
    };
  }
}

export function generateReference(): string {
  return `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
}

export async function initializePaystackPayment(config: PaystackConfig) {
  await loadPaystackScript();
  
  if (!window.PaystackPop) {
    throw new Error('Paystack script not loaded');
  }

  const handler = window.PaystackPop.setup({
    ...config,
    publicKey: PAYSTACK_PUBLIC_KEY,
  });

  handler.openIframe();
}