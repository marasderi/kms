<script>
  let query = '';
  let results = [];
  async function search() {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { credentials: 'include' });
    if (res.ok) results = await res.json();
  }
</script>

<div class="p-4">
  <input bind:value={query} on:input={search} class="w-full p-2 border" placeholder="Ara..." />
  {#each results as result}
    <p>{result.type}: {result.content}</p>
  {/each}
</div>
