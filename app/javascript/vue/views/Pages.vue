<template>
  <div :style="{ paddingTop: navbarHeight + 'px' }" class="container">
    <h1>Pages</h1>
    <table class="table table-sm table-striped">
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
        <tr>
          <th scope="row">{{ page.locale }}</th>
          <td>
            <router-link :to="'/p/' + page.slug" >{{ page.title }}</router-link>
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
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['navbarHeight', 'pages']),
  },
  mounted () {
  }
}
</script>
