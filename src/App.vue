<template>
  <div id="app">
    <!--    <div class="background-image" />-->
    <h1>GitHub public repository list</h1>
    <div class="item-container">
      <Item v-for="item in data" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import { fetchUserRepos } from "@/apis/github.js";
import GitHubParser from "@/utils/parsers/GitHubParser.js";
import Item from "@/components/Item.vue";

export default {
  name: "App",
  components: {
    Item
  },
  data() {
    return {
      rowData: [],
      data: [],
      isLazyLoad: false,

      LAZY_LOAD_SIZE: 5,
      LAZY_LOAD_BUFFER: 20
    };
  },
  watch: {
    isLazyLoad(value) {
      if (!value || !this.rowData.length) return;
      this.data = [
        ...this.data,
        ...this.rowData.splice(0, this.LAZY_LOAD_SIZE)
      ];
      this.isLazyLoad = false;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      document.addEventListener("scroll", this.eventScroll);
      this.$on(
        "beforeDestroy",
        () => void removeEventListener("scroll", this.eventScroll)
      );

      const myGithubName = "enginelin";
      fetchUserRepos(myGithubName).then(res => {
        this.rowData = res.data.map(it => GitHubParser.parse(it));
        this.isLazyLoad = true;
      });
    },
    eventScroll(e) {
      if (this.isLazyLoad) return;
      const {
        clientHeight,
        offsetHeight,
        scrollTop
      } = e.target.scrollingElement;
      const scrollableHeight = offsetHeight - clientHeight;

      if (scrollTop + this.LAZY_LOAD_BUFFER >= scrollableHeight) {
        this.isLazyLoad = true;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #738290;
  font-size: 16px;
  margin-top: 60px;
}

.background-image {
  width: 100vw;
  height: 100vh;
}

.item-container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
