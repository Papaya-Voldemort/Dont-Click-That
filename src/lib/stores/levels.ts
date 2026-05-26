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

type email = {
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
}

type content = url | site | text[] | email;


type level = {
  contentType: contentType;
  content: content;
  scoreValues: ScoreValue[];
}

export const levels: level[] = [
  // ==========================================
  // EASY LEVELS (1 - 5)
  // ==========================================
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "",
      domain: "microsoft.com",
    },
    scoreValues: [
      { name: "safe", value: 1, feedback: "Spot on! This is the exact official website for Microsoft. You're completely safe here." },
      { name: "sus", value: 0.5, feedback: "You're being extra careful, which is great! But this one is actually the real deal." },
      { name: "threat", value: 0, feedback: "Don't worry! This is actually the legitimate company website, so no danger here." },
    ],
  },
  {
    contentType: "email",
    content: {
      sender: "Netflix Support",
      email: "billing@netfliix-security.com",
      subject: "Your subscription has been suspended",
      preview: "We detected a billing issue. Verify your payment information immediately to avoid account deletion.",
      time: "2:14 PM",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Careful! Look closely at the email address—'netfliix' has two 'i's. Real companies won't typo their own name." },
      { name: "sus", value: 0.5, feedback: "Great eye! That urgent 'do this right now or else' tone is a huge warning sign." },
      { name: "threat", value: 1, feedback: "Awesome catch! They are trying to scare you into rushing. Typing an extra letter in the name is a classic trick." },
    ],
  },
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "login",
      domain: "paypa1.com",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Take another look! They swapped the letter 'l' for the number '1' to trick your eyes." },
      { name: "sus", value: 0.5, feedback: "You're definitely on the right track. This is highly dangerous because of that sneaky number swap." },
      { name: "threat", value: 1, feedback: "Perfect! You spotted the number '1' hiding in 'paypa1'. That's a textbook lookalike trick." },
    ],
  },
  {
    contentType: "text",
    content: [
      {
        sender: "incoming",
        content: "CONGRATS! You won a free $1000 Walmart Gift Card! Click here to claim: http://walmart-freebies.biz"
      },
      {
        sender: "outgoing",
        content: "Wait really? Is this real?"
      }
    ],
    scoreValues: [
      { name: "safe", value: 0, feedback: "Oh no, don't trust it! Random texts promising massive free gift cards out of nowhere are always scams." },
      { name: "sus", value: 0.5, feedback: "Good instinct to question it! Free money offers from weird links are almost always too good to be true." },
      { name: "threat", value: 1, feedback: "Exactly! Real companies don't text you random thousand-dollar prizes out of the blue." }
    ]
  },
  {
    contentType: "text",
    content: [
      {
        sender: "incoming",
        content: "Hi Mom, I dropped my phone in the toilet. I'm using a friend's phone. Can you Venmo $250 to fix it? I'm stranded!"
      }
    ],
    scoreValues: [
      { name: "safe", value: 0, feedback: "Wait, hold on! This is a very common trap where scammers pretend to be a family member in distress." },
      { name: "sus", value: 0.75, feedback: "Smart thinking! If a relative texts from an unknown number asking for money, always call their normal number first to check." },
      { name: "threat", value: 1, feedback: "Outstanding! Scammers love to play on your feelings to make you send money before you have time to think." }
    ]
  },

  // ==========================================
  // INTERMEDIATE LEVELS (6 - 10)
  // ==========================================
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "apple",
      domain: "icloud-service.net",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Tricky! Even though it says 'apple' at the front, the actual website name at the end is 'icloud-service.net'." },
      { name: "sus", value: 0.5, feedback: "Nice catch! It looks a bit like Apple, but the true website domain at the very end is highly suspicious." },
      { name: "threat", value: 1, feedback: "You nailed it! Scammers put a trusted name like 'apple' at the front to hide the fake name at the end." },
    ],
  },
  {
    contentType: "email",
    content: {
      sender: "IT Helpdesk",
      email: "helpdesk@company-login.com",
      subject: "MANDATORY: Update your login password immediately",
      preview: "Due to security updates, all employees must reset their passwords by the end of the day or be locked out.",
      time: "9:00 AM",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Careful here. Real tech support teams usually have an official company email, not a generic one like 'company-login.com'." },
      { name: "sus", value: 1, feedback: "Brilliant! An aggressive deadline ('by the end of the day') combined with a weird email address is a huge red flag." },
      { name: "threat", value: 0.75, feedback: "Great job! This is designed to make workers panic and type in their passwords without checking." },
    ],
  },
  {
    contentType: "text",
    content: [
      {
        sender: "incoming",
        content: "Hi Sarah, are we still meeting for lunch today? - Mark"
      },
      {
        sender: "outgoing",
        content: "Sorry, wrong number! I'm not Sarah."
      },
      {
        sender: "incoming",
        content: "Oh, sorry! Well, you seem very polite anyway. I'm Mark, what's your name? Maybe it's fate haha"
      }
    ],
    scoreValues: [
      { name: "safe", value: 0, feedback: "Watch out! A normal person would just say 'sorry' and stop texting. Keeping the chat going is a trap." },
      { name: "sus", value: 1, feedback: "Spot on! This 'wrong number' routine is a trick to start a friendly chat, build trust, and eventually pitch a financial scam." },
      { name: "threat", value: 0.5, feedback: "Good job being cautious. They aren't asking for money yet, but they are setting the trap." }
    ]
  },
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "support",
      domain: "amazon.com",
    },
    scoreValues: [
      { name: "safe", value: 1, feedback: "Perfect! The core website name is 'amazon.com', which is completely official and safe." },
      { name: "sus", value: 0.25, feedback: "It's okay to be cautious, but 'support.amazon.com' is just a normal, safe page run by Amazon." },
      { name: "threat", value: 0, feedback: "No need to worry here! This is a totally genuine page owned by the real Amazon corporation." },
    ],
  },
  {
    contentType: "email",
    content: {
      sender: "DocuSign Support",
      email: "docusign@online-signatures.org",
      subject: "Review and Sign: Compensation Agreement",
      preview: "Please review the attached confidential document regarding your workplace payment details.",
      time: "4:50 PM",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Be careful! Real DocuSign emails will always come from their official address ending in 'docusign.com'." },
      { name: "sus", value: 0.5, feedback: "You've got great instincts. An unexpected document about your money from an '.org' email is highly suspect." },
      { name: "threat", value: 1, feedback: "Excellent work! They are using a hot topic like 'money' to make you click a fake login link." },
    ],
  },

  // ==========================================
  // HARD LEVELS (11 - 14)
  // ==========================================
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "chase.com",
      domain: "login-verify.xyz",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Look out! The website name always sits right before the '.com' or '.xyz'. The real home here is 'login-verify.xyz'." },
      { name: "sus", value: 0.25, feedback: "This is way past suspicious. Putting 'chase.com' at the front is a sneaky trick to hide a dangerous website." },
      { name: "threat", value: 1, feedback: "Incredible eye! Scammers hope you stop reading after you see 'chase.com' at the very beginning of the link." },
    ],
  },
  {
    contentType: "email",
    content: {
      sender: "School Principal",
      email: "office-urgent-msg@gmail.com",
      subject: "Quick favor needed",
      preview: "I am currently tied up in meetings all day. Can you quickly email me back? I need a swift task handled.",
      time: "11:03 AM",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Hold on! A school principal or boss won't use a random personal Gmail address to ask for urgent, secret favors." },
      { name: "sus", value: 0.5, feedback: "Great hesitation! When someone important asks for a favor from a completely random email, it's a huge warning sign." },
      { name: "threat", value: 1, feedback: "Fantastic detection! This is an 'impersonation' trick. They pretend to be someone you respect so you obey without checking." },
    ],
  },
  {
    contentType: "url",
    content: {
      protocol: "https",
      subdomain: "",
      domain: "аpple.com",
    },
    scoreValues: [
      { name: "safe", value: 0, feedback: "Oh wow, this is a master trick! That 'a' is actually a foreign alphabet character designed to look exactly like ours." },
      { name: "sus", value: 0.5, feedback: "You sensed something was off! This is a highly advanced fake link that copies letters from other languages." },
      { name: "threat", value: 1, feedback: "You are an absolute pro! This is a 'lookalike letter' attack. Visually it's a perfect match, but digitally it's a totally different fake site." },
    ],
  },
  {
    contentType: "text",
    content: [
      {
        sender: "incoming",
        content: "USPS Alert: Your package delivery has been paused due to an incorrect address. Fix it here: https://usps-post.info"
      }
    ],
    scoreValues: [
      { name: "safe", value: 0, feedback: "Don't fall for it! The real post office will only ever send you to 'usps.com', never to a '.info' address." },
      { name: "sus", value: 0.5, feedback: "Good job stopping to think. Package delivery texts are incredibly common scams right now." },
      { name: "threat", value: 1, feedback: "Spot on! Scammers send millions of these texts hoping someone in the house is actually waiting for a package." }
    ]
  }
];