import { type level, type ScoreValue } from "../stores/levels";

interface EmailTemplate {
  sender: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  isScam: boolean;
  correctAnswer: "safe" | "sus" | "threat";
  feedbackSafe: string;
  feedbackSus: string;
  feedbackThreat: string;
}

// Generate a random time string
function getRandomTime(): string {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const ampm = Math.random() > 0.5 ? "AM" : "PM";
  return `${hours}:${minutes} ${ampm}`;
}

const easyTemplates: EmailTemplate[] = [
  {
    sender: "Google Security",
    email: "no-reply@accounts.google.com",
    subject: "New sign-in on Android Device",
    preview: "A new sign-in was detected on a Samsung Galaxy S21 device. If this was you, no action is needed.",
    body: "Your Google Account was recently signed into from a new device in Chicago, IL. If this was you, you can ignore this email. If not, please secure your account immediately.",
    isScam: false,
    correctAnswer: "safe",
    feedbackSafe: "Spot on! This comes from the official 'no-reply@accounts.google.com' address and is a standard security alert.",
    feedbackSus: "It's always good to check security alerts, but this one is legitimate. You can verify this in your actual Google Account settings.",
    feedbackThreat: "Don't worry! This is a real security notification from Google, not a threat.",
  },
  {
    sender: "Spotify Support",
    email: "no-reply@spotify.com",
    subject: "Your Premium Subscription Has Been Renewed",
    preview: "Thanks for being a premium member! Your invoice details and next billing date are attached below.",
    body: "We have successfully processed your monthly Premium subscription payment of $10.99. Your next renewal date is next month. Happy listening!",
    isScam: false,
    correctAnswer: "safe",
    feedbackSafe: "Correct! The sender address 'no-reply@spotify.com' matches Spotify's official domain perfectly.",
    feedbackSus: "A bit cautious! While billing emails can be targets for scams, this one is completely legitimate.",
    feedbackThreat: "No need to panic! This is an authentic subscription renewal receipt from Spotify.",
  },
  {
    sender: "Netflix Billing",
    email: "billing@netfliix-security.com",
    subject: "Your subscription is suspended: Update payment method",
    preview: "We were unable to process your monthly payment. Please verify your payment details immediately.",
    body: "To prevent your Netflix account from being closed, click the link below to update your credit card details immediately. Fail to do so within 24 hours and your profile will be permanently deleted.",
    isScam: true,
    correctAnswer: "threat",
    feedbackSafe: "Oh no! Watch out for 'netfliix' with two 'i's. Major brands don't typo their own domain name.",
    feedbackSus: "You're right to be suspicious of the urgent tone, but this is a direct phishing threat aiming to steal your credit card details.",
    feedbackThreat: "Excellent! The double 'i' in 'netfliix' and the threat of deletion within 24 hours are major phishing indicators.",
  },
  {
    sender: "Amazon Rewards",
    email: "promotions@amazon-giftcards-freebies.xyz",
    subject: "CONGRATS: You have been selected to receive a $500 Gift Card!",
    preview: "You won our monthly lucky drawing! Claim your free gift card before the link expires.",
    body: "Congratulations! You have been randomly selected from our active customer list to receive a $500 Amazon Gift Card. Click here to confirm your mailing address and claim your prize.",
    isScam: true,
    correctAnswer: "threat",
    feedbackSafe: "Stop! Never trust random emails promising massive free gift cards, especially from strange '.xyz' domains.",
    feedbackSus: "Good eye! While it is highly suspicious, this is an active phishing attempt to harvest your personal information.",
    feedbackThreat: "Fantastic catch! Amazon will never mail you from a '.xyz' domain offering random huge gift cards.",
  },
];

const intermediateTemplates: EmailTemplate[] = [
  {
    sender: "Chase Alerts",
    email: "alerts@chase.com",
    subject: "Your monthly credit card statement is now available online",
    preview: "Your statement for the billing period ending this month is ready for viewing in your Chase Mobile app.",
    body: "Please log in to your Chase online portal or open the Chase mobile app to view your statement and make a payment. Your payment is due in 25 days.",
    isScam: false,
    correctAnswer: "safe",
    feedbackSafe: "Perfect! 'alerts@chase.com' is the official communications domain for Chase Bank. This contains no malicious links.",
    feedbackSus: "A bank statement notification is standard, but keeping an eye out is good practice. This one is safe.",
    feedbackThreat: "This email is actually safe. It doesn't contain immediate threat warnings or ask for emergency password inputs.",
  },
  {
    sender: "LinkedIn Network",
    email: "messages-noreply@linkedin.com",
    subject: "You have 3 new pending invitations to connect",
    preview: "See who wants to join your professional network on LinkedIn and review their profiles.",
    body: "Grow your network! You have 3 new professional connection requests waiting for your approval. Sign in to accept or decline.",
    isScam: false,
    correctAnswer: "safe",
    feedbackSafe: "Great job! This is a standard notification email from the authentic 'messages-noreply@linkedin.com' address.",
    feedbackSus: "This is a legitimate LinkedIn update. However, always make sure to log in directly via the app or browser to accept requests.",
    feedbackThreat: "This is a normal LinkedIn alert, not a phishing attack. The email domain is correct.",
  },
  {
    sender: "IT Service Desk",
    email: "admin-alert@internal-company.com",
    subject: "MANDATORY: Update your employee password immediately",
    preview: "Due to emergency server maintenance, all team members must reset credentials by end of day.",
    body: "Our IT department is conducting urgent security patches. Click the link below to verify your current password and set a new one. Failure to do so by 5:00 PM today will result in account suspension.",
    isScam: true,
    correctAnswer: "sus",
    feedbackSafe: "Be careful! An aggressive timeline ('by 5:00 PM today') demanding passwords is a classic internal phishing tactic.",
    feedbackSus: "Brilliant! Urgent internal company login warnings requesting quick credential resets are highly suspicious. Verify with IT directly.",
    feedbackThreat: "Great job flagging this. It's a phishing setup, though reporting it as highly suspicious to your security team is the best course of action.",
  },
  {
    sender: "DocuSign Signatures",
    email: "docusign@online-signatures.org",
    subject: "Review and Sign: 2026 Compensation and Bonus Plan",
    preview: "Please review and electronically sign this confidential document regarding your salary adjustments.",
    body: "You have received a new document from Human Resources. Click 'Review Document' to sign. Access code: DS-88371-B.",
    isScam: true,
    correctAnswer: "threat",
    feedbackSafe: "Watch out! Real DocuSign notifications always originate from their official domain ending in 'docusign.com', never '.org'.",
    feedbackSus: "Good job pausing. This uses a highly tempting subject line ('Compensation and Bonus') and a lookalike email address to steal your corporate credentials.",
    feedbackThreat: "Incredible eye! Scammers use '.org' domains and hot topics like 'bonuses' to trick employees into signing into fake portals.",
  },
];

