<script setup lang="ts">
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
}

const form = ref<RegisterForm>({
    email: "",
    password: "",
});

const loading = ref(false);
const error = ref("");
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
            body: JSON.stringify({
                email: form.value.email,
                password: form.value.password,
            }),
        });

        const data: RegisterResponse = await response.json();

        if (!data.success) {
            error.value = data.error || "Registration failed";
            return;
        }

        navigateTo("/home");
    } catch (e) {
        console.error("Erro completo:", e);
        error.value = "An error occurred during registration";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900">
        <UCard class="w-full max-w-md p-6">
            <template #header>
                <h2 class="text-2xl font-bold text-center">
                    Create an account
                </h2>
            </template>

            <form @submit.prevent="handleSubmit">
                <div class="space-y-4">
                    <UFormGroup label="Email">
                        <UInput
                            v-model="form.email"
                            type="email"
                            placeholder="your@email.com"
                            required
                        />
                    </UFormGroup>

                    <UFormGroup label="Password">
                        <UInput
                            v-model="form.password"
                            type="password"
                            placeholder="********"
                            required
                        />
                    </UFormGroup>

                    <UAlert
                        v-if="error"
                        color="red"
                        variant="subtle"
                        :title="error"
                    />

                    <UButton type="submit" block :loading="loading">
                        Register
                    </UButton>
                </div>
            </form>
        </UCard>
    </div>
</template>
