<template>
  <form class="app-search-input">
    <ejs-autocomplete
      v-model="searchMovieName"
      :dataSource="autocompleteMovie"
      :fields="dataFields"
      :showClearButton="false"
      :highlight="true"
      placeholder="Search a movie"
      class="app-search-input__select"
    />
    <button
      class="app-search-input__button"
      @keyup.enter="getSearchMoveisData"
      @click.prevent="getSearchMoveisData"
    >
      Search
    </button>
  </form>
</template>

<script>
export default {
  name: 'AppSearchInput',
  props: {
    autoCompleteMoviesTitle: {
      required: true
    }
  },
  data () {
    return {
      dataFields: { value: 'title' },
      searchMovieName : '',
      fullPathName: ''
    }
  },
  watch: {
    async searchMovieName () {
      this.fullPathName = `${process.env.VUE_APP_API_URL}/search/movie?&api_key=${process.env.VUE_APP_API_KEY}&query=${this.searchMovieName}`
    }
  },
  computed: {
    autocompleteMovie () {
      return Object.values(this.autoCompleteMoviesTitle)
    }
  },
  methods: {
    getSearchMoveisData () {
      this.$store.commit('setSearchResultVisibility')
      this.$emit('setSearchQuery', this.fullPathName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);

.app-search-input {
  &__select {
    padding: 4px 6px !important;
    border-radius: 12px !important;
    border: none !important;
    background: transparent !important;
    margin-bottom: 4px !important;
  }

  &__button {
    position: absolute;
    top: 3px;
    padding: 4px 16px;
    background: no-repeat;
    border: 1px solid #333;
    border-radius: 3rem;
    z-index: 100;
    cursor: pointer;
    outline: none;
    transition: all .2s ease;

    &:hover {
      background-color: #ccc;
    }
  }
}
</style>
