<script lang="ts">
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";

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
</script>

<div class="w-full h-full bg-green-200">
    <div class="mx-w-md w-full mx-auto p-4">
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
        <button onclick={registerUser} class="bg-green-400 text-white"
            >Register</button
        >
    </div>
</div>
