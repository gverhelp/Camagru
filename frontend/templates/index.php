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
					echo '<form action="../../backend/APICalls/logout.php" method="post">';
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
					</button>
					<?php
					if (isset($_SESSION['id']) > 0) {
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
							<div class="post-ctn" name="post-ctn">
								<header class="post-header">
									<img id="post-avatar" class="post-avatar" alt="avatar">
									<div class="post-header-infos">
										<h3 id="post-username" name="post-username"></h3>
										<p id="post-title"></p>
									</div>
								</header>
								<main class="post-main">
									<img id="post-picture" alt="post">
								</main>
								<footer class="post-footer">
									<button class="post-footer-btn" name="likeBtn">
										<svg id="svg-like" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
											<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
										</svg>
										<svg id="svg-like-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 hidden">
  											<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
										</svg>
										<span id="post-like"></span>
									</button>
									<button class="post-footer-btn" name="commentBtn">
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
									<img id="gallery-image" alt="picture" class="gallery-image">
									<div class="gallery-item-infos" name="galleryItemInfos">
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
								<video autoplay></video>
								<canvas class="hidden"></canvas>

								<img class="screenshot-img hidden" alt="screenshot">
							</div>
							<div class="create-side">
								<img class="create-sticker" src="../../backend/usersAvatarImg/21carla.JPG" alt="">
								<img class="create-sticker" src="../../backend/usersAvatarImg/21carla.JPG" alt="">
								<img class="create-sticker" src="../../backend/usersAvatarImg/21carla.JPG" alt="">
								<img class="create-sticker" src="../../backend/usersAvatarImg/21carla.JPG" alt="">
								<img class="create-sticker" src="../../backend/usersAvatarImg/21carla.JPG" alt="">
							</div>
						</div>
						<div class="create-footer">
							
							<div class="create-footer-wrapper">
								<div class="create-footer-select-camera">
									<select name="" id="" class="custom-select">
										<option value="">Select camera</option>
									</select>
								</div>
								<div class="create-footer-buttons">
									<button class="button screenshot-btn hidden" title="ScreenShot">Take picture</button>
									<span>or</span>
									<input type="file" id="upload-photo" name="photo">
								</div>
								<div class="create-footer-buttons-options hidden">
									<button class="button option-button" title="publish">Publish</button>
									<button class="button option-button" title="cancel">Cancel</button>
								</div>
							</div>

							<div class="create-footer-wrapper">
								<div class="create-footer-title-input"> 
									<label for="post-title">Title of your photo</label>
									<textarea id="create-post-title" name="title"></textarea>
								</div>
							</div>

						</div>
					</div>

					<!-- settings -->
					<div class="settings-ctn hidden">
						<div class="settings-title">
							Settings
						</div>
						<div class="settings-section">
								<div class="settings-form-wrapper">
									<label for="username-settings">New username</label>
									<input type="text" id="username-settings" name="username">
								</div>
								<div class="settings-form-wrapper">
									<label for="email-settings">New email</label>
									<input type="email" id="email-settings" name="email">
								</div>
								<div class="settings-form-wrapper">
									<label for="password-settings">New password</label>
									<input type="password" id="password-settings" name="password">
								</div>
								<div class="settings-form-wrapper">
									<label for="password-verification-settings">New password verification</label>
									<input type="password" id="password-verification-settings" name="password-verification">
								</div>
								<div class="settings-form-wrapper">
									<label for="avatar-settings">New avatar</label>
									<input type="file" id="avatar-settings" name="avatar">
								</div>
								<div class="settings-form-wrapper">
									<label for="bio-settings">New bio</label>
									<textarea id="bio-settings" name="bio"></textarea>
								</div>
						</div>
						<div class="settings-section">
							<button id="updateBtn" class="button"> Update </button>
							<div class="hidden" id="settings-response"></div>
						</div>
						<div class="settings-section">
							<label class="settings-checkbox">Email notifications :</label>
							<input type="checkbox">
							<!-- <span class="checkmark"></span> -->
						</div>
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
			<?php
			if (isset($_SESSION['id']) > 0) {
				// User is not authenticated, display the "Sign Up" and "Sign In" buttons
				echo '<button name="create" class="bottom-navbar-btn">';
				echo '	<img class="createImg" src="../static/img/create-outlined.svg" alt="create">';
				echo '</button>';
				echo '<button name="profile" class="bottom-navbar-btn">';
				echo '	<img class="profileImg" src="../static/img/profile-outlined.svg" alt="profile">';
				echo '</button>';
				echo '<button name="settings" class="bottom-navbar-btn">';
				echo '	<img class="settingsImg" src="../static/img/settings-outlined.svg" alt="settings">';
				echo '</button>';
			}
			?>
		</footer>

		<!-- modal -->
		<div class="modal">
			<svg id="closeModalBtn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
			<div class="modal-content">
			</div>
		</div>

		<!-- individual post -->
		<div class="individual-post-ctn hidden">
			<div class="individual-post-picture">
				<img id="indiv-picture" alt="picture">
			</div>
			<div class="individual-post-comments-ctn">
				<header class="individual-post-header-ctn">
					<img id="indiv-avatar" class="individual-post-avatar" src="../../backend/usersAvatarImg/21carla.JPG" alt="avatar">
					<div class="individual-post-infos-wrapper">
						<h3 id="individual-post-username"></h3>
						<span id="individual-post-title"></span>
					</div>
				</header>
				<main class="individual-post-main-ctn">
					<ul id="commentsUl">
						<template id="commentsList">
							<li>
								<img id="comment-avatar" class="individual-post-avatar" alt="avatar">
								<div class="comment-infos-wrapper">
									<h3 id="comment-username"></h3>
									<span id="comment-text"></span>
								</div>
							</li>
						</template>
					</ul>
				</main>
				<div class="individual-post-comment-input-ctn">
					<form id="comment-form">
       					<input id="comment-input" type="text" placeholder="Add a comment...">
    				</form>				
				</div>
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
					echo '<form id="logoutForm" action="../../backend/APICalls/logout.php" method="post">';
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
				<input id="username-signup" class="auth-input" placeholder="Username" type="text" name="username" autocomplete="username">
				<input id="email-signup" class="auth-input" placeholder="Email" name="email" autocomplete="email">
				<input id= "password-signup" class="auth-input" placeholder="Password" type="password" name="password" autocomplete="new-password">
				<button class="button"> Submit </button>
				<div class="error-message" id="error-message-signup"></div>
			</form>
		</div>

		<!-- Sign In -->
		<div class="sign" id="signin">
			<form class="sign-ctn" id="signIn-form">
				<img id="signInLogo" src="../static/img/instgram-black.png" alt="logo" style="margin-bottom: 40px; width: 135px; height: auto;">
				<input id="username-signin" class="auth-input" placeholder="Username" type="text" name="username" autocomplete="username">
				<input id="password-signin" class="auth-input" placeholder="Password" type="password" name="password" autocomplete="current-password">
				<button class="button"> Submit </button>
				<div class="error-message" id="error-message-signin"></div>
			</form>
		</div>

	</body>

	<script>
		var actualUserID = <?php	if (isset($_SESSION['id'])) {
								echo json_encode($_SESSION['id']);
							} else {
								echo -1;
							}
					?>;
	</script>

	<script type="module" src="../static/js/script.js">
	</script>

</html>