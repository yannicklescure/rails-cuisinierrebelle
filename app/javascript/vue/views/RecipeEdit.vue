<template>
  <div class="container" :style="{ paddingTop: navbarHeight + 'px' }" :key="componentKey">
    <div v-if="!loading" class="py-3">
      <form v-on:input="allowPost" v-on:touchend="allowPost">
        <div class="form-group mb-3">
          <label for="inputRecipeTitle">{{ $t('recipe.new.title') }}</label>
          <input v-model="title" type="text" class="form-control" id="inputRecipeTitle">
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeSubtitle">{{ $t('recipe.new.subtitle') }}</label>
          <input v-model="subtitle" type="text" class="form-control" id="inputRecipeSubtitle">
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipedescription">{{ $t('recipe.new.description') }}</label>
          <textarea v-model="description" :maxlength="max" class="form-control" id="inputRecipedescription" rows="3"></textarea>
          <small id="descriptionHelpBlock" class="form-text text-muted">
            {{ $tc('recipe.new.descriptionHelp', (max - description.length)) }}
          </small>
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeDirection">{{ $t('recipe.new.direction') }}</label>
          <textarea v-model="direction" class="form-control" id="inputRecipeDirection" rows="10"></textarea>
        </div>
        <div class="mb-2">{{ $t('recipe.new.photo') }}</div>
        <div ref="photo" class="form-group mb-3">
          <div class="custom-file">
            <input v-on:change="processFile($event)" type="file" class="custom-file-input" id="photoFileLangHTML">
            <label class="custom-file-label" for="photoFileLangHTML" :data-browse="$t('recipe.new.chooseFile')">{{ $t('recipe.new.browse') }}</label>
          </div>
        </div>
        <div v-if="item" ref="preview">
          <div class="mb-3"><img :src="item.recipe.photo.full.url" class="rounded img-fluid" :alt="item.recipe.title"></div>
        </div>
        <div class="form-group mb-3">
          <label for="inputRecipeVideo">{{ $t('recipe.new.video') }}</label>
          <input v-model="video" type="url" class="form-control" id="inputRecipeVideo">
        </div>
        <label for="inputRecipeTags">{{ $t('recipe.new.tags') }}</label>
        <div class="form-group mb-3">
          <textarea v-model="tagList" class="form-control" id="inputRecipeTags" rows="3"></textarea>
          <small id="tagsHelpBlock" class="form-text text-muted">
            {{ $t('recipe.new.tagsHelp') }}
          </small>
        </div>
        <div class="d-flex justify-content-between">
          <button v-on:click.stop.prevent="deleteRecipe" type="submit" class="btn btn-link mb-3">{{ $t('recipe.delete.submit') }}</button>
          <button v-on:click.stop.prevent="postRecipe" type="submit" class="btn btn-dark mb-3" :disabled="disabled">{{ $t('recipe.new.submit') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecipeEdit',
  // props: ['item'],
  data () {
    return {
      componentKey: 0,
      loading: true,
      // navbarHeight: 0,
      id: 0,
      title: null,
      subtitle: null,
      video: null,
      direction: '',
      description: '',
      // image: null,
      photo: null,
      tagList: null,
      // disabled: true,
      disabled: false,
      max: 280,
      errors: [],
    }
  },
  computed: {
    ...mapGetters([
      'navbarHeight',
      'recipe',
      'currentUser',
    ]),
    item () {
      return this.recipe(this.$route.params.id)
    }
  },
  // watch: {
  //   'item' () {
  //   }
  // },
  methods: {
    setData () {
      if (this.item) {
        console.log(this.item)
        this.componentKey += 1
        this.id = this.item.recipe.id
        this.title = this.item.recipe.title
        this.subtitle = this.item.recipe.subtitle
        this.video = this.item.recipe.video
        this.direction = this.item.recipe.direction
        this.description = this.item.recipe.description
        // this.image = this.item.recipe.image
        this.photo = this.item.recipe.photo
        this.tagList = this.item.recipe.tagList.join(', ')
      }
    },
    processFile (event) {
      console.log(event)
      this.photo = event.target.files[0]
      console.log(this.photo)
      console.log(this.$refs.photo)
      // console.log(URL.createObjectURL(this.photo))
      // this.$refs.photo.src = URL.createObjectURL(this.photo)
      const reader = new FileReader()
      reader.onload = () => {
        // console.log(reader.result)
        this.$refs.preview.innerHTML = ''
        this.$refs.preview.insertAdjacentHTML('afterbegin', `<div class="mb-3"><img src="${reader.result}" class="rounded img-fluid" alt="${this.photo.name}"></div>`);
        // this.$refs.photo.src = reader.result
      }
      reader.readAsDataURL(this.photo)
      this.allowPost()
    },
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
        this.errors.push(this.$t('recipe.new.errors.title'))
        return false
      }
      if (!this.direction) {
        this.errors.push(this.$t('recipe.new.errors.direction'))
        return false
      }
      if (!this.photo) {
        this.errors.push(this.$t('recipe.new.errors.photo'))
        return false
      }
      if (this.video && !this.validateYoutubeVideoUrl(this.video)) {
        this.errors.push(this.$t('recipe.new.errors.youtubeVideoUrl'))
        return false
      }
      return true
    },
    postRecipe () {
      const checkForm = this.checkForm()
      if (checkForm) {
        // console.log(this)
        this.disabled = true
        const payload = {
          id: this.id,
          title: this.title,
          subtitle: this.subtitle,
          video: this.video,
          direction: this.direction,
          description: this.description,
          // image: null,
          // user_id: 0,
          photo: this.photo,
          tagList: this.tagList,
        }
        console.log(payload)
        this.$store.dispatch('RECIPE_EDIT', payload)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$router.push({
                name: 'Recipe',
                params: {
                  id: response.data.recipe.slug
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
    deleteRecipe () {
      let message = this.$t('recipe.delete.are_you_sure')
      let options = {
          // html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
          // loader: false, // set to true if you want the dialog to show a loader after click on "proceed"
          // reverse: false, // switch the button positions (left to right, and vise versa)
          okText:  this.$t('recipe.delete.okText'),
          cancelText: this.$t('recipe.delete.cancelText'),
          // animation: 'zoom', // Available: "zoom", "bounce", "fade"
          // type: 'basic', // coming soon: 'soft', 'hard'
          // verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
          // verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
          // clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
          backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
          customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      };

      this.$dialog
        .confirm(message, options)
        .then(dialog => {
          console.log('Clicked on proceed')
          const payload = {
            id: this.id
          }
          this.$store.dispatch('RECIPE_DELETE', payload)
            .then(response => {
              this.$router.push({
                name: 'Home',
                params: { recipeId: this.id }
              })
            })
        })
        .catch(() => {
          console.log('Clicked on cancel')
        });
    },
  },
  beforeMount () {
    if (this.currentUser.slug != this.item.user.slug) {
      console.log('ALERT')
      this.$router.push({
        name: 'Home'
      })
    }
  },
  async mounted () {
    // this.navbarHeight = this.getNavbarHeight()
    await this.setData()
    this.loading = false
  }
}
</script>
