<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    document.getElementById('app').style.display = 'block'
    document.getElementById('appLoading').style.display = 'none'
  },
}
</script>
