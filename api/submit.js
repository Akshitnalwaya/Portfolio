import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const data = req.body;

  try {
    const tempFilePath = '/tmp/data.json'; // Vercel allows writing to /tmp

    let existing = [];

    if (fs.existsSync(tempFilePath)) {
      const content = fs.readFileSync(tempFilePath, 'utf8');
      existing = JSON.parse(content);
    }

    existing.push({ ...data, timestamp: new Date().toISOString() });

    fs.writeFileSync(tempFilePath, JSON.stringify(existing, null, 2), 'utf8');

    return res.status(200).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
