<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100"
    >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
            <h1 class="text-xl font-semibold text-gray-500 mb-6 text-center">
                Login to your account
            </h1>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 mb-1 text-left"
                        >Email</label
                    >
                    <input
                        v-model="form.email"
                        type="email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                        required
                        placeholder="email@address.com"
                    />
                </div>

                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 mb-1 bg-white"
                        >Password</label
                    >
                    <div class="relative">
                        <input
                            v-model="form.password"
                            :type="showPassword ? 'text' : 'password'"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 bg-white text-black"
                            required
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                            @click="showPassword = !showPassword"
                        >
                            <i
                                class="fas"
                                :class="
                                    showPassword ? 'fa-eye-slash' : 'fa-eye'
                                "
                            ></i>
                        </button>
                    </div>
                </div>

                <div v-if="error" class="text-red-500 text-sm">
                    {{ error }}
                </div>

                <button
                    type="submit"
                    class="w-full bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-450"
                    :disabled="loading"
                >
                    {{ loading ? "Logging in..." : "Login" }}
                </button>

                <div class="text-center text-sm text-gray-500">
                    Don't have an account?
                    <NuxtLink
                        to="/register"
                        class="text-pink-400 hover:text-pink-500"
                    >
                        Register here
                    </NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const router = useRouter();
const { setToken, setUser } = useAuth();
const { isAuthenticated } = useAuth();

onMounted(() => {
    if (isAuthenticated()) {
        navigateTo("/welcome");
    }
});

interface LoginForm {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    user?: {
        id: number;
        email: string;
    };
    error?: string;
}

const form = ref<LoginForm>({
    email: "",
    password: "",
});

const loading = ref(false);
const error = ref("");
const showPassword = ref(false);
const config = useRuntimeConfig();

async function handleSubmit() {
    try {
        loading.value = true;
        error.value = "";

        const response = await fetch(`${config.public.apiBaseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.value),
        });

        const data = await response.json();

        if (!data.success) {
            error.value = data.error || "Login failed";
            return;
        }

        if (data.user) {
            const mockToken = btoa(data.user.email);
            setUser(data.user);
            setToken(mockToken);
            await navigateTo("/welcome");
        }
    } catch (e) {
        console.error("Error:", e);
        error.value = "An error occurred during login";
    } finally {
        loading.value = false;
    }
}
</script>
