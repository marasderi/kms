<script>
  import { HomeIcon, UsersIcon, DocumentTextIcon, CollectionIcon, SpeakerphoneIcon, QuestionMarkCircleIcon } from '@heroicons/svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  let user = null;
  let users = [];
  let posts = [];
  let categories = [];
  let announcements = [];
  let selectedSection = 'dashboard';

  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: HomeIcon },
    { id: 'users', label: 'Kullanıcılar', icon: UsersIcon, children: [{ id: 'user-list', label: 'Kullanıcı Listesi' }, { id: 'user-ban', label: 'Engelleme' }, { id: 'user-roles', label: 'Rol Yönetimi' }] },
    { id: 'posts', label: 'Gönderiler', icon: DocumentTextIcon, children: [{ id: 'post-list', label: 'Gönderi Listesi' }, { id: 'post-moderation', label: 'Moderasyon' }] },
    { id: 'categories', label: 'Kategoriler', icon: CollectionIcon, children: [{ id: 'category-list', label: 'Kategori Listesi' }, { id: 'category-add', label: 'Yeni Kategori' }] },
    { id: 'announcements', label: 'Duyurular', icon: SpeakerphoneIcon, children: [{ id: 'announcement-list', label: 'Duyuru Listesi' }, { id: 'announcement-add', label: 'Yeni Duyuru' }] },
    { id: 'faq', label: 'Sık Sorulan Sorular', icon: QuestionMarkCircleIcon },
  ];

  onMount(async () => {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      user = await res.json();
      if (!['admin', 'moderator', 'category_moderator'].includes(user.role)) {
        goto('/');
      }
    } else {
      goto('/login');
    }

    if (selectedSection === 'users') {
      const userRes = await fetch('/api/users', { credentials: 'include' });
      if (userRes.ok) users = await userRes.json();
    } else if (selectedSection === 'posts') {
      const postRes = await fetch('/api/posts', { credentials: 'include' });
      if (postRes.ok) posts = await postRes.json();
    } else if (selectedSection === 'categories') {
      const catRes = await fetch('/api/categories', { credentials: 'include' });
      if (catRes.ok) categories = await catRes.json();
    } else if (selectedSection === 'announcements') {
      const annRes = await fetch('/api/announcements', { credentials: 'include' });
      if (annRes.ok) announcements = await annRes.json();
    }
  });

  function selectSection(section) {
    selectedSection = section;
  }

  async function moderatePost(postId, isVisible, note) {
    const res = await fetch(`/api/posts/${postId}/moderate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVisible, moderationNote: note }),
      credentials: 'include',
    });
    if (res.ok) {
      posts = posts.map(p => p.id === postId ? { ...p, isVisible, moderationNote: note } : p);
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
  <header class="bg-white p-4 shadow">
    <h1 class="text-2xl font-bold text-blue-600">Yönetim Paneli</h1>
    <p class="text-gray-500">Kamu Mikroblog Yönetimi</p>
  </header>

  <div class="flex flex-1 p-4">
    <aside class="w-1/4 bg-white shadow p-4 mr-4">
      <nav>
        <ul class="space-y-2">
          {#each menuItems as item}
            <li>
              <button on:click={() => selectSection(item.id)} class="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center">
                <svelte:component this={item.icon} class="h-5 w-5 mr-2 text-gray-600" />
                {item.label}
              </button>
              {#if item.children}
                <ul class="pl-6 mt-1 space-y-1">
                  {#each item.children as child}
                    <li>
                      <button on:click={() => selectSection(child.id)} class="w-full text-left p-2 hover:bg-gray-100 rounded flex items-center text-sm">
                        {child.label}
                      </button>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>
    </aside>

    <main class="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#if selectedSection === 'dashboard'}
        <div class="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600 transition">
          <HomeIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Genel Bakış</h2>
          <p>Toplam Kullanıcı: {users.length}</p>
          <p>Toplam Gönderi: {posts.length}</p>
        </div>
      {:else if selectedSection === 'post-moderation'}
        <div class="bg-orange-500 text-white p-4 rounded shadow hover:bg-orange-600 transition">
          <DocumentTextIcon class="h-8 w-8 mb-2" />
          <h2 class="text-lg font-semibold">Gönderi Moderasyonu</h2>
          {#each posts as post}
            <div class="p-2 bg-white text-black rounded mb-2">
              <p>{post.content.substring(0, 50)}...</p>
              <p>Yazar: {post.User.username}</p>
              <select bind:value={post.isVisible} on:change={() => moderatePost(post.id, post.isVisible, post.moderationNote)}>
                <option value={true}>Görünür</option>
                <option value={false}>Gizli</option>
              </select>
              <textarea bind:value={post.moderationNote} placeholder="Moderasyon Notu" class="w-full p-1 border rounded"></textarea>
              <button on:click={() => moderatePost(post.id, post.isVisible, post.moderationNote)} class="bg-blue-200 text-black px-2 py-1 rounded">Kaydet</button>
            </div>
          {/each}
        </div>
      {/if}
    </main>
  </div>
</div>

<style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>
