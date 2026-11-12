<script lang="ts">
    import type { User } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { getContext, onMount } from "svelte";

    let enteredName = $state("");
    let enteredUsername = $state("");
    let enteredPassword = $state("");
    let enteredConfirmPassword = $state("");

    const addNewUser: (
        name: string,
        username: string,
        password: string,
    ) => void = getContext("addNewUser");

    function registerUser() {
        if (enteredPassword != enteredConfirmPassword) {
            alert("Password did not match");
            return;
        }

        try {
            addNewUser(enteredName, enteredUsername, enteredPassword);
            enteredName = "";
            enteredPassword = "";
            enteredUsername = "";
            enteredConfirmPassword = "";
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

<div class="w-full h-full bg-gray-200 rounded-md">
    <div class="mx-w-md w-full mx-auto p-4">
        <h2 class="mb-10 text-2xl font-bold">Register Page</h2>
        <div class="flex flex-col">
            Name
            <input class="bg-gray-100" type="text" bind:value={enteredName} />
        </div>
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
        <div class="flex flex-col">
            Confirm Password
            <input
                class="bg-gray-100"
                type="text"
                bind:value={enteredConfirmPassword}
            />
        </div>
        <button
            onclick={registerUser}
            class="mt-10 py-2 px-4 bg-green-400 text-white">Register</button
        >
    </div>
</div>
