<script>
  export let story;
</script>

<div class="p-4 bg-white shadow rounded mb-4">
  <p class="font-bold">{story.user.username}</p>
  <p>{story.content}</p>
  <p class="text-sm text-gray-500">Son {story.expiresAt}</p>
</div>
