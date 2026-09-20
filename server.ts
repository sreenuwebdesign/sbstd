import express from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ override: true });
import { createServer as createViteServer } from 'vite';

// Active Razorpay credentials provided by temple administration
const RAZORPAY_KEY_ID = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'rzp_test_TdvscDmxRBscBg')
  ? process.env.RAZORPAY_KEY_ID
  : 'rzp_test_Tdwg8WzyCqcdry';

const RAZORPAY_KEY_SECRET = (process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_SECRET !== 'placeholder_secret_key_never_expose_to_client')
  ? process.env.RAZORPAY_KEY_SECRET
  : 'q4CxEEdGvu4uYQifzZzY6B7n';

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // Razorpay Public Config Endpoint
  app.get('/api/razorpay-config', (req, res) => {
    res.json({
      keyId: RAZORPAY_KEY_ID,
      hasSecret: Boolean(RAZORPAY_KEY_SECRET),
    });
  });

  // Create Razorpay Order
  app.post('/api/create-razorpay-order', async (req, res) => {
    try {
      const { amount, currency = 'INR', receipt, notes } = req.body;
      const keyId = RAZORPAY_KEY_ID;
      const keySecret = RAZORPAY_KEY_SECRET;

      if (!keySecret) {
        return res.json({
          success: true,
          keyId,
          amount: Math.round(Number(amount) * 100),
          currency,
        });
      }

      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(Number(amount) * 100),
          currency,
          receipt: receipt || `rec_${Date.now()}`,
          notes: notes || {},
        }),
      });

      const orderData = await rzpRes.json();
      if (orderData.id) {
        return res.json({
          success: true,
          orderId: orderData.id,
          amount: orderData.amount,
          currency: orderData.currency,
          keyId,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: orderData.error?.description || 'Failed to create order',
          keyId,
        });
      }
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Verify Razorpay Payment Signature
  app.post('/api/verify-razorpay-payment', (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const keySecret = RAZORPAY_KEY_SECRET;

      if (!keySecret) {
        return res.json({ verified: true, testMode: true });
      }

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.json({ verified: true });
      }

      const hmac = crypto.createHmac('sha256', keySecret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest('hex');

      const isMatch = generatedSignature === razorpay_signature;
      return res.json({ verified: isMatch });
    } catch (err: any) {
      return res.status(500).json({ verified: false, error: err.message });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
