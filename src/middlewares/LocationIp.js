import fetch from "node-fetch";

const IPINFO_TOKEN = "94123d5de9e09c";

export async function getLocationFromIP(ip) {
  const response = await fetch(`https://ipinfo.io/${ip}/json?token=${IPINFO_TOKEN}`);
  if (!response.ok) {
      throw new Error(`Failed to fetch IP info: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}