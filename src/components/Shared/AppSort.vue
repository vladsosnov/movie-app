<template>
  <div class="app-sort">
    <ul class="app-sort__list list">
      <li
        v-for="(sortingType, index) in sortingsType"
        :key="index"
        class="list__item"
        @click="onSortingTypeClick(sortingType)"
      >
         {{sortingType.label}}
      </li>
      <li
        class="list__item list__sort-side"
        :class="{ 'list__sort-side--change' : isSideChange }"
        @click="onSortSideBtnClick"
      >
         &#8595;
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppSort',
  data () {
    return {
      sortingsType: [
        { name: 'popularity', label: 'Popularity' },
        { name: 'release_date', label: 'Release date' },
        { name: 'original_title', label: 'Original title' },
        { name: 'vote_average', label: 'Vote average' }
      ],
      isSideChange: false
    }
  },
  methods: {
    onSortingTypeClick (sortingType) {
      this.$emit('sort-type-choosen', sortingType.name)
    },
    onSortSideBtnClick () {
      this.isSideChange = !this.isSideChange
      this.$emit('change-side')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-sort {
  &__list {
    margin-bottom: 2rem;
    margin-top: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    list-style: none;

    .list {
      &__item {
        width: 100%;
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:first-child {
          border-radius: 8px 0 0 8px;
        }

        &:hover {
          background-color: #ccc;
        }

        &:not(:last-child) {
          border-right: none;
        }

        &:last-child {
          border-radius: 0 8px 8px 0;
        }
      }

      &__sort-side {
        width: 20%;
        font-size: 1rem;

        &--change {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>

