<template>
  <div>
    <div class="custom-control custom-switch">
      <input
        type="checkbox"
        class="custom-control-input"
        id="Notifications"
        :checked="checked"
        @click="toggle"
      >
      <label class="custom-control-label" for="Notifications">{{ $t('userSettings.getEmailNotifications') }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserNotifications',
  data () {
    return {
      // notifications: false,
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
    checked () {
      return this.currentUser.notification
    }
  },
  methods: {
    toggle () {
      const payload = {
        id: this.currentUser.id,
        notification: !this.checked
      }
      console.log(payload)
      this.$store
        .dispatch('USER_NOTIFICATIONS', payload)
    }
  },
  mounted () {
    // this.notifications = this.checked
  }
}
</script>
