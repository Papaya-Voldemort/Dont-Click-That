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

export const levels: level[] = [
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

