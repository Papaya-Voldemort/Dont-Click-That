import { type url, type level, type ScoreValue } from "../stores/levels";

export const safeURLs = [
  // Search & Navigation
  "https://www.google.com",
  "https://www.bing.com",
  "https://duckduckgo.com",
  "https://www.yahoo.com",
  "https://www.google.com/maps",

  // Major Shopping & Retail
  "https://www.amazon.com",
  "https://www.walmart.com",
  "https://www.target.com",
  "https://www.ebay.com",
  "https://www.etsy.com",
  "https://www.bestbuy.com",
  "https://www.costco.com",
  "https://www.homedepot.com",
  "https://www.lowes.com",
  "https://www.wayfair.com",

  // Streaming & Entertainment
  "https://www.youtube.com",
  "https://www.netflix.com",
  "https://www.disneyplus.com",
  "https://www.hulu.com",
  "https://www.max.com", // Formerly HBO Max
  "https://www.peacocktv.com",
  "https://www.paramountplus.com",
  "https://www.spotify.com",
  "https://music.apple.com",
  "https://www.twitch.tv",

  // Social Media & Community
  "https://www.facebook.com",
  "https://www.instagram.com",
  "https://www.tiktok.com",
  "https://www.pinterest.com",
  "https://www.reddit.com",
  "https://twitter.com",
  "https://x.com",
  "https://www.nextdoor.com",

  // Finance & Banking
  "https://www.chase.com",
  "https://www.bankofamerica.com",
  "https://www.wellsfargo.com",
  "https://www.capitalone.com",
  "https://www.paypal.com",
  "https://www.venmo.com",

  // Information, News & Reference
  "https://www.wikipedia.org",
  "https://www.weather.com",
  "https://www.nytimes.com",
  "https://www.wsj.com",
  "https://www.cnn.com",
  "https://www.bbc.com",
  "https://www.foxnews.com",

  // Travel & Food Delivery
  "https://www.airbnb.com",
  "https://www.expedia.com",
  "https://www.booking.com",
  "https://www.tripadvisor.com",
  "https://www.uber.com",
  "https://www.doordash.com",
  "https://www.ubereats.com",
  "https://www.instacart.com",

  // Core Communication & Productivity
  "https://www.icloud.com",
  "https://mail.google.com",
  "https://outlook.live.com",
  "https://www.zoom.us",
] as const;

const typoMap: Record<string, string[]> = {
  l: ["1", "i"],
  o: ["0"],
  e: ["3"],
  i: ["1", "l"],
  a: ["4"],
};

export function makeURL(): url {
  const randomIndex = Math.floor(Math.random() * safeURLs.length);
  const randomURL = safeURLs[randomIndex];

  const protocol = randomURL.startsWith("https") ? "https" : "http";

  const hostname = randomURL.split("://")[1].split("/")[0];
  const parts = hostname.split(".");

  let subdomain = "";
  let domain = "";

  const isMultiPartTLD = hostname.match(/\.(co|com|org|net|edu)\.[a-z]{2}$/i);
  const tldPartsCount = isMultiPartTLD ? 2 : 1;
  const domainPartsCount = tldPartsCount + 1;

  const tld = parts.slice(-tldPartsCount).join(".");

  if (parts.length <= domainPartsCount) {
    subdomain = "www";
    domain = parts.slice(-domainPartsCount, -tldPartsCount).join(".");
  } else {
    subdomain = parts.slice(0, -domainPartsCount).join(".");
    domain = parts.slice(-domainPartsCount, -tldPartsCount).join(".");
  }

  return {
    protocol,
    subdomain,
    domain,
    tld,
  };
}

export function generateURLLevel(difficulty: "easy" | "intermediate" | "hard"): level {
  const randomURL = safeURLs[Math.floor(Math.random() * safeURLs.length)];
  const hostname = randomURL.split("://")[1].split("/")[0];
  const parts = hostname.split(".");

  const originalBrand = parts.length > 2 ? parts[1] : parts[0];
  const originalTld = parts.slice(-1)[0];

  let subdomain = "www";
  let domain = originalBrand;
  let tld = originalTld;
  let scenario: "legit" | "typo" | "spoof" = "legit";

  if (difficulty === "easy") {
    if (Math.random() > 0.7) {
      scenario = "typo";
    }
  } else if (difficulty === "intermediate") {
    scenario = Math.random() > 0.4 ? (Math.random() > 0.5 ? "typo" : "spoof") : "legit";
  } else {
    scenario = Math.random() > 0.2 ? "spoof" : "legit";
  }

  if (scenario === "typo") {
    if (Math.random() > 0.5) {
      domain = originalBrand + originalBrand.slice(-1);
    } else {
      const chars = originalBrand.split("");
      for (let i = 0; i < chars.length; i++) {
        if (typoMap[chars[i]]) {
          const options = typoMap[chars[i]];
          chars[i] = options[Math.floor(Math.random() * options.length)];
          break;
        }
      }
      domain = chars.join("");
    }
  } else if (scenario === "spoof") {
    // Push real brand to subdomain, switch root domain to something malicious
    subdomain = originalBrand;
    const maliciousDomains = ["login-secure", "verify-account", "portal-update", "security-alert"];
    const shadyTlds = ["xyz", "info", "biz", "net"];

    domain = maliciousDomains[Math.floor(Math.random() * maliciousDomains.length)];
    tld = shadyTlds[Math.floor(Math.random() * shadyTlds.length)];
  }

  // 4. Construct customized educational feedback values
  let scoreValues: ScoreValue[] = [];

  if (scenario === "legit") {
    scoreValues = [
      {
        name: "safe",
        value: 1,
        feedback: `Spot on! This is the exact official website structure for ${originalBrand}. You're completely safe.`,
      },
      {
        name: "sus",
        value: 0.5,
        feedback:
          "You're playing it safe, which is great! But this layout is actually the real deal.",
      },
      {
        name: "threat",
        value: 0,
        feedback: `Don't panic! This is the authentic web service domain for ${originalBrand}.`,
      },
    ];
  } else if (scenario === "typo") {
    scoreValues = [
      {
        name: "safe",
        value: 0,
        feedback: `Look closely at the letters inside "${domain}". That's a tiny visual tweak to fool your eyes!`,
      },
      {
        name: "sus",
        value: 0.5,
        feedback: `Good caution. This is a lookalike scam site attempting to mimic ${originalBrand}.`,
      },
      {
        name: "threat",
        value: 1,
        feedback: `Excellent catch! Messing with the spelling of "${originalBrand}" is a classic typo trap.`,
      },
    ];
  } else {
    // spoof
    scoreValues = [
      {
        name: "safe",
        value: 0,
        feedback: `Careful! Scammers put "${originalBrand}" in the front to fool you, but the real address end destination is "${domain}.${tld}".`,
      },
      {
        name: "sus",
        value: 0.5,
        feedback:
          "Nice hesitation. The layout looks official on a quick look, but the trailing root domain name is completely wrong.",
      },
      {
        name: "threat",
        value: 1,
        feedback: `Incredible eye! You saw past the fake subdomain and caught the suspicious "${domain}.${tld}" root hub.`,
      },
    ];
  }

  return {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain,
      domain,
      tld,
    },
    scoreValues,
  };
}
