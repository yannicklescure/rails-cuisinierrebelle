<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" class="container">
    <h1>Pages</h1>
    <div class="d-flex my-3">
      <div class="mr-3">
        <label for="inputPageLocale">{{ $t('page.new.locale') }}</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="localeRadioInlineFr" name="localeRadioInline" class="custom-control-input" value="fr" v-model="locale">
        <label class="custom-control-label" for="localeRadioInlineFr">Fr</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="localeRadioInlineEn" name="localeRadioInline" class="custom-control-input" value="en" v-model="locale">
        <label class="custom-control-label" for="localeRadioInlineEn">En</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" id="localeRadioInlineEs" name="localeRadioInline" class="custom-control-input" value="es" v-model="locale">
        <label class="custom-control-label" for="localeRadioInlineEs">Es</label>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">{{ $t('pages.locale') }}</th>
          <th scope="col">{{ $t('pages.title') }}</th>
        </tr>
      </thead>
      <tbody
        v-for="(page, index) in pages"
        :key="page.id"
      >
        <tr v-if="page.locale === locale">
          <th scope="row">{{ page.locale }}</th>
          <td>
            <router-link :to="'/p/' + page.slug">{{ page.title }}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pages',
  data () {
    return {
      componentKey: 0,
      locale: 'fr',
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['navbarHeight', 'pages', 'currentUser']),
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
  }
}
</script>
