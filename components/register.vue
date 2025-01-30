<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100"
    >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
            <h1 class="text-xl font-semibold text-gray-500 mb-6 text-center">
                Create your account
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
                        placeholder="your@email.com"
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

                <div
                    v-if="error"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                >
                    {{ error }}
                </div>

                <button
                    type="submit"
                    class="w-full bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-450"
                    :disabled="loading"
                >
                    {{ loading ? "Registering..." : "Register" }}
                </button>
                <div class="text-center text-sm text-gray-500">
                    Already have an account?
                    <NuxtLink
                        to="/login"
                        class="text-pink-400 hover:text-pink-500"
                    >
                        Login here
                    </NuxtLink>
                </div>
                Ï
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const router = useRouter();
const { isAuthenticated } = useAuth();

onMounted(() => {
    if (isAuthenticated()) {
        navigateTo("/welcome");
    }
});

interface RegisterForm {
    email: string;
    password: string;
}

interface RegisterResponse {
    success: boolean;
    user?: {
        id: number;
        email: string;
        createdAt: string;
    };
    error?: string;
    token: string;
}

const form = ref<RegisterForm>({
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

        const response = await fetch(`${config.public.apiBaseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.value),
        });

        const data = await response.json();

        if (!data.success) {
            switch (response.status) {
                case 409:
                    error.value =
                        "This email is already registered. Please use a different email or try logging in.";
                    break;
                case 400:
                    error.value = data.error || "Invalid input data";
                    break;
                default:
                    error.value = data.error || "Registration failed";
            }
            return;
        }

        if (data.user) {
            await router.push("/welcome");
        }
    } catch (e) {
        console.error("Error:", e);
        error.value = "An error occurred during registration";
    } finally {
        loading.value = false;
    }
}
</script>
