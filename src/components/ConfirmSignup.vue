<template>
  <div class="signup">
    <h2>ConfirmSignUp</h2>
    <label>
      <input type="text" placeholder="email" v-model="email" />
    </label>
    <label>
      <input
        type="text"
        placeholder="verificationCode"
        v-model="verificationCode"
      />
    </label>
    <button @click.prevent="submit">SignUp</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Auth } from 'aws-amplify'

@Component
export default class ConfirmSignup extends Vue {
  protected email = ''
  protected verificationCode = ''
  async submit() {
    try {
      await Auth.confirmSignUp(this.email, this.verificationCode)
      alert('確認しました')
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }
}
</script>
<style scoped></style>
