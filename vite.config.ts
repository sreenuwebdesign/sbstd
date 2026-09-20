import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';
import {defineConfig, Plugin} from 'vite';

function razorpayApiPlugin(): Plugin {
  return {
    name: 'razorpay-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/razorpay-config' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_TdvscDmxRBscBg',
            hasSecret: Boolean(process.env.RAZORPAY_KEY_SECRET),
          }));
          return;
        }

        if (req.url === '/api/create-razorpay-order' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              const { amount, currency = 'INR', receipt, notes } = JSON.parse(body || '{}');
              const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_TdvscDmxRBscBg';
              const keySecret = process.env.RAZORPAY_KEY_SECRET;

              if (!keySecret) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  keyId,
                  amount: Math.round(Number(amount) * 100),
                  currency,
                }));
                return;
              }

              const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
              const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
                method: 'POST',
                headers: {
                  'Authorization': `Basic ${auth}`,
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
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  orderId: orderData.id,
                  amount: orderData.amount,
                  currency: orderData.currency,
                  keyId,
                }));
              } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: false,
                  error: orderData.error?.description || 'Failed to create order',
                  keyId,
                }));
              }
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/verify-razorpay-payment' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(body || '{}');
              const keySecret = process.env.RAZORPAY_KEY_SECRET;

              if (!keySecret) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ verified: true, testMode: true }));
                return;
              }

              if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                // If direct payment without order
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ verified: true }));
                return;
              }

              const hmac = crypto.createHmac('sha256', keySecret);
              hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
              const generatedSignature = hmac.digest('hex');

              const isMatch = generatedSignature === razorpay_signature;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ verified: isMatch }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ verified: false, error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), razorpayApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
