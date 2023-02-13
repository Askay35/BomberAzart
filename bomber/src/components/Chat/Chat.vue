<template>
  <div class="chat-wrap">
    <div class="chat-messages">
      <div ref="chat_messages" class="chat-messages-inner hide-scroll">
        <div v-for="(message, key) in messages" :key="key" class="chat-message">
          <template v-if="'bet' in message">
            <ChatBet
              :name="message.name"
              :size="message.bet.bet_size"
              :coef="message.bet.coef"
              :round="message.bet.round"
              :win="message.bet.win"
            />
          </template>
          <template v-else>
            <div class="chat-message-name">{{ message.name }}:</div>
            <div class="chat-message-body">{{ message.text }}</div>
          </template>
        </div>
      </div>
      <div class="overflow-shadow"></div>
    </div>
    <div class="chat-ui">
      <div class="chat-input-wrap">
        <input
          type="text"
          max-length="150"
          placeholder="Введите сообщение"
          id="chat-input"
          @input="inputMessage"
          @change="inputMessage"
        />
        <div id="chat-send-btn" @click="sendMessage" role="button">
          <img src="@/assets/images/send.svg" />
        </div>
      </div>
      <div class="chat-count number-info">
        <div>Людей в игре:</div>
        <div>{{ $store.state.game.users_online }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ChatBet from "./ChatBet.vue";

export default {
  components: { ChatBet },
  data() {
    return {
      message_text: "",
    };
  },
  inject: ["showModal", "login_modal"],
  updated() {
    if (
      this.$refs.chat_messages.scrollTop >
      this.$refs.chat_messages.scrollHeight -
        this.$refs.chat_messages.scrollTop -
        60
    ) {
      this.$refs.chat_messages.scrollTop =
        this.$refs.chat_messages.scrollHeight;
    }
  },
  mounted() {
    this.$refs.chat_messages.scrollTop = this.$refs.chat_messages.scrollHeight;
  },
  computed: {
    ...mapState({
      messages: (state) => state.game.messages,
    }),
  },
  methods: {
    inputMessage(e) {
      if (e.target.value.length <= 150) {
        this.message_text = e.target.value;
      } else {
        this.message_text = e.target.value.slice(0, 150);
      }
    },
    sendMessage() {
      if (this.message_text.length <= 150 && this.message_text !== "") {
        if (this.$store.state.user.is_auth) {
          this.$store
            .dispatch("sendMessage", {
              message: {
                name: this.$store.state.user.name,
                text: this.message_text,
              }
            })
            .then(() => {
              this.$refs.chat_messages.scrollTop =
                this.$refs.chat_messages.scrollHeight;
            });
        } else {
          this.showModal(this.login_modal.value);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import url("/src/assets/css/base.css");

.chat-message {
  flex-wrap: wrap;
  display: flex;
  margin-bottom: 15px;
}

.chat-message-name {
  color: var(--pink-color);
  font-weight: 500;
  margin-right: 4px;
}

.chat-input-wrap {
  max-height: 28px;
  margin-bottom: 10px;
  display: flex;
  flex: 1;
}

#chat-input {
  font-weight: 400;
  font-size: 12px;
  flex: 1;
  color: var(--default-text-color);
  padding: 0 10px;
  background: #2d011e;
  border: 1px solid #940262;
  border-radius: 15px 0px 0px 15px;
}

#chat-input::placeholder {
  font-weight: 600;
  color: #95195f;
}

.chat-message-body {
  word-wrap: anywhere;
}
.chat-wrap {
  display: flex;
  max-width: 300px;
  flex: 1;
  flex-direction: column;
}
.chat-messages {
  position: relative;
  overflow: hidden;
  display: flex;
  height: 100%;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  .overflow-shadow {
    width: 100%;
    height: 150px;
    left: 0;
    top: 0;
  }
}

.chat-messages-inner {
  flex: 1;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  padding: 10px 15px 0;
}

.chat-ui {
  border-top: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  padding: 15px 10px;
  flex-direction: column;
}

#chat-send-btn {
  padding: 4px 4px 4px 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background: #940262;
  border-radius: 0px 15px 15px 0px;
}

.chat-count {
  align-self: flex-end;
}
</style>
