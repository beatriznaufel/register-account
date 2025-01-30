<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100"
    >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
            <h1 class="text-3xl font-bold text-gray-700 mb-8 text-center">
                Welcome!
            </h1>

            <div class="space-y-6">
                <NuxtLink
                    to="/login"
                    class="w-full block bg-pink-400 text-white py-3 px-4 rounded-md hover:bg-pink-500 transition-colors duration-200 text-center font-semibold"
                >
                    Login
                </NuxtLink>

                <NuxtLink
                    to="/register"
                    class="w-full block bg-white text-pink-400 py-3 px-4 rounded-md border-2 border-pink-400 hover:bg-pink-50 transition-colors duration-200 text-center font-semibold"
                >
                    Register
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
