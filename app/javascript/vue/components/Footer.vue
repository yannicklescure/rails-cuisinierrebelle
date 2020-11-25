<template>
  <div ref="footer" class="d-print-none mt-5 py-5 px-3 bg-dark text-light d-flex justify-content-center">
    <div class="d-flex align-items-center">
      <div>Fait avec</div>
      <div class="px-1 text-danger">
        <i class="material-icons md-18 d-flex">favorite</i>
      </div>
      <div>par Cuisinier Rebelle &copy;{{ year }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      // message: 'false',
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
  }
}
</script>
