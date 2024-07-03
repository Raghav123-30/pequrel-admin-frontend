<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar>
	<NavBrand href="/dashboard">
		<img src="/logo.png" class="me-3 h-6 sm:h-9" alt="Pequrel Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/dashboard">Home</NavLi>
		<NavLi href="/dashboard/products">Products</NavLi>
		<NavLi href="/dashboard/customers">Customers</NavLi>
		<NavLi href="/dashboard/crops">Crops</NavLi>

		<!--		TODO add logout button-->
	</NavUl>
</Navbar>
