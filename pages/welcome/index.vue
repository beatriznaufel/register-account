<script setup lang="ts">
const router = useRouter()
const { logout } = useAuth()

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const userEmail = computed(() => user.value.email || 'User')
const userCreatedAt = computed(() => user.value.createdAt || new Date())

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function handleLogout(): Promise<void> {
  logout()
  await router.push('/')
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex justify-center items-center"
  >
    <div class="container mx-auto px-4">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {{ userEmail }}!
        </h1>

        <div class="space-y-6">
          <p class="text-gray-600">
            Thank you for joining us. We're excited to have you
            here!
          </p>

          <div
            class="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <h2 class="text-xl font-semibold text-gray-700 mb-4">
              Your Account Information
            </h2>
            <div class="space-y-2">
              <p class="text-gray-600">
                <span class="font-medium">Email:</span>
                {{ userEmail }}
              </p>
              <p class="text-gray-600">
                <span class="font-medium">Member since:</span>
                {{ formatDate(userCreatedAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mb-8 mt-10">
        <button
          class="bg-pink-400 text-white px-10 py-2 rounded-md hover:bg-pink-500 transition-colors duration-200"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
