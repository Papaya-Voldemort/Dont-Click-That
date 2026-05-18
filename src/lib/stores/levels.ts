type ScoreValue = { name: string; value: number };

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
      { name: "safe", value: 0 },
      { name: "sus", value: 0.5 },
      { name: "threat", value: 1 },
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
      { name: "safe", value: 0 },
      { name: "sus", value: 0.5 },
      { name: "threat", value: 1 },
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
      { name: "safe", value: 0 },
      { name: "sus", value: 0.5 },
      { name: "threat", value: 1 },
    ],
  },
];