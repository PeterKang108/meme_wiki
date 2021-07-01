<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="p-0">
      <d-list-group flush>
        <d-container>
          <!-- Mock Data for related memes -->
          <d-row>
            <d-col v-for="(post, index) in MockList1" :key="index" lg="6" sm="12" class="mb-4" style="min-width: 100%; max-height: 150px">
              <d-card class="card-small card-post card-post--aside card-post--1" >
                <div class="card-post__image_side" :style="{ backgroundImage: 'url(\'' + post.backgroundImage + '\')' }">
                  <d-badge pill :class="['card-post__category', 'bg-' + post.categoryTheme ]">{{ post.category }}</d-badge>
                  <div class="card-post__author d-flex">
                    <a href="#" class="card-post__author-avatar card-post__author-avatar--small" :style="{ backgroundImage: 'url(\'' + post.authorAvatar + '\')' }"></a>
                  </div>
                </div>
                <d-card-body>
                  <h5 class="card-title">
                    <a class="text-fiord-blue" href="#">{{ post.title }}</a>
                  </h5>
                  <p class="card-text d-inline-block mb-3">{{ post.body }}</p>
                  <span class="text-muted">{{ post.date }}</span>
                </d-card-body>
              </d-card>
            </d-col>
          </d-row>
        </d-container>

      </d-list-group>
    </d-card-body>
  </d-card>
</template>

<script>
export default {
  name: 'RelatedMeme',
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Related Memes',
    },
  },
  data() {
    return{
      MockList1: []
    }
  }
};
</script>
