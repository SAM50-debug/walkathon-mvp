// In a real Vercel production environment with many concurrent users, 
// a serverless function can spin up multiple isolated instances (Cold Starts).
// For absolute true global persistence across ALL instances and cold starts, 
// you would connect this to Vercel KV (Redis) or a database.
// 
// However, for a simple deployment without external database dependencies,
// this in-memory variable will act as a persistent counter for the lifecycle 
// of this specific serverless container while it remains "warm".

let globalCounter = 0;

export default function handler(req, res) {
  // Only allow GET or POST requests
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Increment the counter
  globalCounter++;

  // Format tracking number to be 3 digits (e.g., 001, 002)
  const formattedSerial = String(globalCounter).padStart(3, '0');
  
  // Create the final serial text
  const serialText = `RIMT/Walkathon1.0/${formattedSerial}`;

  // Add CORS headers just in case it's fetched from a different host
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Return the serial number
  return res.status(200).json({
    success: true,
    serialNumber: serialText,
    count: globalCounter
  });
}
