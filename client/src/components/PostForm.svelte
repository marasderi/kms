<script>
  let content = '';
  async function submitPost() {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      credentials: 'include',
    });
    if (res.ok) content = '';
  }
</script>

<form on:submit|preventDefault={submitPost} class="p-4 bg-white shadow rounded">
  <textarea bind:value={content} maxlength="280" class="w-full p-2 border" placeholder="Ne düşünüyorsun?"></textarea>
  <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Gönder</button>
</form>
