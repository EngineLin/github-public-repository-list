<template>
  <div class="container">
    <h3>{{ item.title }}</h3>

    <div class="wrapper">
      <p class="label">Description:</p>
      <p :class="{ warning: !item.description }">
        {{ item.description || "Has not description in this project." }}
      </p>
    </div>

    <div class="wrapper">
      <p class="label">Link:</p>
      <a :href="item.url" target="_blank" rel="noopener noreferrer nofollow">
        <p>{{ item.url }}</p>
      </a>
    </div>
  </div>
</template>

<script>
import GitHubParser from "@/utils/parsers/GitHubParser";

export default {
  name: "Item",
  props: {
    item: {
      type: GitHubParser,
      default: () => GitHubParser.empty()
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}

.container {
  width: 100%;
  padding: 20px 0;
  margin: 20px 0;
  border-radius: 10px;
  box-sizing: border-box;
  background: white;
  box-shadow: 4px 4px 12px 1px rgba(0, 0, 0, 0.2);
  line-height: 1.5;
}

h3 {
  font-family: "Fira Mono", monospace;
  color: #783f8e;
  margin: 0 0 20px 0;
  letter-spacing: 1px;
}

.label {
  color: #438a5e;
  font-size: 18px;
  font-weight: 600;
  margin-right: 15px;
}

.wrapper {
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.warning {
  color: #fbd46d;
}

a {
  underline: unset;
}
</style>
