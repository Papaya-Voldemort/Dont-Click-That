<script>
  let {
    messages = [
      { sender: "incoming", content: "Hey can I get your credit card number?" },
      { sender: "outgoing", content: "Yeah! Here is it: 324-123-3243" },
    ],
  } = $props();
</script>

<div class="textPreview">
  <div class="messages">
    {#each messages as message}
      <div class={`message ${message.sender}`}>{message.content}</div>
    {/each}
  </div>
  <span class="input">Text Message...</span>
</div>

<style>
  .textPreview {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 1rem;
  }

  .message {
    max-width: 80%;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    word-wrap: break-word;
    font-size: 0.95rem;
    line-height: 1.3;
  }

  .incoming {
    background-color: var(--color-gray);
    align-self: flex-start;
    border-bottom-left-radius: 0.25rem;
  }

  .outgoing {
    background-color: var(--color-success);
    align-self: flex-end;
    border-bottom-right-radius: 0.25rem;
  }

  .input {
    padding: 0.75rem;
    border-top: 1px solid var(--border-divider);
    color: var(--text-muted);
    margin: 1rem;
    border-radius: var(--btn-radius);
  }
</style>
