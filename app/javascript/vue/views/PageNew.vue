<template>
  <div class="container" :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <div class="py-3">
      <form v-on:input="allowPost" v-on:touchend="allowPost">
        <div class="form-group mb-3">
          <label for="inputPageTitle">{{ $t('page.new.title') }}</label>
          <input v-model="title" type="text" class="form-control" id="inputPageTitle">
        </div>
        <div class="form-group mb-3">
          <label for="inputPageContent">{{ $t('page.new.content') }}</label>
          <textarea v-model="content" :maxlength="max" class="form-control" id="inputPageContent" rows="10"></textarea>
          <small id="contentHelpBlock" class="form-text text-muted">
            {{ $tc('page.new.contentHelp', (max - content.length)) }}
          </small>
        </div>
        <label for="inputPageLocale">{{ $t('page.new.locale') }}</label>
        <div class="input-group mb-3">
          <select v-model="locale" class="custom-select" id="inputPageLocale" :aria-label="$t('page.edit.select')">
            <option selected>{{ $t('page.edit.select') }}</option>
            <option value="fr">Fr</option>
            <option value="en">En</option>
            <option value="es">Es</option>
          </select>
        </div>
        <div class="d-flex justify-content-end">
          <button v-on:click.stop.prevent="postPageEdit" type="submit" class="btn btn-dark mb-3" :disabled="disabled">{{ $t('page.new.submit') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageNew',
  // props: ['item'],
  data () {
    return {
      componentKey: 0,
      // navbarHeight: 0,
      id: 0,
      title: '',
      content: '',
      locale: 'fr',
      disabled: false,
      max: 50000,
      errors: [],
    }
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'currentUser',
    ]),
  },
  methods: {

    allowPost () {
      // if (this.title && this.direction && this.photo) {
      //   this.disabled = false
      // }
      // else {
      //   this.disabled = true
      // }
    },
    validateYoutubeVideoUrl (url) {
      const re = /(^$|^.*@.*\..*$)|youtu.?be/
      return re.test(String(url).toLowerCase())
    },
    checkForm () {
      this.errors = []
      if (!this.title) {
        this.errors.push(this.$t('page.new.errors.title'))
        return false
      }
      if (!this.content) {
        this.errors.push(this.$t('page.new.errors.content'))
        return false
      }
      return true
    },
    postPageEdit () {
      const checkForm = this.checkForm()
      if (checkForm) {
        // console.log(this)
        this.disabled = true
        const payload = {
          id: this.id,
          slug: this.$route.params.id,
          title: this.title,
          content: this.content,
          locale: this.locale
        }
        console.log(payload)
        this.$store.dispatch('PAGE_NEW', payload)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$router.push({
                name: 'Page',
                params: {
                  id: response.data.slug
                }
              })
            }
          })
      }
      else {
        console.log(this.errors)
        this.$toast.open({
            message: this.errors[0],
            type: 'error', // success, info, warning, error, default
            // all of other options may go here
            position: 'bottom', // top, bottom, top-right, bottom-right,top-left, bottom-left
            duration: 3000, // Visibility duration in milliseconds
            dismissible: true,
        })
      }
    },
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
  },
  beforeMount () {
    if (!this.currentUser.admin) {
      console.log('ALERT')
      this.$router.push({
        name: 'Home'
      })
    }
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
    // this.setData()
  }
}
</script>
