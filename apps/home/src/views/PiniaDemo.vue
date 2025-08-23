<template>
  <div class="pinia-demo q-pa-md">
    <div class="q-mb-md">
      <h4>Pinia Counter Demo</h4>
      
      <!-- Counter Section -->
      <q-card class="q-mb-md">
        <q-card-section>
          <h6>Counter Store</h6>
          <div class="text-h4 q-mb-md">
            {{ count }}
          </div>
          <div class="q-mb-md">
            <q-chip 
              color="primary" 
              text-color="white"
            >
              Ikki barobar: {{ doubleCount }}
            </q-chip>
            <q-chip 
              :color="isEven ? 'positive' : 'negative'" 
              text-color="white"
            >
              {{ isEven ? 'Juft son' : 'Toq son' }}
            </q-chip>
          </div>
          
          <div class="q-gutter-sm q-mb-md">
            <q-btn 
              color="positive" 
              label="+" 
              @click="increment"
            />
            <q-btn 
              color="negative" 
              label="-" 
              @click="decrement"
            />
            <q-btn 
              color="grey" 
              label="Reset" 
              @click="reset"
            />
          </div>
          
          <div>
            <q-input 
              v-model="newMessage" 
              label="Yangi xabar yozing"
              @keyup.enter="updateMessage"
            />
            <q-btn 
              color="primary" 
              class="q-mt-sm"
              label="Xabarni yangilash"
              @click="updateMessage" 
            />
            <div class="q-mt-sm text-body1">
              {{ message }}
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- User Section -->
      <q-card>
        <q-card-section>
          <h6>User Store</h6>
          
          <div class="q-mb-md">
            <q-btn 
              color="primary" 
              :loading="loading"
              label="Foydalanuvchilarni yuklash"
              @click="fetchUsers" 
            />
            <q-chip 
              color="info" 
              text-color="white" 
              class="q-ml-sm"
            >
              Jami: {{ userCount }} ta
            </q-chip>
            
            <div 
              v-if="isLoggedIn" 
              class="q-mt-sm"
            >
              <q-chip 
                color="positive" 
                text-color="white"
              >
                Tizimga kirgan: {{ currentUser?.name }}
              </q-chip>
              <q-btn 
                color="negative" 
                size="sm" 
                class="q-ml-sm"
                label="Chiqish"
                @click="logout" 
              />
            </div>
          </div>

          <div 
            v-if="error" 
            class="text-negative q-mb-md"
          >
            {{ error }}
          </div>

          <q-list 
            bordered 
            separator
          >
            <q-item 
              v-for="user in users" 
              :key="user.id"
              clickable
              @click="setCurrentUser(user)"
            >
              <q-item-section>
                <q-item-label>
                  {{ user.name }}
                </q-item-label>
                <q-item-label caption>
                  {{ user.email }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn 
                  color="negative" 
                  size="sm" 
                  round 
                  icon="delete"
                  @click.stop="removeUser(user.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <div class="q-mt-md">
            <q-input 
              v-model="newUserName" 
              label="Ism"
              class="q-mb-sm"
            />
            <q-input 
              v-model="newUserEmail" 
              label="Email"
              class="q-mb-sm"
            />
            <q-btn 
              color="primary" 
              label="Yangi foydalanuvchi qo'shish"
              :disable="!newUserName || !newUserEmail"
              @click="addNewUser" 
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore, useUserStore } from '../stores'

// Store'larni ishlatish
const counterStore = useCounterStore()
const userStore = useUserStore()

// Counter store dan reactive properties (storeToRefs bilan)
const { count, doubleCount, isEven, message } = storeToRefs(counterStore)
// Actions to'g'ridan-to'g'ri store'dan
const { increment, decrement, reset, setMessage } = counterStore

// User store dan reactive properties (storeToRefs bilan)
const { users, currentUser, loading, error, userCount, isLoggedIn } = storeToRefs(userStore)
// Actions to'g'ridan-to'g'ri store'dan
const { fetchUsers, setCurrentUser, logout, addUser, removeUser } = userStore

// Local reactive data
const newMessage = ref('')
const newUserName = ref('')
const newUserEmail = ref('')

// Methods
function updateMessage() {
  if (newMessage.value.trim()) {
    setMessage(newMessage.value)
    newMessage.value = ''
  }
}

function addNewUser() {
  if (newUserName.value.trim() && newUserEmail.value.trim()) {
    addUser({
      name: newUserName.value,
      email: newUserEmail.value
    })
    newUserName.value = ''
    newUserEmail.value = ''
  }
}
</script>

<style scoped>
.pinia-demo {
  max-width: 800px;
  margin: 0 auto;
}
</style>
