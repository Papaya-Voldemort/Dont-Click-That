import { generateURLLevel } from "../functions/url";
import { generateEmailLevel } from "../functions/email";
import { generateTextLevel } from "../functions/text";

export type ScoreValue = { name: string; value: number; feedback: string };
export type contentType = "url" | "site" | "text" | "email";

export type url = {
  protocol: "https" | "http";
  subdomain: string;
  domain: string;
  tld?: string;
  path?: string;
  preview?: "checkout";
};

// HTML content I think?
export type site = {
  name: string;
  content: string;
};

export type senders = "incoming" | "outgoing";

export type text = {
  sender: senders;
  content: string;
};

export type email = {
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  body?: string;
};

export type content = url | site | text[] | email;

export type level = {
  contentType: contentType;
  content: content;
  scoreValues: ScoreValue[];
};

export function createTrainingLevels(): level[] {
  return [
    // ==========================================
    // EASY LEVELS (1 - 5)
    // ==========================================
    generateURLLevel("easy"),
    generateEmailLevel("easy"),
    generateURLLevel("easy"),
    generateTextLevel("easy"),
    generateTextLevel("easy"),

    // ==========================================
    // INTERMEDIATE LEVELS (6 - 10)
    // ==========================================
    generateURLLevel("intermediate"),
    generateEmailLevel("intermediate"),
    generateTextLevel("intermediate"),
    generateURLLevel("intermediate"),
    generateEmailLevel("intermediate"),

    // ==========================================
    // HARD LEVELS (11 - 15)
    // ==========================================
    generateURLLevel("hard"),
    generateEmailLevel("hard"),
    generateURLLevel("hard"),
    generateTextLevel("hard"),
    generateEmailLevel("hard"),
  ];
}

// Fixed examples keep a short walkthrough identical across recording takes.
export const demoLevels: level[] = [
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "paypal.com",
      domain: "login-verify",
      tld: "example",
      preview: "checkout",
    },
    scoreValues: [
      {
        name: "safe",
        value: 0,
        feedback:
          "Look past paypal.com at the start. The actual domain is login-verify.example, which does not belong to PayPal. HTTPS alone does not make a site trustworthy.",
      },
      {
        name: "sus",
        value: 0.5,
        feedback:
          "Good caution! paypal.com is only a subdomain here. The actual domain is login-verify.example, so this example is a phishing threat.",
      },
      {
        name: "threat",
        value: 1,
        feedback:
          "paypal.com is the bait. The actual domain is login-verify.example. Open the official app or type the known address yourself.",
      },
    ],
  },
  {
    contentType: "email",
    content: {
      sender: "Chase Alerts",
      email: "alerts@chase.com",
      subject: "Your monthly statement is ready",
      preview: "Open your banking app to view your statement.",
      time: "9:41 AM",
      body: "Your monthly statement is ready. Open the Chase app to view your statement for this billing period.",
    },
    scoreValues: [
      {
        name: "safe",
        value: 1,
        feedback:
          "This notice directs you to your banking app. It does not ask for your password, payment details, or a reply. A displayed sender address alone is not proof that an email is authentic.",
      },
      {
        name: "sus",
        value: 0.5,
        feedback:
          "Caution is useful. This example is safe because it tells you to open your existing app, rather than follow an unexpected link or share sensitive details.",
      },
      {
        name: "threat",
        value: 0,
        feedback:
          "This example has no request for money or credentials. Opening your existing banking app directly is the safe way to check the statement.",
      },
    ],
  },
  {
    contentType: "text",
    content: [
      { sender: "incoming", content: "Hi Sarah, are we still meeting for lunch? — Mark" },
      { sender: "outgoing", content: "Sorry, wrong number. I'm not Sarah." },
      {
        sender: "incoming",
        content:
          "Oh, sorry! You seem really nice though. What's your name? Maybe we should keep chatting.",
      },
    ],
    scoreValues: [
      {
        name: "safe",
        value: 0,
        feedback:
          "Pause before sharing personal details. An unexpected stranger trying to keep you talking can be the start of a relationship or investment scam.",
      },
      {
        name: "sus",
        value: 1,
        feedback:
          "A wrong-number message that turns into a personal conversation is suspicious. There is no direct demand yet: stop replying and avoid sharing personal information.",
      },
      {
        name: "threat",
        value: 0,
        feedback:
          "You noticed the warning sign. Suspicious is the best classification here: the stranger is building a connection, but has not yet asked for money or sent a malicious link.",
      },
    ],
  },
];
