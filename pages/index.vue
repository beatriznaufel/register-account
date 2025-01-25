<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100"
    >
        <div
            class="bg-white rounded-lg shadow-xl w-full max-w-md p-8 text-center"
        >
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Welcome! 🎉</h1>
            <p class="text-gray-600 mb-6">
                Thank you for registering! Your account has been successfully
                created.
            </p>
            <div class="space-y-4">
                <!-- <button
                    @click="navigateTo('/home')"
                    class="w-full bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-500 transition"
                >
                    Go to Home
                </button> -->
                <button
                    @click="handleLogout"
                    class="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
});

const router = useRouter();
const { logout } = useAuth();

async function handleLogout() {
    try {
        logout();
        await navigateTo("/login");
    } catch (error) {
        console.error("Error during logout:", error);
    }
}
</script>
