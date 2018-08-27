<template>

  <figure class="figure d-inline-block">
    <router-link :to="'/projects/' + link" class="mx-auto">
      <img
        :src="icon"
        class="figure-img img-fluid rounded" />
      <figcaption :class="'figure-caption text-center bg-' + getBadge(status)">{{ name }}</figcaption>
    </router-link>
  </figure>

</template>

<script>
export default {
  name: 'figure-links',
  props: {
    link: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {

  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    imageLoadError(event) {
      event.target.src = 'img/tech-icons/cloudatcost.png'
      // this.$router.replace({path: '/users'})
    },
    getBadge (status) {
      return status === 'live' ? 'success'
        : status === 'staging' ? 'secondary'
          : status === 'dev' ? 'warning'
            : status === 'Banned' ? 'danger' : 'white'
    },
  }
}
</script>
<style scoped lang="css">
.figure {
  margin-bottom: 4px;
  margin-right: 1%;
  width: 96px;
  height: 96px;
  cursor: pointer;
  overflow: visible;
}
.figure a {
  display: block;
  width: 80%;
  height: 80%;
}
.img-icon {
  width: 24px;
}
.figure-img {
  width: 100%;
  height: 100%;
}
.figure-caption {
  font-size: 75%;
  color: #262626;
}
</style>
