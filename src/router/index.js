import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/components/posts/Index.vue';
import create from '@/components/posts/Create.vue';
import edit from '@/components/posts/Edit.vue';

const routes = [
  {
    path: '/',
    name: 'posts',
    component: Index,
  },
  {
    path: '/create',
    name: 'createPosts',
    component: create,
  },
  {
    path: '/edit/:id',
    name: 'editPosts',
    component: edit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
