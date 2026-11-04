<script lang="ts">
    import { onMount } from "svelte";

    // variable
    // condition
    // loop
    // function

    const username = "John";
    const password = "Password";

    let enteredUsername = $state("");
    let enteredPassword = $state("");

    let isLoggedIn = $state(false);
    let feedback = $state("");

    function login() {
        // if (enteredUsername == username && enteredPassword == password) {
        //     // entered username is username and entered password is password
        //     feedback = "";
        //     isLoggedIn = true;
        // } 
        
        // else {
        //     feedback = "invalid username or password";
        //     isLoggedIn = false;
        // }




        if (enteredUsername == username){
            // entered username is expected username


            if (enteredPassword == password){
                // entered password is expected password
                feedback = ""
                isLoggedIn = true
            }
            else {
                // entered password in not expected password
                feedback = "wrong password"
                isLoggedIn = false;
            }
        }
        else {
            
            // entered username is not expected username
            feedback = "wrong username"
            isLoggedIn = false;
        }
    }

    // == -> "is"
    // != -> "is not"
    // && -> "and"
</script>

<div
    class="w-full h-screen flex justify-center align-middle place-items-center"
>
    <div class="max-w-md w-full">
        {feedback}
        {#if isLoggedIn}
            <h1>Welcome to dashboard</h1>
        {:else}
            <div class="flex flex-col gap-4">
                <input
                    class="bg-gray-200"
                    type="text"
                    placeholder="username"
                    bind:value={enteredUsername}
                />
                <input
                    class="bg-gray-200"
                    placeholder="password"
                    type="text"
                    bind:value={enteredPassword}
                />
                <button class="bg-gray-600" onclick={login}>Login</button>
            </div>
        {/if}
    </div>
</div>
