<script setup lang="ts">
import { ref, computed } from "vue";

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

const passwordRequirements = computed(() => [
    { text: "12 characters", met: form.value.password.length >= 12 },
    { text: "1 lower case character", met: /[a-z]/.test(form.value.password) },
    { text: "1 upper case character", met: /[A-Z]/.test(form.value.password) },
    { text: "1 number", met: /[0-9]/.test(form.value.password) },
    {
        text: "1 special character",
        met: /[^A-Za-z0-9]/.test(form.value.password),
    },
]);

const router = useRouter();
const { setToken } = useAuth();

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

        const data: RegisterResponse = await response.json();

        if (!data.success) {
            error.value = data.error || "Registration failed";
            return;
        }

        if (data.token) {
            setToken(data.token);
        }

        await router.push("/welcome");
    } catch (e) {
        console.error("Error:", e);
        error.value = "An error occurred during registration";
    } finally {
        loading.value = false;
    }
}
</script>

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

                <div class="bg-gray-50 p-4 rounded-md">
                    <p class="text-sm text-gray-600 mb-2">
                        Must contain at least:
                    </p>
                    <ul class="space-y-1">
                        <li
                            v-for="(req, index) in passwordRequirements"
                            :key="index"
                            class="text-sm flex items-center"
                            :class="
                                req.met ? 'text-green-600' : 'text-gray-500'
                            "
                        >
                            <i class="fas fa-check mr-2" v-if="req.met"></i>
                            <i class="fas fa-circle text-xs mr-2" v-else></i>
                            {{ req.text }}
                        </li>
                    </ul>
                </div>

                <button
                    type="submit"
                    class="w-full bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-450"
                    :disabled="loading"
                >
                    Register
                </button>
            </form>
        </div>
    </div>
</template>
