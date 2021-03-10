<template>
  <div class="chat">
    <h1>Chat</h1>
    <ul class="chatContents">
      <li v-for="message in messages" :key="message.id" class="message">
        <div class="meta">
          <div class="name">{{ message.owner }}</div>
          <div class="time">{{ message.createdAt }}</div>
        </div>
        <div class="content">
          {{ message.content }}
        </div>
      </li>
    </ul>
    <input type="text" v-model="newMessage" />
    <button @click="send">送信</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  Message,
  ListMessagesQuery,
  ModelSortDirection,
  CreateMessageInput,
  OnCreateMessageSubscription,
} from '@/API'
import { API, graphqlOperation } from 'aws-amplify'
import { listMessages } from '@/graphql/queries'
import { createMessage } from '@/graphql/mutations'
import { onCreateMessage } from '@/graphql/subscriptions'
type CreateMessageSubscriptionEvent = {
  value: { data: OnCreateMessageSubscription }
}

@Component({
  components: {},
})
export default class Chat extends Vue {
  messages: Array<Message> = []
  newMessage = ''
  unsubscribe?: Function = undefined
  roomID = 'piyopiyo'
  async mounted() {
    const result = await API.graphql(
      graphqlOperation(listMessages, {
        roomID: this.roomID,
        sortDirection: ModelSortDirection.DESC,
      })
    )
    if ('data' in result && result.data) {
      const data = result.data as ListMessagesQuery
      this.messages = data.listMessages?.items?.slice().reverse() as Array<
        Message
      >
    }
    const client = API.graphql(graphqlOperation(onCreateMessage))
    if ('subscribe' in client) {
      const subscription = client.subscribe({
        next: ({ value: { data } }: CreateMessageSubscriptionEvent) => {
          this.messages.push(data.onCreateMessage as Message)
        },
      })
      this.unsubscribe = () => {
        subscription.unsubscribe()
      }
    }
  }
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
  async send() {
    if (this.newMessage === '') {
      return
    }
    const input: CreateMessageInput = {
      roomID: this.roomID,
      content: this.newMessage,
    }
    await API.graphql(graphqlOperation(createMessage, { input }))
    this.newMessage = ''
  }
}
</script>
<style scoped>
input {
  width: calc(100% - 8px);
}
.chat {
  height: 640px;
  width: 100%;
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
}

.chatContents {
  list-style-type: none;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px;
  margin: 0 0 5px 0;
  height: calc(100% - 160px);
  width: auto;
  overflow-y: scroll;
}

.meta {
  display: flex;
}

.name {
  display: inline-block;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1em;
}

.time {
  display: inline-block;
  color: gray;
  font-size: 0.8em;
}
.message {
  padding: 0 5px 5px 5px;
  text-align: left;
}
.content {
}
</style>
