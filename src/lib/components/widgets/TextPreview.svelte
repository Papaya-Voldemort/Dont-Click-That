<script>
  let {
    messages = [
      { sender: "incoming", content: "Hey can I get your credit card number?" },
      { sender: "outgoing", content: "Yeah! Here is it: 324-123-3243" },
    ],
  } = $props();
</script>

<div class="textPreview">
  <div class="conversation-header">Messages <span>Unknown number</span></div>
  <div class="messages">
    {#each messages as message}
      <div class={`message ${message.sender}`}>{message.content}</div>
    {/each}
  </div>
</div>

<style>
  .textPreview {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    max-width: 38rem;
    border: 1px solid var(--card-border);
    border-radius: 16px;
    background: var(--surface-primary);
    overflow: hidden;
  }

  .conversation-header {
    padding: 0.75rem 1rem;
    background: var(--bg-subtle);
    border-bottom: 1px solid var(--card-border);
    color: var(--text-dark-high);
    font-size: 0.9rem;
    font-weight: 600;
    text-align: left;
  }

  .conversation-header span {
    display: block;
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: clamp(0.75rem, 2vw, 1.25rem);
  }

  .message {
    max-width: 85%;
    padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem);
    border-radius: 1rem;
    word-wrap: break-word;
    font-size: clamp(0.85rem, 1.8vw, 0.95rem);
    line-height: 1.35;
    text-align: left;
  }

  .incoming {
    background-color: var(--color-gray);
    align-self: flex-start;
    border-bottom-left-radius: 0.25rem;
  }

  .outgoing {
    background-color: var(--color-success);
    color: var(--text-inverted);
    align-self: flex-end;
    border-bottom-right-radius: 0.25rem;
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .messages {
      gap: 0.25rem;
    }
  }
</style>
