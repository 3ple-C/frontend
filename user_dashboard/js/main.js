/** Component propagation */


// Dynamic Page Title
document.title = "Renzo Global Trading";

// Header & Footer Contents
const element = document.getElementById('header-insert'), element1 = document.getElementById('footer-insert'),
    header = `
        <!-- Navbar -->
            <div class="header dashboard">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-12">
                            <nav class="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                                <a class="navbar-brand" href="dashboard.html"><img src="/img/logo-coin.jpg" alt="logo" style="width: 18%; border-radius: 50px; margin-right: 5px;">RENZO</a>

                                <div class="header-right d-flex my-2 align-items-center">
                                    <div class="language">
                                        <div class="dropdown">
                                            <div class="icon" data-toggle="dropdown">
                                                <i class="flag-icon flag-icon-us"></i>
                                                <span>English</span>
                                            </div>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">
                                                    <i class="flag-icon flag-icon-bd"></i> Bengali
                                                </a>
                                                <a href="#" class="dropdown-item">
                                                    <i class="flag-icon flag-icon-fr"></i> French
                                                </a>
                                                <a href="#" class="dropdown-item">
                                                    <i class="flag-icon flag-icon-cn"></i> China
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dashboard_log">
                                        <div class="profile_log dropdown">
                                            <div class="user" data-toggle="dropdown">
                                                <span class="thumb"><i class="mdi mdi-account"></i></span>
                                                <span class="arrow"><i class="la la-angle-down"></i></span>
                                            </div>

                                            <div class="dropdown-menu dropdown-menu-right">
                                                <div class="user-email">
                                                    <div class="user">
                                                        <i class="thumb"><i class="mdi mdi-account"></i></i>
                                                        <div class="user-info">
                                                            <h6 class="userName"></h6>
                                                            <span class="userEmail"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="user-balance">
                                                    <div class="available">
                                                        <p>Available</p>
                                                        <span>0.00 USD</span>
                                                    </div>
                                                    <div class="total">
                                                        <p>Total</p>
                                                        <span>0.00 USD</span>
                                                    </div>
                                                </div>
                                                <a href="404.html" class="dropdown-item">
                                                    <i class="mdi mdi-account"></i> Account
                                                </a>
                                                <a href="data-tbi.html" class="dropdown-item">
                                                    <i class="mdi mdi-history"></i> History
                                                </a>
                                                <a href="settings.html" class="dropdown-item">
                                                    <i class="mdi mdi-settings"></i> Setting
                                                </a>
                                                <!--<a href="lock.html" class="dropdown-item">
                                                    <i class="mdi mdi-lock"></i> Lock
                                                </a>-->
                                                <button  class="dropdown-item logout" id="logout">
                                                    <i class="mdi mdi-logout"></i> Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar">
                <div class="menu">
                    <ul>
                        <li>
                            <a href="dashboard.html" data-toggle="tooltip" data-placement="right" title="Dashboard">
                                <span><i class="mdi mdi-view-dashboard"></i></span>
                            </a>
                        </li>
                        <li>
                            <a href="exchange.html" data-toggle="tooltip" data-placement="right" title="Exchange">
                                <span><i class="mdi mdi-tumblr-reblog"></i></span>
                            </a>
                        </li>
                        <li>
                            <a href="account-overview.html" data-toggle="tooltip" data-placement="right" title="Accounts">
                                <span><i class="mdi mdi-face-profile"></i></span>
                            </a>
                        </li>
                       <!-- <li>
                            <a href="data-tbi.html" data-toggle="tooltip" data-placement="right" title="Data">
                                <span><i class="mdi mdi-database"></i></span>
                            </a>
                        </li>-->
                        <li>
                            <a href="settings.html" data-toggle="tooltip" data-placement="right" title="Setting">
                                <span><i class="mdi mdi-settings"></i></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

    `,
    footer = `
     <div class="footer dashboard">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-8 col-12">
                        <div class="copyright">
                            <p>© Copyright
                                <script>
                                    var CurrentYear = new Date().getFullYear()
                                    document.write(CurrentYear)
                                </script> <a href="javascript:void(0)">Lacoste</a> All Rights Reserved
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-4 col-12">
                        <div class="footer-social">
                            <ul>
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    ;

// Dynamic Element contents
element.innerHTML = header;
element1.innerHTML = footer;

// Tawk.to
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/683098d8980dfb190f09ca12/1iruta4bu';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
