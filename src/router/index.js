import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { site } from '@/data/site'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { label: 'Home', title: `${site.name} — ${site.descriptor}` } },
  { path: '/work', name: 'work', component: () => import('@/views/WorkView.vue'), meta: { label: 'Work', title: 'Work' } },
  { path: '/projects/:slug', name: 'project', component: () => import('@/views/ProjectDetailView.vue'), meta: { label: 'Project', title: 'Project' } },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue'), meta: { label: 'About', title: 'About' } },
  { path: '/experience', name: 'experience', component: () => import('@/views/ExperienceView.vue'), meta: { label: 'Experience', title: 'Experience' } },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue'), meta: { label: 'Contact', title: 'Contact' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue'), meta: { label: '404', title: 'Page not found' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Wait for the leaving page to fade out before jumping to the top, so the
  // old page never visibly "snaps" while it is still on screen.
  scrollBehavior(to, from, saved) {
    const target = saved || { top: 0, left: 0 }
    return new Promise((resolve) => setTimeout(() => resolve(target), from.name ? 320 : 0))
  },
})

router.afterEach((to) => {
  if (to.name !== 'project') {
    document.title = to.name === 'home' ? to.meta.title : `${to.meta.title} — ${site.name}`
  }
})

export default router
