<template>
  <div class="app-pagination">
    <button
      @click.prevent="onPrevBtnClick"
      :disabled="currentPage === 1"
      class="app-pagination__button"
    >
      Prev
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      :class="['app-pagination__number', { active: page === currentPage }]"
      @click="onPageClick(page)"
    >
      {{ page }}
    </button>

    <button
      @click.prevent="onNextBtnClick"
      :disabled="currentPage === totalPages"
      class="app-pagination__button"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      default: 20
    }
  },
  computed: {
    visiblePages () {
      const range = []
      const maxButtons = 5
      let start = Math.max(this.currentPage - 2, 1)
      let end = Math.min(start + maxButtons - 1, this.totalPages)

      if (end - start < maxButtons - 1) {
        start = Math.max(end - maxButtons + 1, 1)
      }

      for (let i = start; i <= end; i++) {
        range.push(i)
      }

      return range
    }
  },
  methods: {
    onPrevBtnClick () {
      this.$emit('prev-button')
    },
    onNextBtnClick () {
      this.$emit('next-button')
    },
    onPageClick (page) {
      this.$emit('page-click', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-pagination {
  max-width: 940px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;

  &__button,
  &__number {
    border: 1px solid #333;
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__number.active {
    background-color: #333;
    color: white;
  }
}
</style>
