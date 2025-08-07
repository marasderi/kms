<script>
  export let comment;
</script>

<div class="p-2 bg-gray-50 rounded mb-2">
  <p class="font-bold">{comment.user.username}</p>
  <p>{comment.content}</p>
</div>
