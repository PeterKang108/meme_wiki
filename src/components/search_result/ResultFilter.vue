<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-0">
      <d-list-group flush>
        <d-list-group-item class="p-3">
          <span class="d-flex mb-2"><strong class="mr-1">Status:</strong> Draft <a class="ml-auto" href="#">Edit</a></span>
          <span class="d-flex mb-2"><strong class="mr-1">Visibility:</strong> <strong class="text-success">Public</strong> <a class="ml-auto" href="#">Edit</a></span>
          <span class="d-flex mb-2"><strong class="mr-1">Schedule:</strong> Now <a class="ml-auto" href="#">Edit</a></span>
        </d-list-group-item>

        <d-list-group-item class="btn-outline-accent">
          <b-form @submit="onSubmit">
            <b-form-group>
              <b-button type="submit" variant="primary" size="sm">Save Draft</b-button>
            </b-form-group>
          </b-form>

          <router-link :to="`/wiki_page`" class="btn-accent ml-auto">
            <d-button size="sm">
              Publish
            </d-button>
          </router-link>
        </d-list-group-item>
      </d-list-group>
    </d-card-body>
  </d-card>
</template>

<script>
export default {
  name: "ResultFilter",

}
</script>

<style scoped>

</style>