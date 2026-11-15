<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import FullscreenMenu from '@/components/layout/FullscreenMenu.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import CustomCursor from '@/components/ui/CustomCursor.vue'

const route = useRoute()
const header = ref(null)
const menuOpen = ref(false)

function closeMenu(opts) {
  menuOpen.value = false
  if (opts?.restoreFocus) header.value?.focus()
}

// Lock page scroll while the menu is open.
watch(menuOpen, (open) => document.documentElement.classList.toggle('is-locked', open))

// After a navigation, move focus to the page so keyboard / screen reader users start at the top.
watch(
  () => route.path,
  async (_, prev) => {
    if (!prev) return
    await nextTick()
    document.getElementById('main')?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <router-view v-if="route.meta.bare" />
  <v-app v-else>
    <a class="skip-link" href="#main">Skip to content</a>
    <SiteHeader ref="header" :menu-open="menuOpen" @toggle="menuOpen ? closeMenu({ restoreFocus: true }) : (menuOpen = true)" />
    <FullscreenMenu :open="menuOpen" @close="closeMenu" />

    <v-main id="main" tabindex="-1">
      <router-view v-slot="{ Component, route: r }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="r.path" />
        </transition>
      </router-view>
      <SiteFooter />
    </v-main>

    <CustomCursor />
  </v-app>
</template>
