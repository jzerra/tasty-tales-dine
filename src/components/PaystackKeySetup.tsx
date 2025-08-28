import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Eye, EyeOff } from 'lucide-react';

export default function PaystackKeySetup() {
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleUpdatePublicKey = () => {
    if (publicKey.startsWith('pk_')) {
      // In a real app, you'd update this via an API
      navigator.clipboard.writeText(`export const PAYSTACK_PUBLIC_KEY = '${publicKey}';`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const copySecretKeyInfo = () => {
    const info = `Secret Key (Backend only): ${secretKey}
    
Add this to your backend environment variables:
PAYSTACK_SECRET_KEY=${secretKey}

Never expose this key in frontend code!`;
    navigator.clipboard.writeText(info);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Paystack Key Setup</h1>
        <p className="text-muted-foreground">Enter your Paystack API keys</p>
      </div>

      {showAlert && (
        <Alert>
          <AlertDescription>
            Public key code copied to clipboard! Update src/lib/paystack.ts manually.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Public Key (Frontend)</CardTitle>
          <CardDescription>
            Starts with pk_test_ or pk_live_ - Safe to use in frontend code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="publicKey">Paystack Public Key</Label>
            <Input
              id="publicKey"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="pk_test_..."
              className="font-mono"
            />
          </div>
          <Button 
            onClick={handleUpdatePublicKey}
            disabled={!publicKey.startsWith('pk_')}
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Code for Frontend Update
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Secret Key (Backend Only)</CardTitle>
          <CardDescription>
            Starts with sk_test_ or sk_live_ - NEVER expose in frontend code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="secretKey">Paystack Secret Key</Label>
            <div className="relative">
              <Input
                id="secretKey"
                type={showSecretKey ? 'text' : 'password'}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="sk_test_..."
                className="font-mono pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowSecretKey(!showSecretKey)}
              >
                {showSecretKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button 
            onClick={copySecretKeyInfo}
            disabled={!secretKey.startsWith('sk_')}
            variant="secondary"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Backend Setup Instructions
          </Button>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          <strong>Important:</strong> The secret key should only be used on your backend server. 
          For this demo app, you'll need to manually update the frontend public key in src/lib/paystack.ts
        </AlertDescription>
      </Alert>
    </div>
  );
}