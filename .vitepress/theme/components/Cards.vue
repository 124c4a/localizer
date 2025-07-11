<script setup lang="ts">
  import { computed } from 'vue';
  import Card from './Card.vue';

  import { cards } from '../data/cards';
  import { DefaultTheme, useData } from 'vitepress';

  const { kind } = defineProps<{
    kind?: string;
  }>();

  const { frontmatter } = useData();

  const filteredList = computed(() => {
    if (!kind && frontmatter && frontmatter.value['card'] && frontmatter.value['card']['id']) {
      const relatedCards =
        cards.find((card) => card.id === frontmatter.value['card']['id'])?.related ?? [];
      return cards
        .filter((card) => relatedCards.includes(card.id))
        .sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return cards
        .filter((card) => {
          return !kind || card.kind.includes(kind);
        })
        .sort((a, b) => a.title.localeCompare(b.title));
    }
  });
</script>

<template>
  <div v-if="cards" class="Cards">
    <div class="container">
      <div class="items">
        <div v-for="card in filteredList" :key="card.title" :class="['item', 'grid-3']">
          <Card
            :icon="{ src: card.icon, wrap: true } as DefaultTheme.FeatureIcon"
            :title="card.title"
            :link="card.link"
          />
        </div>
        <div :class="['item', 'grid-3']">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: 1152px;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
  }

  .item {
    padding: 8px;
    width: 100%;
  }

  @media (min-width: 640px) {
    .item.grid-2,
    .item.grid-4,
    .item.grid-6 {
      width: calc(100% / 2);
    }
  }

  @media (min-width: 768px) {
    .item.grid-2,
    .item.grid-4 {
      width: calc(100% / 2);
    }

    .item.grid-3,
    .item.grid-6 {
      width: calc(100% / 3);
    }
  }

  @media (min-width: 960px) {
    .item.grid-4 {
      width: calc(100% / 4);
    }
  }
</style>
