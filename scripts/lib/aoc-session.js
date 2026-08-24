import fs from 'fs';
import path from 'path';

export function readEnvFile(scriptDir) {
  const envPath = path.join(scriptDir, '..', '.env');
  const result = {};

  if (!fs.existsSync(envPath)) {
    return result;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) {
      continue;
    }
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    result[key] = value;
  }

  return result;
}

export function resolveSession(explicitArg, scriptDir) {
  let session = explicitArg || process.env.AOC_SESSION;

  if (!session) {
    session = readEnvFile(scriptDir).AOC_SESSION;
  }

  if (!session) {
    console.error('Error: Session token not provided.');
    console.error('Please provide it as an argument, environment variable, or in .env file');
    process.exit(1);
  }

  return session;
}

export function resolveUserAgent(scriptDir) {
  const envFile = readEnvFile(scriptDir);
  const username = process.env.AOC_GITHUB_USERNAME || envFile.AOC_GITHUB_USERNAME;
  const email = process.env.AOC_CONTACT_EMAIL || envFile.AOC_CONTACT_EMAIL;

  const missing = [];
  if (!username) missing.push('AOC_GITHUB_USERNAME');
  if (!email) missing.push('AOC_CONTACT_EMAIL');

  if (missing.length > 0) {
    console.error(`Error: ${missing.join(' and ')} not set.`);
    console.error(
      'Advent of Code asks automated tools to identify themselves with a real contact.'
    );
    console.error('Add them to .env (see .env.example) or export as environment variables.');
    process.exit(1);
  }

  return `github.com/${username}/adventofcode by ${email}`;
}
