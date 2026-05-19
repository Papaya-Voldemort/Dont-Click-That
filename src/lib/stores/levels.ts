type ScoreValue = { name: string; value: number; feedback: string };

type contentType = "url" | "site" | "text" | "email"

type url = {
  protocol: "https" | "http";
  subdomain: string;
  domain: string;
}

// HTMl content I think?
type site = {
  name: string;
  content: string;
}

type content = url | site;


type level = {
  contentType: contentType;
  content: content;
  scoreValues: ScoreValue[];
}

export const levels: level[] = [
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "gooooogle.com",
      domain: "realsites.xyz",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Incorrect. The subdomain 'gooooogle' is a common phishing tactic." },
      { name: "sus", value: 0.5, feedback: "Close, but this is definitely a threat. Multiple 'o's is a red flag." },
      { name: "threat", value: 1, feedback: "Correct! The typo in 'gooooogle' is a classic phishing technique." },
    ],
  },
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "",
      domain: "google.com",
    },
    scoreValues: [
      { name: "safe", value: 1, feedback: "Correct! This is the legitimate Google domain." },
      { name: "sus", value: 0.5, feedback: "This is actually safe. google.com is the real Google." },
      { name: "threat", value: 0, feedback: "Incorrect. This is Google's official domain." },
    ],
  },
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "secure-login",
      domain: "paypa1.com",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Incorrect. Notice the '1' instead of 'l' in PayPal." },
      { name: "sus", value: 0.5, feedback: "Close! This is definitely dangerous. Typosquatting domain." },
      { name: "threat", value: 1, feedback: "Correct! 'paypa1.com' mimics PayPal with a number substitution." },
    ],
  },
  {
    contentType: "url",
    content: {
      protocol: "http",
      subdomain: "account",
      domain: "amazon-verify.net",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Incorrect. The .net domain and 'verify' subdomain are red flags." },
      { name: "sus", value: 0.5, feedback: "Getting there! Amazon uses .com, not .net. Also uses HTTP, not HTTPS." },
      { name: "threat", value: 1, feedback: "Correct! Amazon uses .com, not .net, and always uses HTTPS." },
    ],
  },
];