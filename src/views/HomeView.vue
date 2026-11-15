<script setup>
// The home page is driven by src/config/home.config.js: hero, five capability sections
// (their order and layout come from the config), the experience teaser and the closing CTA.
import { home } from '@/config'
import HeroSection from '@/components/home/HeroSection.vue'
import CampaignSection from '@/components/home/CampaignSection.vue'
import BrandSection from '@/components/home/BrandSection.vue'
import ConceptsSection from '@/components/home/ConceptsSection.vue'
import VoiceSection from '@/components/home/VoiceSection.vue'
import VideoSection from '@/components/home/VideoSection.vue'
import ExperienceTeaser from '@/components/home/ExperienceTeaser.vue'
import ContactCta from '@/components/home/ContactCta.vue'

const layouts = { campaign: CampaignSection, brands: BrandSection, concepts: ConceptsSection, voices: VoiceSection, video: VideoSection }
</script>

<template>
  <div>
    <HeroSection />
    <component :is="layouts[s.display]" v-for="s in home.sections" :key="s.id" :section="s" />
    <ExperienceTeaser />
    <ContactCta />
  </div>
</template>
