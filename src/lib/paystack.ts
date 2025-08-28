// Paystack integration
// Replace this with your own Paystack publishable key from your dashboard
export const PAYSTACK_PUBLIC_KEY = 'pk_test_927a438781acc35e92919bb5503def9dcc2dc9b0';

export interface PaystackConfig {
  reference: string;
  email: string;
  amount: number; // Amount in kobo (multiply by 100)
  publicKey: string;
  text?: string;
  currency?: string;
  channels?: string[];
  callback: (response: any) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: any) => {
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
    reference: config.reference,
    email: config.email,
    amount: config.amount,
    public_key: PAYSTACK_PUBLIC_KEY,
    callback: function(response: any) {
      config.callback(response);
    },
    onClose: function() {
      config.onClose();
    }
  });

  handler.openIframe();
}