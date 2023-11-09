<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title>Instgram</title>

		<link rel="stylesheet" href="../static/css/style.css">
		<link rel="icon" type="image/x-icon" href="../static/img/favicon.ico">

	</head>

	<body>
		<!-- header design  -->
		<header class="header">
			<a class="logo">
				<img class="logoIcon" src="../static/img/instgram-black.png" alt="logo">
				<span>Instgram</span>
			</a>

			<div class="searchbar">
				<input type="text" placeholder="Search">
				<button>
					<img src="../static/img/searchIcon.svg">
				</button>
			</div>
			
			<nav id="navbar" class="navbar">
				<button name="theme" class="switchTheme-btn">
					<img class="themeIcon" src="../static/img/moon-outlined.svg">
				</button>
				<?php
				if (isset($_SESSION['id']) <= 0) {
					echo '<button name="signUp" class="button">Sign Up</button>';
					echo '<button name="signIn" class="button">Sign In</button>';
				} else {
					echo '<form action="logout.php" method="post">';
					echo '	<button class="button"> Log out </button>';
					echo '</form>';
				}
				?>
			</nav>

			<div class="dropdown-btn-ctn">
				<button class="dropdown-btn">
					<img class="menuIcon" src="../static/img/menu-bar.svg" alt="menu">
				</button>
			</div>

		</header> 

		<!-- main design -->
		<div class="main-ctn">

			<!-- main left -->
			<section id="leftBtns" class="main-left">
				<div class="main-left-ctn">
					<button name="home" class="left-btn">
						<img class="homeImg" src="../static/img/home-filled.svg" alt="home">
						<span> Home </span>
					<?php
					if (isset($_SESSION['id']) > 0) {
						echo '</button>';
						echo '<button name="create" class="left-btn">';
						echo '	<img class="createImg" src="../static/img/create-outlined.svg" alt="create">';
						echo '	<span> Create </span>';
						echo '</button>';
						echo '<button name="profile" class="left-btn">';
						echo '	<img class="profileImg" src="../static/img/profile-outlined.svg" alt="profile">';
						echo '	<span> Profile </span>';
						echo '</button>';
						echo '<button name="settings" class="left-btn">';
						echo '	<img class="settingsImg" src="../static/img/settings-outlined.svg" alt="settings">';
						echo '	<span> Settings </span>';
						echo '</button>';
					}
					?>
				</div>
			</section>

			<!-- main center -->
			<section class="main-center">
				<div class="main-center-ctn">

					<!-- home -->
					<div class="home-ctn hidden">
						<template id="post-ctn">
							<div class="post-ctn">
								<header class="post-header">
									<img id="post-avatar" class="post-avatar" alt="avatar">
									<div class="post-header-infos">
										<h3 id="post-name"></h3>
										<p id="post-localisation"></p>
									</div>
								</header>
								<main class="post-main">
										<img id="post-picture" alt="post">
								</main>
								<footer class="post-footer">
									<button class="post-footer-btn">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
											<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
										</svg>
										<span id="post-like"></span>
									</button>
									<button class="post-footer-btn">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
											<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
										</svg>
										<span id="post-comment"></span>
									</button>
								</footer>
							</div>
						</template>
					</div>

					<!-- profile -->
					<div class="profile-ctn hidden">
						<header class="profile-header">
							<div class="profile-avatar-ctn">
								<img id="profile-picture" alt="profile-picture">
							</div>
							<div class="profile-infos">
								<div class="profile-infos-username">
									<span id="profile-name"></span> 
								</div>
								<div class="profile-infos-stats">
									<li>
										<span id="profile-posts"></span>posts
									</li>
									<li>
										<span id="profile-followers"></span>followers
									</li>
									<li>
										<span id="profile-following"></span>following
									</li>
								</div>
								<div class="profile-infos-bio">
									<span id="profile-bio">
									</span>
								</div>
							</div>
						</header>

						<div class="profile-gallery">
							<template id="gallery-ctn">
								<div class="gallery-item">
									<img id="gallery-item" alt="picture" class="gallery-image">
									<div class="gallery-item-infos" data-target="individual-picture">
										<img src="../static/img/white-heart.png" alt="like">
										<span id="gallery-like"></span>
										<img src="../static/img/white-comment.png" alt="comment">
										<span id="gallery-comment"></span>
									</div>
								</div>
							</template>
						</div>
					</div>

					<!-- create -->
					<div class="create-ctn hidden">
						<div class="create-wrapper">
							<div class="create-main">
								<div class="create-canva"></div>
								</div>
								<div class="create-side"></div>
							</div>
						<div class="create-footer"></div>
					</div>

					<!-- settings -->
					<div class="settings-ctn hidden"> Settings 
						
					</div>

				</div>
			</section>

			<!-- main right -->
			<section class="main-right">
			</section>
		</div>

		<!-- footer -->
		<footer id="bottomBtns" class="bottom-navbar">
			<button name="home" class="bottom-navbar-btn">
				<img class="homeImg" src="../static/img/home-filled.svg" alt="home">
			</button>
			<button name="create" class="bottom-navbar-btn">
				<img class="createImg" src="../static/img/create-outlined.svg" alt="create">
			</button>
			<button name="profile" class="bottom-navbar-btn">
				<img class="profileImg" src="../static/img/profile-outlined.svg" alt="profile">
			</button>
			<button name="settings" class="bottom-navbar-btn">
				<img class="settingsImg" src="../static/img/settings-outlined.svg" alt="settings">
			</button>
		</footer>

		<!-- modal -->
		<div class="modal">
			<svg id="closeModalBtn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
			<div class="modal-content">
			</div>
		</div>

		<!-- dropdown menu -->
		<div class="dropdown-menu">
			<?php
				if (isset($_SESSION['id']) <= 0) {
					// User is not authenticated, display the "Sign Up" and "Sign In" buttons
					echo '<button name="sign-up" class="dropdown-menu-btn">Sign Up</button>';
					echo '<button name="sign-in" class="dropdown-menu-btn">Sign In</button>';
				} else {
					echo '<form action="logout.php" method="post">';
					echo '	<button class="dropdown-menu-btn"> Log out </button>';
					echo '</form>';
				}
				?>
			<button name="theme" class="dropdown-menu-btn">
				Switch theme
			</button>
		</div>

		<!-- Sign Up  -->
		<div class="sign" id="signup">
			<form class="sign-ctn" id="signUp-form">
				<img id="signUpLogo" src="../static/img/instgram-black.png" alt="logo" style="margin-bottom: 40px; width: 135px; height: auto;">
				<input id="username-signup" class="auth-input" placeholder="Username" type="text" name="username">
				<input id="email-signup" class="auth-input" placeholder="Email" name="email">
				<input id= "password-signup" class="auth-input" placeholder="Password" type="password" name="password">
				<button class="button"> Submit </button>
				<div class="error-message" id="error-message-signup"></div>
			</form>
		</div>

		<!-- Sign In -->
		<div class="sign" id="signin">
			<form class="sign-ctn" id="signIn-form">
				<img id="signInLogo" src="../static/img/instgram-black.png" alt="logo" style="margin-bottom: 40px; width: 135px; height: auto;">
				<input id="username-signin" class="auth-input" placeholder="Username" type="text" name="username">
				<input id="password-signin" class="auth-input" placeholder="Password" type="password" name="password">
				<button class="button"> Submit </button>
				<div class="error-message" id="error-message-signin"></div>
			</form>
		</div>

	</body>

	<script>
		var userId = <?php	if (isset($_SESSION['id'])) {
								echo json_encode($_SESSION['id']);
							} else {
								echo -1;
							}
					?>;
	</script>

	<script type="module" src="../static/js/script.js">
	</script>

</html>