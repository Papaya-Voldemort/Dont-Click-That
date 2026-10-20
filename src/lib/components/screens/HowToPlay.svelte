<script lang="ts">
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";
  import { startGame, updateScreen } from "../../stores/game";
</script>

<Card>
  <div class="how-to-play-container">
    <div class="header">
      <div class="header-text">
        <h1>How to Play</h1>
        <p class="subtitle">
          Master the art of spotting scams, phishing links, and social engineering.
        </p>
      </div>
      <Button
        variant="danger"
        size="sm"
        aria-label="Close how to play"
        onclick={() => updateScreen("splash")}
      >
        ✕
      </Button>
    </div>

    <div class="guide-grid">
      <div class="guide-card safe-card">
        <div class="pill safe-pill">SAFE</div>
        <h3>Legitimate Communications</h3>
        <p>Verified domains, official notification addresses, and non-urgent standard updates.</p>
      </div>

      <div class="guide-card sus-card">
        <div class="pill sus-pill">SUSPICIOUS</div>
        <h3>Unusual Requests</h3>
        <p>
          Unexpected contacts, strange conversation hooks, or requests that require secondary
          verification.
        </p>
      </div>

      <div class="guide-card threat-card">
        <div class="pill threat-pill">THREAT</div>
        <h3>Active Phishing & Scams</h3>
        <p>Spoofed root domains, typo traps, urgent credential resets, and gift card demands.</p>
      </div>
    </div>

    <div class="tips-section">
      <h3>💡 3 Golden Rules for Staying Safe</h3>
      <ul>
        <li>
          <strong>Check the Whole Domain:</strong> In <code>chase.com.fake-login.example</code>, the
          registered domain is <code>fake-login.example</code>. Compare it with a known address.
          HTTPS alone does not prove trust.
        </li>
        <li>
          <strong>Verify Unexpected Requests:</strong> Sender names and addresses can be spoofed. Confirm
          requests for money or passwords through an app or phone number you already trust.
        </li>
        <li>
          <strong>Resist Artificial Panic:</strong> Scammers manufacture fake deadlines ("within 24 hours")
          to bypass your critical thinking.
        </li>
      </ul>
    </div>

    <div class="footer">
      <Button variant="success" size="lg" onclick={() => startGame()}>▶ Start Challenge</Button>
    </div>
  </div>
</Card>

<style>
  .how-to-play-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: clamp(0.75rem, 2vw, 1.5rem);
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

  .guide-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (min-width: 640px) {
    .guide-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .guide-card {
    background: var(--bg-subtle, #f9fafb);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .pill {
    align-self: flex-start;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.15rem 0.5rem;
    border-radius: 6px;
    letter-spacing: 0.04em;
  }

  .safe-pill {
    background: var(--color-safe);
    color: var(--text-inverted);
  }

  .sus-pill {
    background: var(--color-warn);
    color: var(--text-dark-high);
  }

  .threat-pill {
    background: var(--color-danger);
    color: var(--text-inverted);
  }

  .guide-card h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-dark-high);
  }

  .guide-card p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-main);
    line-height: 1.4;
  }

  .tips-section {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem;
  }

  .tips-section h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: var(--text-dark-high);
  }

  .tips-section ul {
    margin: 0;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: var(--text-main);
    line-height: 1.4;
  }

  code {
    font-family: var(--mono-font, monospace);
    background: #edf2f7;
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .how-to-play-container {
      gap: 0.5rem;
    }

    .tips-section {
      display: none;
    }
  }
</style>
