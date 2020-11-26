<template>
  <div class="container" :style="{ marginTop: navbarHeight + 'px' }">
    <div class="p-3">
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
          <label for="inputRecipeVideo">{{ $t('recipe.new.video') }}</label>
          <input v-model="video" type="url" class="form-control" id="inputRecipeVideo">
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
        <div ref="preview"></div>
        <label for="inputRecipeTags">{{ $t('recipe.new.tags') }}</label>
        <div class="form-group mb-3">
          <textarea v-model="tag_list" class="form-control" id="inputRecipeTags" rows="3"></textarea>
          <small id="tagsHelpBlock" class="form-text text-muted">
            {{ $t('recipe.new.tagsHelp') }}
          </small>
        </div>
        <div class="d-flex justify-content-end">
          <button v-on:click.stop.prevent="postRecipe" type="submit" class="btn btn-dark mb-3" :disabled="disabled">{{ $t('recipe.new.submit') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecipeNew',
  data () {
    return {
      // componentKey: 0,
      // navbarHeight: 0,
      title: null,
      subtitle: null,
      video: null,
      direction: null,
      // description: null,
      // image: null,
      // user_id: 0,
      photo: null,
      tag_list: [],
      disabled: true,
    }
  },
  methods: {
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
      if (this.title && this.direction && this.photo) {
        this.disabled = false
      }
      else {
        this.disabled = true
      }
    },
    postRecipe () {
      console.log(this)
    },
    // getNavbarHeight () {
    //   return this.$store.getters.navbarHeight
    // },
  },
  computed: {
    ...mapGetters(['navbarHeight']),
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
  }
}
</script>
