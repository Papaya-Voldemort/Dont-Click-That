<script>
  let {
    emailInfo = {
      sender: "PayPal Security",
      email: "security-alert@paypa1-verification.com",
      subject: "Urgent: Suspicious Login Attempt Detected",
      preview:
        "Your account has been temporarily limited. Verify now to restore access.",
      time: "Mon, May 11, 1:50 PM",
      body: "We noticed unusual activity on your account. Please verify your identity immediately to prevent permanent suspension.",
    },
  } = $props();
</script>

<div class="emails">
  <div class="email">
    <!-- Header: Subject + Tags -->
    <div class="email-header">
      <h2 class="subject">{emailInfo.subject}</h2>
      <div class="tags">
        <span class="tag tag-external">External</span>
        <span class="tag tag-inbox">Inbox</span>
      </div>
    </div>

    <!-- Meta Bar: Avatar, Sender, Time, Actions -->
    <div class="email-meta">
      <div class="avatar" data-initial="P"></div>

      <div class="sender-block">
        <div class="sender-name">
          {emailInfo.sender}
          <span class="sender-email">&lt;{emailInfo.email}&gt;</span>
        </div>
        <div class="to-line">to me</div>
      </div>

      <div class="meta-right">
        <span class="time">{emailInfo.time}</span>
        <div class="actions">
          <button class="action-btn" title="Star">★</button>
          <button class="action-btn" title="Emoji">☺</button>
          <button class="action-btn" title="Reply">↩</button>
          <button class="action-btn" title="More">⋮</button>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="email-body">
      <p>{emailInfo.preview}</p>
      <p>{emailInfo.body}</p>
    </div>
  </div>
</div>

<style>
  .emails {
    display: flex;
    flex-direction: column;
    gap: var(--content-gap);
    font-family: var(--text-font);
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }

  .email {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: var(--card-radius);
    padding: 1.5rem 2rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  /* Header: Subject line + tags */
  .email-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .subject {
    font-family: var(--display-font);
    font-size: 1.375rem;
    font-weight: 500;
    color: var(--text-main);
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .tag {
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    text-transform: capitalize;
    letter-spacing: 0.02em;
  }

  .tag-external {
    background: #ffc800;
    color: #1f2937;
  }

  .tag-inbox {
    background: #e5e7eb;
    color: #4b5563;
  }

  /* Meta bar: Avatar, sender, time */
  .email-meta {
    display: flex;
    align-items: start;
    gap: 0.875rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-safe);
    color: var(--text-inverted);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--display-font);
    font-size: 1.125rem;
    font-weight: 600;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .avatar::before {
    content: attr(data-initial);
  }

  .sender-block {
    flex: 1;
    min-width: 0;
  }

  .sender-name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-main);
    line-height: 1.4;
  }

  .sender-email {
    font-weight: 400;
    color: #6b7280;
    font-size: 0.875rem;
    margin-left: 0.25rem;
  }

  .to-line {
    font-size: 0.8125rem;
    color: #9ca3af;
    margin-top: 0.125rem;
  }

  .meta-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .time {
    font-size: 0.8125rem;
    color: #9ca3af;
    font-variant-numeric: tabular-nums;
  }

  .actions {
    display: flex;
    gap: 0.25rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #6b7280;
    transition: background 0.15s;
  }

  .action-btn:hover {
    background: #f3f4f6;
  }

  /* Body */
  .email-body {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--text-main);
  }

  .email-body p {
    margin: 0 0 1rem 0;
  }

  .email-body p:last-child {
    margin-bottom: 0;
  }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    .email {
      background: #1f2937;
      border-color: #374151;
    }

    .subject {
      color: #f9fafb;
    }
    .tag-inbox {
      background: #374151;
      color: #d1d5db;
    }
    .sender-name {
      color: #f9fafb;
    }
    .sender-email {
      color: #9ca3af;
    }
    .to-line {
      color: #6b7280;
    }
    .time {
      color: #6b7280;
    }
    .email-body {
      color: #d1d5db;
    }
    .email-meta {
      border-bottom-color: #374151;
    }
    .action-btn {
      color: #9ca3af;
    }
    .action-btn:hover {
      background: #374151;
    }
  }
</style>
