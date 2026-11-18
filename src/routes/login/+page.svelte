<script lang="ts">
    import type { Author } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";

    let typedName: string = $state("");
    let typedUsername: string = $state("");
    let typedDateOfBirth: string = $state("");
    let typedPassword: string = $state("");
    let typedConfirmPassword: string = $state("");

    const registerUser: (user: Author) => void = getContext("registerUser");

    function registerNewUser() {
        if (typedPassword != typedConfirmPassword) {
            alert("Password doesn't match");
            return;
        }

        try {
            registerUser({
                name: typedName,
                username: typedUsername,
                dateOfBirth: typedDateOfBirth,
                password: typedPassword,
            });

            typedName = "";
            typedUsername = "";
            typedDateOfBirth = "";
            typedPassword = "";
            typedConfirmPassword = "";
            goto("/login");
        } catch (e) {
            alert;
        }
    }
</script>

<div class=" p-6">
    <div class=" rounded-md text-white p-4 flex flex-col gap-4">
        <div class="flex flex-col">
            Username
            <input
                bind:value={typedUsername}
                class="text-neutral-900 bg-gray-200 p-2"
                type="text"
            />
        </div>

        <div class="flex flex-col">
            Password
            <input
                bind:value={typedPassword}
                class="text-neutral-900 bg-gray-200 p-2"
                type="password"
            />
        </div>

        <button class="w-full bg-green-600 text-white p-2">Login</button>

        <div class="mt-6">
            <small
                >Do not have an account yet? <a href="/register"
                    ><span class="text-blue-600 text-lg">Register</span></a
                ></small
            >
        </div>
    </div>
</div>
