<template>
  <div id="print" @click="print" class="mouse-pointer ml-2 text-decoration-none text-body">
    <i class="material-icons md-18 d-flex btn-print">print</i>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'BtnPrint',
  props: ['item'],
  data () {
    return {}
  },
  computed: {
    // ...mapGetters(['isAuthenticated', 'user']),
  },
  methods: {

    googleAdsNoPrint () {
      const googleAutoPlacedAds = this.$el.querySelectorAll('.google-auto-placed');
      if (googleAutoPlacedAds) {
        googleAutoPlacedAds.forEach(googleAutoPlacedAd => {
          googleAutoPlacedAd.classList.add('d-print-none')
        })
      } else {
        console.log('no ads')
      }
    },

    print () {
      this.googleAdsNoPrint()
      window.print()
    }
  },
}
</script>
