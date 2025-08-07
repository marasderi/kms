<script>
  export let post;
</script>

<div class="p-4 bg-white shadow rounded mb-4">
  <p class="font-bold">{post.user.username}</p>
  <p>{post.content}</p>
  <button class="text-blue-600">Beğen ({post.likes})</button>
</div>
