import crypto from 'crypto';

export function generateSessionId() {
  const sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
}
