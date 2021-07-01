<template>
  <d-card class="card-small mb-3" id="comments">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-0">
<!--      <comment-grid-->
<!--          baseURL="https://memewikicomment-default-rtdb.firebaseio.com/"-->
<!--          apiKey="AIzaSyCpFmsUrokctsP2FR9xlIEoTmBTv7ihwqg"-->
<!--          nodeName="node1">-->
<!--      </comment-grid>-->
      <h5>Comment Area</h5>
    </d-card-body>
  </d-card>
</template>

<script>
export default {
  name: "CommentArea",
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