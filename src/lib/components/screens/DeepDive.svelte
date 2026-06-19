<script lang="ts">
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";
  import { gameState, nextLevel, updateScreen } from "../../stores/game";
  import { levels } from "../../stores/levels";
  import type { url as UrlType, email as EmailType, text as TextType } from "../../stores/levels";

  const levelData = levels[$gameState.currentLv];
  const contentType = levelData.contentType;

  const url = contentType === "url" ? (levelData.content as UrlType) : null;
  const email = contentType === "email" ? (levelData.content as EmailType) : null;
  const textMessages = contentType === "text" ? (levelData.content as TextType[]) : null;

  const correctAnswer = levelData.scoreValues.find((s) => s.value === 1);
  const correctName = correctAnswer?.name ?? "safe";
  const feedback = correctAnswer?.feedback ?? "";
  const emailDomain = $derived(
    email?.email.includes("@") ? email.email.split("@")[1] : email?.email,
  );

  function goBack() {
    updateScreen("info");
  }
</script>

<Card>
  <div class="deep-dive-container">
    <div class="header">
      <h1>Deep Dive Analysis</h1>
      <p class="subtitle">Understanding the details of Level {$gameState.currentLv + 1}</p>
    </div>

    <div class="content-display">
      {#if contentType === "url" && url}
        <div class="url-analysis">
          <div class="url-bar-styled">
            <span class="part protocol">{url.protocol}://</span>
            {#if url.subdomain}
              <span class="part subdomain">{url.subdomain}.</span>
            {/if}
            <span class="part domain" class:flagged={correctName !== "safe"}
              >{url.domain}{url.tld ? "." + url.tld : ""}</span
            >
          </div>

          <div class="breakdown">
            <h3>URL Structure Breakdown</h3>
            <div class="breakdown-grid">
              <div class="breakdown-item">
                <span class="term protocol">Protocol</span>
                <span class="value"><code>{url.protocol}://</code></span>
                <span class="desc">
                  Uses encryption to secure the connection.
                  <strong class="warning-text">Crucial:</strong> Today, almost all phishing sites
                  also use HTTPS. It does <em>not</em> guarantee a site is safe!
                </span>
              </div>

              {#if url.subdomain}
                <div class="breakdown-item">
                  <span class="term subdomain">Subdomain</span>
                  <span class="value"><code>{url.subdomain}</code></span>
                  <span class="desc">
                    An optional prefix. Scammers often use sneaky subdomains like <code
                      >chase.com</code
                    >
                    inside a larger fake domain (e.g. <code>chase.com.login-verify.xyz</code>) to
                    trick you.
                  </span>
                </div>
              {/if}

              <div class="breakdown-item">
                <span class="term domain" class:flagged={correctName !== "safe"}>Domain Name</span>
                <span class="value"><code>{url.domain}{url.tld ? "." + url.tld : ""}</code></span>
                <span class="desc">
                  The actual, registered owner of the site. This is the only part that guarantees
                  who you are talking to.
                  {#if correctName !== "safe"}
                    Here, it is fake or spoofed (e.g. lookalike letters or wrong domains).
                  {:else}
                    This is the legitimate company's official domain.
                  {/if}
                </span>
              </div>
            </div>
          </div>
        </div>
      {:else if contentType === "email" && email}
        <div class="email-analysis">
          <div class="email-bar-styled">
            <div class="email-row">
              <span class="label">Sender:</span>
              <span class="val name">{email.sender}</span>
            </div>
            <div class="email-row">
              <span class="label">Email Address:</span>
              <span class="val address" class:flagged={correctName !== "safe"}
                >&lt;{email.email}&gt;</span
              >
            </div>
            <div class="email-row">
              <span class="label">Subject:</span>
              <span class="val subject">{email.subject}</span>
            </div>
            {#if email.preview}
              <div class="email-row">
                <span class="label">Message:</span>
                <span class="val preview">{email.preview}</span>
              </div>
            {/if}
          </div>

          <div class="breakdown">
            <h3>Email Breakdown</h3>
            <div class="breakdown-grid">
              <div class="breakdown-item">
                <span class="term sender-display">Display Name</span>
                <span class="value">{email.sender}</span>
                <span class="desc">
                  This can be set to literally anything. Scammers easily set their name to "Netflix"
                  or "PayPal" to make the email look authentic at first glance.
                </span>
              </div>

              <div class="breakdown-item">
                <span class="term email-address" class:flagged={correctName !== "safe"}
                  >Actual Email Domain</span
                >
                <span class="value"><code>{emailDomain}</code></span>
                <span class="desc">
                  Check the domain after the <code>@</code> symbol.
                  {#if correctName !== "safe"}
                    Notice the subtle typo or mismatch. Real companies will never send official
                    alerts from non-official domains.
                  {:else}
                    This matches the official company domain.
                  {/if}
                </span>
              </div>
            </div>
          </div>
        </div>
      {:else if contentType === "text" && textMessages}
        <div class="text-analysis">
          <div class="text-bar-styled">
            {#each textMessages as msg}
              <div class="msg-bubble" class:incoming={msg.sender === "incoming"}>
                <div class="bubble-sender">{msg.sender === "incoming" ? "Sender" : "You"}</div>
                <div class="bubble-content">{msg.content}</div>
              </div>
            {/each}
          </div>

          <div class="breakdown">
            <h3>Text Message Analysis</h3>
            <div class="breakdown-grid">
              <div class="breakdown-item">
                <span class="term incoming">Urgency & Bait</span>
                <span class="desc">
                  Scammers often use scare tactics ("Your package is paused", "Hi Mom, I'm
                  stranded") or promise free items to make you react emotionally before thinking.
                </span>
              </div>
              <div class="breakdown-item">
                <span class="term link">Suspicious Links</span>
                <span class="desc">
                  Smishing texts contain links designed to steal your credentials or install
                  malware. Always verify the domain name or contact the sender through official
                  channels.
                </span>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <div class="other-analysis">
          <p>Analysis for <strong>{contentType}</strong> is coming soon.</p>
        </div>
      {/if}
    </div>

    <div
      class="feedback-section"
      class:safe={correctName === "safe"}
      class:sus={correctName === "sus"}
      class:threat={correctName === "threat"}
    >
      <div class="verdict">
        <h3>Verdict & Explanation</h3>
        <span
          class="badge"
          class:safe={correctName === "safe"}
          class:sus={correctName === "sus"}
          class:threat={correctName === "threat"}
        >
          {correctName.toUpperCase()}
        </span>
      </div>
      <p class="feedback-text">{feedback}</p>
    </div>

    <div class="footer">
      <Button variant="default" onclick={goBack}>Return to Game</Button>
      <Button variant="safe" onclick={nextLevel}>Next Level</Button>
    </div>
  </div>
</Card>

<style>
  .deep-dive-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    gap: 1.5rem;
  }

  .header {
    text-align: center;
    position: relative;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-divider, #dddddd);
  }

  .badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    margin-bottom: 0.5rem;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  .badge.safe {
    background: var(--color-success, #58cc02);
    color: var(--text-inverted, #ffffff);
  }

  .badge.sus {
    background: var(--color-warn, #ffc800);
    color: var(--text-dark-high, #1f2937);
  }

  .badge.threat {
    background: var(--color-danger, #ff4b4b);
    color: var(--text-inverted, #ffffff);
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0;
    color: var(--text-dark-high, #1f2937);
  }

  .subtitle {
    font-size: 0.9rem;
    color: var(--text-secondary, #6b7280);
    margin: 0.25rem 0 0 0;
  }

  .content-display {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  /* URL styling */
  .url-bar-styled {
    display: flex;
    align-items: center;
    padding: 0.85rem 1.25rem;
    background-color: var(--bg-subtle, #f9f9f9);
    border: 2px solid var(--card-border, #e5e7eb);
    border-radius: 12px;
    font-family: var(--mono-font, monospace);
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
    overflow-x: auto;
  }

  .part.protocol {
    color: var(--text-muted, #888888);
  }

  .part.subdomain {
    color: var(--text-secondary, #6b7280);
  }

  .part.domain {
    font-weight: 700;
    color: var(--text-brand-dark, #222222);
    padding: 0 2px;
    border-radius: 4px;
  }

  .part.domain.flagged {
    display: inline-block;
    background-color: color-mix(in srgb, var(--color-danger, #ff4b4b) 15%, transparent);
    color: var(--color-danger, #ff4b4b);
    text-decoration: underline wavy var(--color-danger, #ff4b4b) 1.5px;
    text-underline-offset: 4px;
  }

  /* Email styling */
  .email-bar-styled {
    background-color: var(--bg-subtle, #f9f9f9);
    border: 2px solid var(--card-border, #e5e7eb);
    border-radius: 12px;
    padding: 1rem;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 180px;
    overflow-y: auto;
  }

  .email-row {
    display: flex;
    gap: 0.5rem;
  }

  .email-row .label {
    font-weight: 600;
    color: var(--text-secondary, #6b7280);
    width: 120px;
    flex-shrink: 0;
  }

  .email-row .val {
    color: var(--text-dark-high, #1f2937);
  }

  .email-row .address.flagged {
    color: var(--color-danger, #ff4b4b);
    font-weight: 600;
    background-color: color-mix(in srgb, var(--color-danger, #ff4b4b) 15%, transparent);
    padding: 0 4px;
    border-radius: 4px;
  }

  /* Text analysis bubble styling */
  .text-bar-styled {
    background-color: var(--bg-subtle, #f9f9f9);
    border: 2px solid var(--card-border, #e5e7eb);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 180px;
    overflow-y: auto;
  }

  .msg-bubble {
    max-width: 80%;
    padding: 0.75rem 1rem;
    border-radius: 16px;
    font-size: 0.9rem;
    line-height: 1.4;
    align-self: flex-end;
    background-color: var(--color-success, #58cc02);
    color: var(--text-main);
  }

  .msg-bubble.incoming {
    align-self: flex-start;
    background-color: var(--color-gray, #d1d5db);
    color: var(--text-dark-high, #1f2937);
  }

  .bubble-sender {
    font-size: 0.7rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    opacity: 0.8;
    text-transform: uppercase;
  }

  /* Breakdown items */
  .breakdown h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    color: var(--text-dark-high, #1f2937);
  }

  .breakdown-grid {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .breakdown-item {
    background: transparent;
    border: 1px solid var(--card-border, #e5e7eb);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  }

  .term {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary, #6b7280);
  }

  .term.protocol {
    color: var(--text-muted, #888888);
  }

  .term.subdomain {
    color: var(--text-secondary, #6b7280);
  }

  .term.domain {
    color: var(--text-dark-high, #1f2937);
  }

  .term.flagged {
    color: var(--color-danger, #ff4b4b);
  }

  .value {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .desc {
    font-size: 0.85rem;
    color: var(--text-main, #4b4b4b);
    line-height: 1.5;
  }

  .warning-text {
    color: var(--color-danger, #ff4b4b);
  }

  /* Verdict section */
  .feedback-section {
    padding: 1rem;
    border-radius: 0 8px 8px 0;
  }

  .feedback-section.safe {
    background: color-mix(in srgb, var(--color-success, #58cc02) 8%, transparent);
    border-left: 4px solid var(--color-success, #58cc02);
  }
  .feedback-section.sus {
    background: color-mix(in srgb, var(--color-warn, #ffc800) 12%, transparent);
    border-left: 4px solid var(--color-warn, #ffc800);
  }
  .feedback-section.threat {
    background: color-mix(in srgb, var(--color-danger, #ff4b4b) 8%, transparent);
    border-left: 4px solid var(--color-danger, #ff4b4b);
  }

  .feedback-section h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-dark-high, #1f2937);
  }

  .feedback-text {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-main, #4b4b4b);
  }

  .verdict {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  code {
    font-family: var(--mono-font, monospace);
    background-color: var(--bg-subtle, #f9f9f9);
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }
</style>
