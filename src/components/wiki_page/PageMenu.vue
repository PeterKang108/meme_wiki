<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-0">
      <d-list-group flush>
        <d-list-group-item class="p-3">
          <a href="#wiki-content">Wiki</a>
          <br>
          <a href="#gallery">Gallery</a>
<!--          <br>-->
<!--          <a href="#comments">Comments</a>-->
        </d-list-group-item>
      </d-list-group>
    </d-card-body>
  </d-card>
</template>

<script>
export default {
  name: "PageMenu",
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Menu',
    },
  },
}
</script>

<style scoped>

</style>