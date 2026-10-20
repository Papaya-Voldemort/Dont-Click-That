<script lang="ts">
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";
  import { updateScreen } from "../../stores/game";
</script>

<Card>
  <div class="info-container">
    <div class="header">
      <div class="header-text">
        <h1>About & Mission</h1>
        <p class="subtitle">
          Empowering internet users to recognize digital threats before clicking.
        </p>
      </div>
      <Button
        variant="danger"
        size="sm"
        aria-label="Close info screen"
        onclick={() => updateScreen("splash")}
      >
        ✕
      </Button>
    </div>

    <div class="content-body">
      <div class="section-card">
        <h3>🏛️ Congressional App Challenge</h3>
        <p>
          <strong>Don't Click That!</strong> was built for the
          <strong>Congressional App Challenge</strong> to combat the growing epidemic of phishing, smishing,
          and domain spoofing scams targeting families and senior citizens.
        </p>
      </div>

      <div class="section-card">
        <h3>🎯 Interactive Security Education</h3>
        <p>
          Inspired by Duolingo's micro-learning approach, this tool presents real-world scenario
          simulations across three critical attack vectors:
        </p>
        <ul class="feature-list">
          <li>
            <strong>Website URLs:</strong> Identifying subtle homoglyphs, typo-squatting, and deceptive
            subdomain structures.
          </li>
          <li>
            <strong>Phishing Emails:</strong> Inspecting display name spoofing, sender domain validation,
            and urgency pressure.
          </li>
          <li>
            <strong>SMS Smishing:</strong> Spotting 2FA harvest lures, package reroute scams, and boss
            impersonation.
          </li>
        </ul>
      </div>

      <div class="section-card resources">
        <h3>🛡️ Trusted Cybersecurity Resources</h3>
        <p>To report active scams or learn more about personal digital safety:</p>
        <div class="resource-links">
          <a
            class="resource-tag"
            href="https://www.cisa.gov"
            target="_blank"
            rel="noopener noreferrer">CISA · Cybersecurity resources</a
          >
          <a
            class="resource-tag"
            href="https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams"
            target="_blank"
            rel="noopener noreferrer">FTC · Recognize phishing scams</a
          >
          <a
            class="resource-tag"
            href="https://apwg.org/reportphishing"
            target="_blank"
            rel="noopener noreferrer">APWG · Report phishing</a
          >
        </div>
      </div>
    </div>

    <div class="footer">
      <Button variant="safe" size="md" onclick={() => updateScreen("splash")}>
        ← Return to Home
      </Button>
    </div>
  </div>
</Card>

<style>
  .info-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: clamp(0.75rem, 2vw, 1.25rem);
    text-align: left;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid var(--border-divider);
    padding-bottom: 0.75rem;
    gap: 1rem;
  }

  .header-text h1 {
    font-size: clamp(1.4rem, 3.5vw, 2.2rem);
    margin: 0 0 0.25rem 0;
    color: var(--text-brand-dark);
  }

  .subtitle {
    margin: 0;
    font-size: clamp(0.85rem, 1.8vw, 1rem);
    color: var(--text-secondary);
  }

  .content-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow-y: auto;
    flex: 1;
  }

  .section-card {
    background: var(--bg-subtle, #f9fafb);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1rem;
  }

  .section-card h3 {
    margin: 0 0 0.4rem 0;
    font-size: 1rem;
    color: var(--text-dark-high);
  }

  .section-card p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-main);
    line-height: 1.45;
  }

  .feature-list {
    margin: 0.4rem 0 0 0;
    padding-left: 1.25rem;
    font-size: 0.85rem;
    color: var(--text-main);
    line-height: 1.4;
  }

  .resource-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }

  .resource-tag {
    font-size: 0.75rem;
    font-weight: 600;
    background: #edf2f7;
    color: var(--text-dark-high);
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    text-decoration: none;
  }

  .resource-tag:hover {
    text-decoration: underline;
  }

  .footer {
    display: flex;
    justify-content: flex-start;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .info-container {
      gap: 0.4rem;
    }

    .section-card {
      padding: 0.6rem 0.75rem;
    }
  }
</style>
