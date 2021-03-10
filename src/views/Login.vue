<template>
  <div class="login">
    <h1>Login</h1>
    <section v-if="currentUser">
      <button @click="logout">LogOut</button>
    </section>
    <section v-else>
      <signup></signup>
      <confirm-signup></confirm-signup>
      <signin></signin>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Signup from '@/components/Signup.vue'
import Signin from '@/components/Signin.vue'
import ConfirmSignup from '@/components/ConfirmSignup.vue'
import { Auth } from 'aws-amplify'

@Component({
  components: { ConfirmSignup, Signin, Signup },
})
export default class Login extends Vue {
  get currentUser() {
    return this.$store.getters.currentUser
  }
  async mounted() {
    const currentUser = await Auth.currentAuthenticatedUser().catch(() => null)
    this.$store.commit('login', { currentUser })
  }
  async logout() {
    await Auth.signOut()
    this.$store.commit('logout')
  }
}
</script>
<style scoped></style>
