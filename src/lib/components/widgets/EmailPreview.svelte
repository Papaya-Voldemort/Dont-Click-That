<script>
  let {
    emailInfo = {
      sender: "PayPal Security",
      email: "security-alert@paypa1-verification.com",
      subject: "Urgent: Suspicious Login Attempt Detected",
      preview: "Your account has been temporarily limited. Verify now to restore access.",
      time: "Mon, May 11, 1:50 PM",
      body: "We noticed unusual activity on your account. Please verify your identity immediately to prevent permanent suspension.",
    },
  } = $props();
</script>

<div class="emails">
  <div class="email">
    <div class="email-header">
      <h2 class="subject">{emailInfo.subject}</h2>
      <div class="tags">
        <span class="tag tag-external">External</span>
        <span class="tag tag-inbox">Inbox</span>
      </div>
    </div>

    <div class="email-meta">
      <div
        class="avatar"
        data-initial={emailInfo.sender ? emailInfo.sender[0].toUpperCase() : "?"}
      ></div>

      <div class="sender-block">
        <div class="sender-name">
          {emailInfo.sender}
          <span class="sender-email">&lt;{emailInfo.email}&gt;</span>
        </div>
        <div class="to-line">to me</div>
      </div>

      <div class="meta-right">
        <span class="time">{emailInfo.time}</span>
      </div>
    </div>
    <div class="email-body">
      <p>{emailInfo.body || emailInfo.preview}</p>
    </div>
  </div>
</div>

<style>
  .emails {
    display: flex;
    flex-direction: column;
    gap: var(--content-gap);
    font-family: var(--text-font);
    width: 100%;
    max-width: 52rem;
    margin: 0 auto;
    min-height: 0;
  }

  .email {
    background: var(--surface-primary);
    border: 1px solid var(--card-border);
    border-radius: var(--card-radius);
    padding: clamp(0.75rem, 2vw, 1.5rem);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .email-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .subject {
    font-family: var(--display-font);
    font-size: clamp(1.05rem, 2.5vw, 1.35rem);
    font-weight: 600;
    color: var(--text-main);
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .tags {
    display: flex;
    gap: 0.4rem;
    align-items: center;
  }

  .tag {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 12px;
    text-transform: capitalize;
    letter-spacing: 0.02em;
  }

  .tag-external {
    background: var(--color-warn);
    color: var(--text-dark-high);
  }

  .tag-inbox {
    background: var(--card-border);
    color: var(--text-secondary);
  }

  .email-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-divider);
    flex-wrap: wrap;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--color-safe);
    color: var(--text-inverted);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--display-font);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .avatar::before {
    content: attr(data-initial);
  }

  .sender-block {
    flex: 1;
    min-width: 140px;
  }

  .sender-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-main);
    line-height: 1.3;
    word-break: break-word;
  }

  .sender-email {
    font-weight: 400;
    color: var(--text-secondary);
    font-size: 0.8rem;
    display: inline-block;
    word-break: break-all;
  }

  .to-line {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    margin-top: 0.1rem;
  }

  .meta-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    margin-left: auto;
  }

  .time {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    font-variant-numeric: tabular-nums;
  }

  /* Body */
  .email-body {
    font-size: clamp(0.85rem, 1.8vw, 0.95rem);
    line-height: 1.5;
    color: var(--text-main);
  }

  .email-body p {
    margin: 0 0 0.75rem 0;
  }

  .email-body p:last-child {
    margin-bottom: 0;
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .email {
      padding: 0.5rem 0.75rem;
    }

    .email-meta {
      margin-bottom: 0.4rem;
      padding-bottom: 0.4rem;
    }

    .email-body {
      font-size: 0.8rem;
    }
  }
</style>
