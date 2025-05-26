/** Component propagation */

// Dynamic Page Title
document.title = "Renzo Global Trading";

// Header & Footer Contents
const element = document.getElementById('header-insert'), element1 = document.getElementById('footer-insert'),
    header = `
           <header class="header">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="header__content">
						<!-- btn -->
						<button class="header__btn" type="button" aria-label="header__nav">
							<span></span>
							<span></span>
							<span></span>
						</button>
						<!-- end btn -->

						<!-- logo -->
						<a href="index-2.html" class="header__logo">
							<img src="img/logo-coin.jpg" alt="logo" style="border-radius: 50px;">
						</a>
						<!-- end logo -->

						<!-- tagline -->
						<span class="header__tagline">Renzo Global <br>Corporate</span>
						<!-- end tagline -->

						<!-- navigation -->
						<ul class="header__nav" id="header__nav">
							<li>
								<a href="index.html">Home</a>
							</li>

							<li>
								<a href="token.html">Token</a>
							</li>
							<li>
								<a href="invest.html">Features</a>
							</li>

							<li>
								<a href="affiliate.html">Affiliate</a>
							</li>

							<li>
								<a href="contacts.html">Contact <i class="ti ti-point-filled"></i></a>
							</li>
						</ul>
						<!-- end navigation -->

						<!-- language -->
						<div class="header__language">
							<a class="dropdown-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">EN <i class="ti ti-point-filled"></i></a>

							<ul class="dropdown-menu header__language-menu">
								<li><a href="#">English</a></li>
								<li><a href="#">Spanish</a></li>
								<li><a href="#">French</a></li>
							</ul>
						</div>
						<!-- end language -->

						<!-- profile -->
						<a href="signup.html" class="header__profile">
							<i class="ti ti-user-circle"></i>
							<span>Profile</span>
						</a>
						<!-- end profile -->
					</div>
				</div>
			</div>
		</div>
	</header>
    `, 
    footer =`
        <footer class="footer">
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 order-1 order-lg-4 order-xl-1">
					<!-- footer logo -->
					<div class="footer__logo">
						<img src="img/logo-coin.jpg" alt="" style="border-radius: 50px;">
					</div>
					<!-- end footer logo -->

					<!-- footer tagline -->
					<p class="footer__tagline">The Renzo team works hard <br>to deliver exceptional financial results <br>and increase our clients' revenue.</p>
					<!-- end footer tagline -->

					<!-- footer currencies -->
					<div class="footer__currencies">
						<i class="ti ti-currency-bitcoin"></i>
						<i class="ti ti-currency-ethereum"></i>
						<i class="ti ti-currency-litecoin"></i>
						<i class="ti ti-currency-solana"></i>
						<i class="ti ti-currency-dogecoin"></i>
					</div>
					<!-- end footer currencies -->
				</div>

				<!-- navigation -->
				<div class="col-6 col-md-4 col-lg-3 col-xl-2 order-3 order-md-2 order-lg-2 order-xl-3 offset-md-2 offset-lg-0">
					<h6 class="footer__title">Company</h6>
					<div class="footer__nav">
						<a href="about.html">About Centure</a>
						<a href="javascript:void(0)">Our news</a>
						<a href="javascript:void(0)">License</a>
						<a href="contacts.html">Contacts</a>
					</div>
				</div>

				<div class="col-12 col-md-8 col-lg-6 col-xl-4 order-2 order-md-3 order-lg-1 order-xl-2">
					<div class="row">
						<div class="col-12">
							<h6 class="footer__title">Services & Features</h6>
						</div>

						<div class="col-6">
							<div class="footer__nav">
								<a href="invest.html">Invest</a>
								<a href="token.html">Token</a>
								<a href="affiliate.html">Affiliate</a>
							</div>
						</div>

						<div class="col-6">
							<div class="footer__nav">
								<a href="javascript:void(0)">Safety</a>
								<a href="javascript:void(0)">Automatization</a>
								<a href="javascript:void(0)">Analytics</a>
								<a href="javascript:void(0)">Reports</a>
							</div>
						</div>
					</div>
				</div>

				<div class="col-6 col-md-4 col-lg-3 col-xl-2 order-4 order-md-4 order-lg-3 order-xl-4">
					<h6 class="footer__title">Support</h6>
					<div class="footer__nav">
						<a href="javascript:void(0)">Help center</a>
						<a href="javascript:void(0)">How it works</a>
						<a href="javascript:void(0)">Privacy policy</a>
						<a href="javascript:void(0)">Terms & conditions</a>
					</div>
				</div>
				<!-- end navigation -->
			</div>

			<div class="row">
				<div class="col-12">
					<div class="footer__content">
						<!-- footer social -->
						<div class="footer__social">
							<a href="#" target="_blank"><i class="ti ti-brand-facebook"></i></a>
							<a href="#" target="_blank"><i class="ti ti-brand-x"></i></a>
							<a href="#" target="_blank"><i class="ti ti-brand-instagram"></i></a>
							<a href="#" target="_blank"><i class="ti ti-brand-telegram"></i></a>
							<a href="#" target="_blank"><i class="ti ti-brand-discord"></i></a>
							<a href="#" target="_blank"><i class="ti ti-brand-linkedin"></i></a>
						</div>
						<!-- end footer social -->

						<!-- footer copyright -->
						<small class="footer__copyright">© Renzo Corporation 2025. Created by <a href="javascript:void(0)" target="_blank">Lacoste Team</a>.</small>
						<!-- end footer copyright -->
					</div>
				</div>
			</div>
		</div>

		<!-- design elements -->
		<span class="screw screw--footer screw--footer-bl"></span>
		<span class="screw screw--footer screw--footer-br"></span>
		<span class="screw screw--footer screw--footer-tr"></span>
		<span class="screw screw--footer screw--footer-tl"></span>
	</footer>
    `
;

element.innerHTML = header;
element1.innerHTML = footer;

var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
	var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
	s1.async = true;
	s1.src = 'https://embed.tawk.to/683098d8980dfb190f09ca12/1iruta4bu';
	s1.charset = 'UTF-8';
	s1.setAttribute('crossorigin', '*');
	s0.parentNode.insertBefore(s1, s0);
})();