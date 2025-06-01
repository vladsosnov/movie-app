import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    searchMovies: [],
    pendingDeletion: null,
    savedMovies: JSON.parse(localStorage.getItem('savedMovies')) || [],
    isSearchResultVisible: false
  },
  getters: {
    searchMovies (state) {
      return state.searchMovies
    }
  },
  mutations: {
    setSearchMovies (state, searchMovies) {
      state.searchMovies = searchMovies
    },
    setPendingDeletion(state, payload) {
      state.pendingDeletion = payload;
    },
    clearPendingDeletion(state) {
      state.pendingDeletion = null;
    },
    addMovieToSaved(state, movie) {
      const exists = state.savedMovies.some(item => item.id === movie.id);
      if (!exists) {
        state.savedMovies.push(movie);
        localStorage.setItem('savedMovies', JSON.stringify(state.savedMovies));
      }
    },
    removeMovie(state, id) {
      const index = state.savedMovies.findIndex(item => item.id === id);
      if (index !== -1) {
        state.savedMovies.splice(index, 1);
        localStorage.setItem('savedMovies', JSON.stringify(state.savedMovies));
      }
    },
    setSearchResultVisibility (state) {
      state.isSearchResultVisible = !state.isSearchResultVisible
    }
  },
  actions: {
    setSearchMovies (context, searchMovies) {
      context.commit('setSearchMovies', searchMovies)
    },
    addMovieToSaved({ commit }, movie) {
      commit('addMovieToSaved', movie)
    },
    pendingDeleteMovie({ commit, state }, movie) {
      commit('removeMovie', movie.id);

      if (state.pendingDeletion) {
        clearTimeout(state.pendingDeletion.timerId);
        commit('clearPendingDeletion');
      }

      const timerId = setTimeout(() => {
        commit('clearPendingDeletion');
      }, 5000);

      commit('setPendingDeletion', { movie, timerId });
    },

    undoDelete({ commit, state }) {
      if (state.pendingDeletion) {
        clearTimeout(state.pendingDeletion.timerId);
        const movie = state.pendingDeletion.movie;
        commit('clearPendingDeletion');
        commit('addMovieToSaved', movie);
      }
    }
  }
});
