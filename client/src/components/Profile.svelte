<script>
  export let user;
</script>

<div class="p-4 bg-white shadow rounded">
  <img src={user.avatar || '/default-avatar.png'} alt="Avatar" class="w-24 h-24 rounded-full" />
  <h2>{user.username}</h2>
  <p>{user.about || 'Hakkında bilgi yok'}</p>
  <p>Şehir: {user.city || '-'}</p>
  <p>Meslek: {user.profession || '-'}</p>
  <p>Üye Olma: {new Date(user.createdAt).toLocaleDateString()}</p>
  <p>Post Sayısı: {user.postCount}</p>
</div>