const hardTemplates: EmailTemplate[] = [
  {
    sender: "Svelte Newsletters",
    email: "newsletters@svelte.dev",
    subject: "Svelte 5 Release Candidate & State Rune Updates",
    preview: "Read about the latest updates to Svelte, compiler optimizations, and community-created components.",
    body: "The Svelte team is excited to share the latest changes to the compiler. Learn about the new rune syntax and how to migrate your existing projects today.",
    isScam: false,
    correctAnswer: "safe",
    feedbackSafe: "Spot on! The domain 'svelte.dev' is the official site for Svelte framework. This newsletter is totally safe.",
    feedbackSus: "You're playing it extremely safe! This developer newsletter is legit, though verifying the sender's domain is always smart.",
    feedbackThreat: "No threat here! It is a standard developer update mailing from the authentic svelte.dev team.",
  },
  {
    sender: "UPS Notifications",
    email: "no-reply@ups.com",
    subject: "UPS Ship Notification, Tracking Number: 1Z999AA10123456784",
    preview: "Your package is scheduled for delivery tomorrow. Manage your preferences in UPS My Choice.",
    body: "Your package from ONLINE MERCHANDISE DEPT is on its way. You can track your shipment online or reschedule delivery using your official UPS account dashboard.",
    isScam: false,
    correctAnswer: "safe",
    feedbackSafe: "Outstanding! This is a legitimate shipping alert directly from UPS's official 'no-reply@ups.com' email address.",
    feedbackSus: "Shipping alerts are frequently spoofed, but the matching domain and lack of shady action links verify this is safe.",
    feedbackThreat: "This package notification is actually real! It doesn't contain any malicious files or domain spoofing.",
  },
  {
    sender: "School Principal",
    email: "office-urgent-msg@gmail.com",
    subject: "Quick favor needed",
    preview: "I'm in back-to-back meetings today. Can you handle a quick task for me via email?",
    body: "Hello, I am currently tied up in meetings and cannot take calls. I need you to purchase three Apple gift cards ($100 each) for an upcoming staff reward. Please email me the voucher codes as soon as you have them. I will reimburse you tomorrow.",
    isScam: true,
    correctAnswer: "threat",
    feedbackSafe: "Do not buy those! A school principal or manager will never ask you to buy gift cards using a generic Gmail account.",
    feedbackSus: "Excellent caution. This is an impersonation phishing scam. You should confirm through their official school/work phone number.",
    feedbackThreat: "Incredible catch! Scammers impersonate authority figures (bosses, teachers, principals) using personal Gmail accounts to demand gift cards.",
  },
  {
    sender: "FedEx Delivery",
    email: "support@fedex-shipping-support.com",
    subject: "Delivery Alert: Package address correction required",
    preview: "We were unable to deliver your package today due to an incorrect postal code. Correct it immediately.",
    body: "To reschedule delivery, click the tracking portal link below and verify your home address. A holding fee of $1.50 may apply for packages stored over 48 hours.",
    isScam: true,
    correctAnswer: "threat",
    feedbackSafe: "Stop! FedEx will never email you from 'fedex-shipping-support.com'. Their official domain is simply 'fedex.com'.",
    feedbackSus: "Right to hesitate! The holding fee and non-standard domain are massive red flags.",
    feedbackThreat: "Perfect! Scammers register domains like 'fedex-shipping-support.com' to look official, then charge fake fees and collect address details.",
  },
];

export function generateEmailLevel(difficulty: "easy" | "intermediate" | "hard"): level {
  let pool = easyTemplates;
  if (difficulty === "intermediate") {
    pool = intermediateTemplates;
  } else if (difficulty === "hard") {
    pool = hardTemplates;
  }

  // Pick a random template from the pool
  const template = pool[Math.floor(Math.random() * pool.length)];

  // Set up score values based on correct answer and isScam status
  const scoreValues: ScoreValue[] = [
    {
      name: "safe",
      value: template.correctAnswer === "safe" ? 1 : 0,
      feedback: template.feedbackSafe,
    },
    {
      name: "sus",
      value: template.correctAnswer === "sus" ? 1 : 0.5,
      feedback: template.feedbackSus,
    },
    {
      name: "threat",
      value: template.correctAnswer === "threat" ? 1 : 0,
      feedback: template.feedbackThreat,
    },
  ];

  return {
    contentType: "email",
    content: {
      sender: template.sender,
      email: template.email,
      subject: template.subject,
      preview: template.preview,
      time: getRandomTime(),
      body: template.body,
    },
    scoreValues,
  };
}
