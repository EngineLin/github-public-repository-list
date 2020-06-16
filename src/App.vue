<template>
  <div id="app">
    <div class="background-image" :style="backgroundImageStyle" />

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
import image from "@/assets/background-image.png";

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
      backgroundImageTop: 0,

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
  computed: {
    backgroundImageStyle() {
      console.log(this.backgroundImageTop);
      return {
        backgroundImage: `url(${image})`,
        top: `${this.backgroundImageTop}px`
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      document.addEventListener("scroll", this.lazyLoadEventScroll);
      document.addEventListener("scroll", this.parallaxEventScroll);
      this.$on("beforeDestroy", () => {
        removeEventListener("scroll", this.lazyLoadEventScroll);
        removeEventListener("scroll", this.parallaxEventScroll);
      });

      const myGithubName = "enginelin";
      fetchUserRepos(myGithubName).then(res => {
        this.rowData = res.data.map(it => GitHubParser.parse(it));
        this.isLazyLoad = true;
      });
    },
    lazyLoadEventScroll(e) {
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
    },
    parallaxEventScroll(e) {
      const { scrollTop } = e.target.scrollingElement;
      this.backgroundImageTop = -Math.floor(scrollTop / 10);
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
  position: fixed;
  z-index: -1;
  left: 0;
  top: -100;
  width: 100%;
  height: 150%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.item-container {
  max-width: 1000px;
  padding: 20px;
  border-radius: 15px;
  margin: 0 auto;
  background: #ddf3f5;
}

h1 {
  color: white;
}
</style>
