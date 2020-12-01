<template>
 <div>
   <navbar-small v-if="mobile" />
   <navbar-large v-else />
 </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
// import NavbarLarge from '../components/NavbarLarge.vue'
// import NavbarSmall from '../components/NavbarSmall.vue'
const NavbarLarge = () => import('../components/NavbarLarge.vue')
const NavbarSmall = () => import('../components/NavbarSmall.vue')

export default {
  name: 'Navbar',
  data () {
    return {
      componentKey: 0,
    }
  },
  components: {
    NavbarLarge,
    NavbarSmall,
  },
  computed: {
    mobile () {
      return isMobile
    }
  },
}
</script>
