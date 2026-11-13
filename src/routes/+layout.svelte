<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
	import { setContext } from "svelte";
	import type { User } from "#lib/types.ts";
	import { goto } from "$app/navigation";

	let { children }: LayoutProps = $props();

	interface Member {
		name: string;
		isNewMember: boolean;
		phoneNumber: string;
	}

	let churchMembers: Member[] = $state([
		{
			name: "Mr Ona",
			isNewMember: false,
			phoneNumber: "09145789036",
		},
	]);

	let enteredName = $state("");

	let startWelcoming = $state(false);

	function checkMemberStatus() {
		let isNewMember = true;

		for (const member of churchMembers) {
			if (enteredName == member.name) {
				isNewMember = false;
			}
		}

		if (isNewMember) {
			startWelcoming = true;
			console.log("welcome new member");
		} else {
			console.log("Day go house");
		}
	}

	let enteredPhoneNumber: string = $state("");
	function registerNewMember() {
		churchMembers.push({
			name: enteredName,
			phoneNumber: enteredPhoneNumber,
			isNewMember: false,
		});
		startWelcoming = false;
		enteredName = "";
		enteredPhoneNumber = "";

		// processAirtime()
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if startWelcoming}
	<div
		class="fixed indent-0
	bg-gray-900 w-full h-screen flex align-middle place-items-center justify-items-center"
	>
		<div class="max-w-sm w-full mx-auto flex flex-col gap-4">
			<p class="text-white">
				Thank you for fellowshiping with us. Enter you phone number
				below to get a #1000 airtime
			</p>
			<input
				bind:value={enteredPhoneNumber}
				class="bg-gray-200 p-4"
				type="text"
				placeholder="Phone Number"
			/>
			<button
				class="bg-blue-400 p-2 text-xs text-white"
				onclick={registerNewMember}>Become A Member</button
			>
		</div>
	</div>
{/if}

<div
	class="w-full h-screen flex align-middle place-items-center justify-items-center"
>
	<div class="max-w-sm w-full mx-auto flex flex-col gap-4">
		<div class="">
			{#each churchMembers as member, _}
				<div class="">
					<p>{member.name}</p>
					<p>{member.phoneNumber}</p>
				</div>
			{/each}
		</div>
		<input
			bind:value={enteredName}
			class="bg-gray-200 p-4"
			type="text"
			placeholder="name"
		/>
		<button
			class="bg-blue-400 p-2 text-xs text-white"
			onclick={checkMemberStatus}>check status</button
		>
	</div>
</div>

{@render children()}
