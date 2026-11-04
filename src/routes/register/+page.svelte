<script lang="ts">
    // variable
    // condition
    // loop
    // function

    let enteredUsername = $state("");
    let enteredPassword = $state("");
    let enteredConfirmPassword = $state("");

    let feedback = $state("");

    let isRegisted = $state(false);

    function registerUser() {
        if (enteredPassword != enteredConfirmPassword) {
            feedback = "password did not match";
        } else {
            feedback = "";
            isRegisted = true;
        }
    }

    // == -> "is"
    // != -> "is not"
    // && -> "and"
</script>

<div class="w-full h-screen flex flex-col align-middle place-items-center">
    {#if feedback !== ""}
        <div class="bg-red-300 text-white p-3 text-sm">{feedback}</div>
    {/if}

    {#if isRegisted}
        <h1 class="text-6xl">Welcome new user</h1>
    {:else}
        <div class="max-w-sm w-full flex flex-col gap-4">
            <div class="">
                Username: {enteredUsername}
            </div>
            <div class="">
                Password: {enteredPassword}
            </div>
            <div class="">
                Confirm Pass: {enteredConfirmPassword}
            </div>
            <div class="flex flex-col">
                Username
                <input
                    class="bg-gray-200"
                    type="text"
                    bind:value={enteredUsername}
                />
            </div>
            <div class="flex flex-col">
                Password
                <input
                    class="bg-gray-200"
                    type="text"
                    bind:value={enteredPassword}
                />
            </div>
            <div class="flex flex-col">
                Confirm Password
                <input
                    class="bg-gray-200"
                    type="text"
                    bind:value={enteredConfirmPassword}
                />
            </div>

            <button
                onclick={registerUser}
                class="bg-blue-400 text-white p-4 rounded-md"
            >
                Register
            </button>
        </div>
    {/if}
</div>
