<script lang="ts">
    import type { User } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { getContext, onMount } from "svelte";

    let enteredUsername = $state("");
    let enteredPassword = $state("");

    const loginUser: (username: string, password: string) => void =
        getContext("loginUser");

    function login() {
        // loginUser(enteredUsername, enteredPassword);
        // enteredPassword = "";
        // enteredUsername = "";
        // goto("/");

        try {
            loginUser(enteredUsername, enteredPassword);
            enteredPassword = "";
            enteredUsername = "";
            goto("/");
        } catch (e) {
            alert(e);
        }
    }

    let getLoggedInUser: () => User | undefined = getContext("getLoggedInUser");

    let loggedInUser = $derived(getLoggedInUser());

    function callWhenPageLoad() {
        if (loggedInUser != undefined) {
            goto("/profile");
            return;
        }
    }

    onMount(callWhenPageLoad);
</script>

<div class="w-full h-full bg-gray-200">
    <div class="mx-w-md w-full mx-auto p-4">
        <h2 class="mb-10 text-2xl font-bold">Login Page</h2>

       

        <div class="flex flex-col">
            Username
            <input
                class="bg-gray-100"
                type="text"
                bind:value={enteredUsername}
            />
        </div>
        <div class="flex flex-col">
            Password
            <input
                class="bg-gray-100"
                type="text"
                bind:value={enteredPassword}
            />
        </div>

        <button onclick={login} class="mt-10 py-2 px-4 bg-blue-400 text-white"
            >Login</button
        >
    </div>
</div>
