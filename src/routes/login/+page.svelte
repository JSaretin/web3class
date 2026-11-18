<script lang="ts">
    import type { Author } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";

    let typedUsername: string = $state("");
    let typedPassword: string = $state("");

    const loginUser: (username: string, password: string) => void =
        getContext("loginUser");

    function executeLoginUser() {
        try {
            loginUser(typedUsername, typedPassword);

            typedUsername = "";
            typedPassword = "";
            goto("/");
        } catch (e) {
            alert(e);
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

        <button
            onclick={executeLoginUser}
            class="w-full bg-green-600 text-white p-2">Login</button
        >

        <div class="mt-6">
            <small
                >Do not have an account yet? <a href="/register"
                    ><span class="text-blue-600 text-lg">Register</span></a
                ></small
            >
        </div>
    </div>
</div>
