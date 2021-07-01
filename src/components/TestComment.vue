<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-0">
      <div class="box box1 box2" style="color:#222">hello</div>,
    </d-card-body>
  </d-card>
</template>

<script>
export default {
  name: "TestComment",
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Comments',
    },
  },
}
</script>

<style scoped>

</style>