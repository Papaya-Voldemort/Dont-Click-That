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

type senders = "incoming" | "outgoing";

type text = {
  sender: senders;
  content: string;
}

type content = url | site | text[];


type level = {
  contentType: contentType;
  content: content;
  scoreValues: ScoreValue[];
}

export const levels: level[] = [
  {
    contentType: "text",
    content: [
      {
        sender: "incoming",
        content: "Your Apple ID has been locked due to suspicious activity. Reply with your password to restore access immediately."
      },
      {
        sender: "outgoing",
        content: "Oh no, here it is: mypassword123"
      }
    ],
    scoreValues: [
      { name: "safe", value: 0, feedback: "Incorrect. Apple will never ask for your password via text." },
      { name: "sus", value: 0.5, feedback: "Close, but requests for passwords are a major red flag." },
      { name: "threat", value: 1, feedback: "Correct! Legitimate companies never ask for passwords like this." }
    ]
  },
  {
    contentType: "text",
    content: [
      {
        sender: "incoming",
        content: "Congratulations! You've won a $500 Amazon gift card. Click here and verify your email to claim: http://amaz0n-rewards.net"
      },
      {
        sender: "outgoing",
        content: "Nice! I’ll click it and log in real quick."
      }
    ],
    scoreValues: [
      { name: "safe", value: 0, feedback: "Incorrect. Unsolicited prizes + suspicious URL is a clear scam." },
      { name: "sus", value: 0.5, feedback: "Close, but fake giveaways are a common phishing tactic." },
      { name: "threat", value: 1, feedback: "Correct! This combines urgency, reward bait, and typosquatting." }
    ]
  },
  {
    contentType: "text",
    content: [
      {
        sender: "incoming",
        content: "Hi, this is your bank. We noticed unusual activity. Please confirm your full account number and PIN."
      },
      {
        sender: "outgoing",
        content: "Sure, my account number is 448392..."
      }
    ],
    scoreValues: [
      { name: "safe", value: 0, feedback: "Incorrect. Banks never request PINs or full account numbers over text." },
      { name: "sus", value: 0.5, feedback: "Getting warmer, but financial credentials over text is always suspicious." },
      { name: "threat", value: 1, feedback: "Correct! This is a classic bank impersonation phishing attempt." }
    ]
  },
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