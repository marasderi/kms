<script>
  export let userId;
  let isSubscribed = false;
  async function toggleSubscribe() {
    const res = await fetch(`/api/users/${userId}/subscribe`, {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) isSubscribed = !isSubscribed;
  }
</script>

<button on:click={toggleSubscribe} class="bg-blue-600 text-white px-4 py-2 rounded">
  {isSubscribed ? 'Aboneliği İptal Et' : 'Abone Ol'}
</button>
