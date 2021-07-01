<template>
  <h3>The Url is invalid. You will be directed to homepage soon</h3>
</template>

<script>
export default {
  name: "NotFound",
  mounted() {
    this.$router.push("/")
  }
}
</script>

<style scoped>

</style>