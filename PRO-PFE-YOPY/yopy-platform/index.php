<?php
// Simple front controller for auth routes.
$basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
if ($basePath === '/') {
    $basePath = '';
}
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($basePath !== '' && strpos($requestPath, $basePath) === 0) {
    $requestPath = substr($requestPath, strlen($basePath));
}
if ($requestPath === '') {
    $requestPath = '/';
}

if (in_array($requestPath, ['/auth/login', '/auth/register', '/auth/logout', '/auth/forgot', '/auth/reset'], true)) {
    require_once __DIR__ . '/controllers/AuthController.php';
    require_once __DIR__ . '/models/UserModel.php';
    require_once __DIR__ . '/models/PasswordResetModel.php';
    $controller = new Controllers\AuthController();
    if ($requestPath === '/auth/login') {
        $controller->login();
    } elseif ($requestPath === '/auth/register') {
        $controller->register();
    } elseif ($requestPath === '/auth/forgot') {
        $controller->forgotPassword();
    } elseif ($requestPath === '/auth/reset') {
        $controller->resetPassword();
    } else {
        $controller->logout();
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>YOPY — Helping Families Grow Brighter</title>
    <meta name="description" content="YOPY is an AI-assisted child platform combining games, emotional intelligence and parental monitoring for safer digital experiences.">
    <meta name="keywords" content="child safety, parental control, AI parenting, educational games">
    <meta name="author" content="YOPY">
    <link rel="icon" type="image/png" href="/public/images/fffff.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;0,900;1,300;1,700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="preload" href="/public/images/nav-bar_logo.png" as="image">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./public/css/style.css">
    <script src="./public/js/ui/main.js" defer></script>

    <style>
        /* ═══════════════════════════════════════
           CAROUSEL — fully rebuilt
        ═══════════════════════════════════════ */

        /* ── outer wrapper: clips the sliding track ── */
        .carousel-outer {
            position: relative;
            overflow: hidden;
            /* side fade so edges dissolve gracefully */
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
            mask-image:         linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
            padding: 1.5rem 0 1rem;
        }

        /* ── the scrolling flex row ── */
        .carousel-track {
            display: flex;
            gap: 20px;
            transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
            padding: 0 4%;
        }

        /* ── individual card ── */
        .carousel-card {
            /* JS will set --card-width on the outer wrapper */
            flex: 0 0 var(--card-width, calc(33.333% - 14px));
            background: rgba(255,255,255,0.035);
            border: 1px solid rgba(196,181,253,0.10);
            border-radius: 22px;
            padding: 0;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .carousel-card:hover {
            transform: translateY(-5px);
            border-color: rgba(196,181,253,0.32);
            box-shadow: 0 18px 45px rgba(90,40,180,0.22);
        }

        /* ── per-card top accent stripe ── */
        .carousel-card .card-accent {
            height: 3px;
            width: 100%;
            border-radius: 22px 22px 0 0;
        }
        .carousel-card:nth-child(1) .card-accent { background: linear-gradient(90deg,#7c3aed,#a855f7); }
        .carousel-card:nth-child(2) .card-accent { background: linear-gradient(90deg,#d946ef,#ec4899); }
        .carousel-card:nth-child(3) .card-accent { background: linear-gradient(90deg,#3b82f6,#818cf8); }
        .carousel-card:nth-child(4) .card-accent { background: linear-gradient(90deg,#f59e0b,#f97316); }
        .carousel-card:nth-child(5) .card-accent { background: linear-gradient(90deg,#10b981,#06b6d4); }

        /* ── card body ── */
        .carousel-card .card-body-inner {
            padding: 1.6rem 1.7rem 1.8rem;
            position: relative;
        }

        /* card number badge, top-right */
        .card-num {
            position: absolute;
            top: 1.1rem;
            right: 1.2rem;
            font-size: 0.7rem;
            font-family: var(--font-display,'Fraunces',serif);
            color: rgba(255,255,255,0.18);
            font-weight: 700;
            letter-spacing: 0.05em;
        }

        /* icon container */
        .carousel-card .feat-icon {
            width: 48px; height: 48px;
            border-radius: 13px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 1.1rem;
        }
        .carousel-card:nth-child(1) .feat-icon { background: rgba(124,58,237,0.18); border: 1px solid rgba(124,58,237,0.3); }
        .carousel-card:nth-child(2) .feat-icon { background: rgba(217,70,239,0.15); border: 1px solid rgba(217,70,239,0.3); }
        .carousel-card:nth-child(3) .feat-icon { background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); }
        .carousel-card:nth-child(4) .feat-icon { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); }
        .carousel-card:nth-child(5) .feat-icon { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); }

        .carousel-card h3 {
            font-family: var(--font-display,'Fraunces',serif);
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.55rem;
            line-height: 1.25;
        }
        .carousel-card p {
            color: rgba(255,255,255,0.48);
            font-size: 0.875rem;
            line-height: 1.65;
            margin: 0;
        }

        /* ── nav arrow buttons — floating sides ── */
        .carousel-btn {
            position: absolute;
            top: 50%; transform: translateY(-50%);
            z-index: 10;
            width: 42px; height: 42px;
            border-radius: 50%;
            background: rgba(15,7,30,0.75);
            border: 1px solid rgba(196,181,253,0.22);
            color: #fff;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.22s ease;
        }
        .carousel-btn:hover {
            background: rgba(124,58,237,0.45);
            border-color: rgba(196,181,253,0.5);
            transform: translateY(-50%) scale(1.1);
        }
        .carousel-btn:disabled { opacity: 0.3; pointer-events: none; }
        .carousel-btn-prev { left: 6px; }
        .carousel-btn-next { right: 6px; }

        /* ── bottom controls bar ── */
        .carousel-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
            margin-top: 1.5rem;
            padding: 0 1rem;
        }

        /* progress track */
        .carousel-progress {
            flex: 1;
            max-width: 180px;
            height: 3px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            overflow: hidden;
        }
        .carousel-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #7c3aed, #d946ef);
            border-radius: 2px;
            transition: width 0.4s ease;
        }

        /* dots */
        .c-dots { display: flex; gap: 6px; align-items: center; }
        .c-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .c-dot.active {
            background: #d946ef;
            width: 20px;
            border-radius: 3px;
        }

        /* play/pause pill */
        .carousel-play-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(196,181,253,0.18);
            border-radius: 20px;
            color: rgba(255,255,255,0.6);
            font-size: 0.72rem;
            padding: 0.3rem 0.85rem;
            cursor: pointer;
            display: flex; align-items: center; gap: 0.35rem;
            transition: all 0.22s ease;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }
        .carousel-play-btn:hover {
            background: rgba(124,58,237,0.2);
            border-color: rgba(196,181,253,0.38);
            color: #fff;
        }

        /* ── responsive card widths via CSS ── */
        @media (max-width: 640px) {
            .carousel-card { flex: 0 0 82%; }
            .carousel-btn { display: none; }
            .carousel-outer { -webkit-mask-image: none; mask-image: none; padding: 1rem 0; }
            .carousel-track { padding: 0 2%; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
            .carousel-card { flex: 0 0 calc(50% - 10px); }
        }
        @media (min-width: 1024px) {
            .carousel-card { flex: 0 0 calc(33.333% - 14px); }
        }

        /* ── SLOGANS REPLACING STATS ── */
        .slogan-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .slogan-box {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(196,181,253,0.1);
            border-radius: 16px;
            padding: 1.25rem 1rem;
            backdrop-filter: blur(8px);
            transition: border-color 0.3s ease;
        }
        .slogan-box:hover { border-color: rgba(196,181,253,0.28); }
        .slogan-icon {
            width: 36px; height: 36px;
            border-radius: 10px;
            background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(217,70,239,0.2));
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 0.65rem;
        }
        .slogan-word {
            font-family: var(--font-display, 'Fraunces', serif);
            font-size: 1.05rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.25rem;
            line-height: 1.2;
        }
        .slogan-sub { color: rgba(255,255,255,0.45); font-size: 0.78rem; line-height: 1.5; }

        /* ── TEAM CARDS SVG AVATARS ── */
        .team-avatar-wrap {
            width: 72px; height: 72px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(217,70,239,0.25));
            border: 2px solid rgba(196,181,253,0.2);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1rem;
        }

        /* ── TRUST STRIP SVG FIX ── */
        .trust-strip-icon { width: 16px; height: 16px; flex-shrink: 0; }

        /* ── MINI CARDS SVG ── */
        .mini-card-icon { width: 28px; height: 28px; }

        /* ── SOCIAL ICONS ── */
        .social-icon-btn {
            width: 38px; height: 38px;
            border-radius: 50%;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(196,181,253,0.18);
            display: flex; align-items: center; justify-content: center;
            color: #fff;
            text-decoration: none;
            transition: all 0.25s ease;
        }
        .social-icon-btn:hover {
            background: rgba(217,70,239,0.2);
            border-color: rgba(217,70,239,0.5);
            color: #fff;
        }
        .social-icon-btn svg { width: 16px; height: 16px; }

        /* ── HERO FAMILY AVATARS ── */
        .family-avatar {
            width: 34px; height: 34px;
            border-radius: 50%;
            background: linear-gradient(135deg, #7c3aed, #d946ef);
            border: 2px solid #0d0720;
            display: flex; align-items: center; justify-content: center;
            margin-left: -8px;
        }
        .family-avatar:first-child { margin-left: 0; }
        .family-avatar svg { width: 16px; height: 16px; }
    </style>
</head>

<body>
    <!-- Background Effects -->
    <canvas id="starCanvas"></canvas>
    <div class="sparkle-field" id="sparkleField"></div>

    <div class="page-wrapper">

        <!-- Header -->
        <header id="mainHeader" class="d-flex align-items-center w-100 px-3 px-md-5">
            <div class="container-fluid d-flex justify-content-between align-items-center px-0">
                <a href="#" class="text-decoration-none d-flex align-items-center gap-2">
                    <div class="logo-mark text-white">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M9 0L10.96 6.54L17.5 6.35L12.24 10.46L14.09 17L9 13L3.91 17L5.76 10.46L0.5 6.35L7.04 6.54L9 0Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <span class="logo-text">YOPY</span>
                </a>

                <nav class="pill-nav d-none d-md-block">
                    <ul class="d-flex mb-0 ps-0 list-unstyled gap-2">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#awareness">About</a></li>
                        <li><a href="#team">Team</a></li>
                    </ul>
                </nav>

                <div class="d-flex align-items-center gap-3">
                    <a href="<?= $basePath ?>/auth/login" class="btn-login d-none d-sm-block">Login</a>
                    <a href="<?= $basePath ?>/auth/register" class="btn-signup d-none d-sm-flex">Sign Up
                        <svg width="12" height="12" viewBox="0 0 18 18" fill="none" style="margin-left:4px;"><path d="M9 0L10.96 6.54L17.5 6.35L12.24 10.46L14.09 17L9 13L3.91 17L5.76 10.46L0.5 6.35L7.04 6.54L9 0Z" fill="currentColor"/></svg>
                    </a>
                    <button class="mobile-menu-btn d-md-none" id="mobileMenuBtn" aria-label="Toggle menu" aria-expanded="false">
                        <span class="bar top"></span>
                        <span class="bar mid"></span>
                        <span class="bar bot"></span>
                    </button>
                </div>
            </div>
        </header>

        <!-- MOBILE MENU OVERLAY -->
        <div id="mobileMenu" class="mobile-menu-overlay d-md-none">
            <nav class="mobile-nav-content">
                <ul>
                    <li><a href="#home" class="mobile-link">Home</a></li>
                    <li><a href="#features" class="mobile-link">Features</a></li>
                    <li><a href="#awareness" class="mobile-link">About</a></li>
                    <li><a href="#team" class="mobile-link">Team</a></li>
                    <li><hr class="border-secondary opacity-25 w-50 mx-auto my-2"></li>
                    <li><a href="<?= $basePath ?>/auth/login" class="mobile-link" style="color: var(--lavender); font-size: 22px;">Login</a></li>
                    <li><a href="<?= $basePath ?>/auth/register" class="mobile-link" style="color: var(--magenta); font-size: 22px;">Sign Up ✦</a></li>
                </ul>
            </nav>
        </div>

        <!-- HERO -->
        <section id="home" class="hero d-flex align-items-center">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 text-center text-lg-start mb-5 mb-lg-0 py-5">
                        <div class="hero-badge d-inline-flex align-items-center gap-2 px-3 py-1 mb-4">
                            <span class="hero-dot"></span> Trusted by families worldwide
                        </div>

                        <h1 class="hero-headline mb-4">
                            Helping Families
                            <span class="gradient-word d-block d-lg-inline">Grow Brighter</span>
                            <span class="font-italic fw-light">Together
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="display:inline;vertical-align:middle;margin-left:4px;">
                                    <path d="M12 2L13.9 8.26L20.5 8.09L15.5 11.97L17.27 18.23L12 14.5L6.73 18.23L8.5 11.97L3.5 8.09L10.1 8.26L12 2Z" fill="#f0d060" opacity="0.9"/>
                                    <circle cx="19" cy="5" r="1.5" fill="#f0d060" opacity="0.6"/>
                                    <circle cx="5" cy="19" r="1" fill="#f0d060" opacity="0.5"/>
                                </svg>
                            </span>
                        </h1>

                        <p class="fs-5 text-white-50 mb-5 mx-auto mx-lg-0" style="max-width: 480px;">
                            YOPY is a smart and safe platform designed to help parents understand
                            their children's emotional and digital behavior through magical, engaging experiences.
                        </p>

                        <div class="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap mb-5">
                            <a href="<?= $basePath ?>/auth/register" class="cta-primary">Get Started
                                <svg width="12" height="12" viewBox="0 0 18 18" fill="none" style="margin-left:4px;"><path d="M9 0L10.96 6.54L17.5 6.35L12.24 10.46L14.09 17L9 13L3.91 17L5.76 10.46L0.5 6.35L7.04 6.54L9 0Z" fill="currentColor"/></svg>
                            </a>
                            <a href="#awareness" class="cta-secondary">
                                <div class="play-icon text-white d-flex align-items-center justify-content-center">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><path d="M2 1L9 5L2 9V1Z"/></svg>
                                </div>
                                Watch Video
                            </a>
                        </div>

                        <!-- Family avatars strip -->
                        <div class="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 pt-4 border-top border-secondary">
                            <div class="d-flex">
                                <!-- Parent & child avatar 1 -->
                                <div class="family-avatar" style="z-index:4">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="5" r="2.5" fill="white" opacity="0.9"/>
                                        <path d="M3 13.5C3 11.015 5.239 9 8 9s5 2.015 5 4.5" stroke="white" stroke-width="1.4" stroke-linecap="round" opacity="0.9"/>
                                    </svg>
                                </div>
                                <!-- Parent & child avatar 2 -->
                                <div class="family-avatar" style="z-index:3">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6" cy="4.5" r="2" fill="white" opacity="0.9"/>
                                        <circle cx="11" cy="6" r="1.5" fill="white" opacity="0.75"/>
                                        <path d="M2 13C2 10.9 3.8 9.2 6 9.2" stroke="white" stroke-width="1.3" stroke-linecap="round" opacity="0.9"/>
                                        <path d="M10 11.5C10 10.1 10.9 9 12 9" stroke="white" stroke-width="1.1" stroke-linecap="round" opacity="0.7"/>
                                    </svg>
                                </div>
                                <!-- Family avatar 3 -->
                                <div class="family-avatar" style="z-index:2">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="5" r="1.8" fill="white" opacity="0.9"/>
                                        <circle cx="11" cy="5" r="1.8" fill="white" opacity="0.9"/>
                                        <circle cx="8" cy="9" r="1.4" fill="white" opacity="0.75"/>
                                        <path d="M2 14C2 12 3.3 10.5 5 10.5" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                                        <path d="M14 14C14 12 12.7 10.5 11 10.5" stroke="white" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="text-white-50" style="font-size: 13px;">
                                <strong style="color: var(--lavender); font-size: 14px; display: block;">Families everywhere</strong>
                                growing brighter together
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 d-none d-lg-flex justify-content-center">
                        <div class="hero-card-float w-75 position-relative">
                            <!-- Mini card 1 -->
                            <div class="mini-card mc1 d-flex align-items-center gap-2 shadow-lg z-3">
                                <div class="mini-card-icon d-flex align-items-center justify-content-center">
                                    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                                        <circle cx="14" cy="14" r="13" fill="rgba(124,58,237,0.25)" stroke="rgba(196,181,253,0.3)" stroke-width="1"/>
                                        <path d="M14 7L15.5 11.5H20.5L16.5 14.5L18 19L14 16.5L10 19L11.5 14.5L7.5 11.5H12.5L14 7Z" fill="#c4b5fd"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-white-50" style="font-size: 12px;">Safety Score</div>
                                    <div class="fw-bold text-white fs-6">Always On</div>
                                </div>
                            </div>
                            <!-- Mini card 2 -->
                            <div class="mini-card mc2 d-flex align-items-center gap-2 shadow-lg z-3">
                                <div class="mini-card-icon d-flex align-items-center justify-content-center">
                                    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                                        <circle cx="14" cy="14" r="13" fill="rgba(217,70,239,0.2)" stroke="rgba(217,70,239,0.3)" stroke-width="1"/>
                                        <rect x="7" y="9" width="14" height="10" rx="2" fill="none" stroke="#f0abfc" stroke-width="1.5"/>
                                        <path d="M11 13L13 15L17 11" stroke="#f0abfc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-white-50" style="font-size: 12px;">Mini-Games</div>
                                    <div class="fw-bold text-white fs-6">Fun & Safe</div>
                                </div>
                            </div>
                            <!-- Central card -->
                            <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center p-5 rounded-circle border" style="background: radial-gradient(circle, rgba(157,63,255,0.2) 0%, transparent 70%); border-color: rgba(255,255,255,0.05)!important; min-height: 400px;">
                                <img
                                    src="public/images/logo_with_character-removebg-preview.png"
                                    alt="YOPY character"
                                    style="max-width: 320px; width: 100%; filter: drop-shadow(0 0 20px rgba(240,0,245,0.5));"
                                >
                                <div class="font-italic fw-light position-relative z-2 mt-3" style="color: var(--lavender); font-family: var(--font-display); font-size: 24px;">"Our family, our magic"</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TRUST STRIP -->
        <div class="trust-strip position-relative z-3">
            <div class="marquee-track">
                <div class="d-flex align-items-center gap-2 text-white-50">
                    <svg class="trust-strip-icon" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" fill="rgba(196,181,253,0.7)"/></svg>
                    UNICEF Aligned
                </div>
                <div style="color: var(--magenta)">·</div>
                <div class="d-flex align-items-center gap-2 text-white-50">
                    <svg class="trust-strip-icon" viewBox="0 0 16 16" fill="none"><path d="M8 2L10 6H14L11 9L12.5 13L8 10.5L3.5 13L5 9L2 6H6L8 2Z" fill="none" stroke="rgba(196,181,253,0.6)" stroke-width="1.2"/><path d="M8 2C8 2 13 5 13 9C13 11.5 10.8 13.5 8 14C5.2 13.5 3 11.5 3 9C3 5 8 2 8 2Z" fill="none" stroke="rgba(196,181,253,0.5)" stroke-width="1.2"/></svg>
                    Child-Safe Certified
                </div>
                <div style="color: var(--magenta)">·</div>
                <div class="d-flex align-items-center gap-2 text-white-50">
                    <svg class="trust-strip-icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(196,181,253,0.6)" stroke-width="1.2"/><path d="M5 8L7 10L11 6" stroke="rgba(196,181,253,0.8)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Safe &amp; Secure
                </div>
                <div style="color: var(--magenta)">·</div>
                <div class="d-flex align-items-center gap-2 text-white-50">
                    <svg class="trust-strip-icon" viewBox="0 0 16 16" fill="none"><rect x="4" y="7" width="8" height="7" rx="1.5" stroke="rgba(196,181,253,0.6)" stroke-width="1.2"/><path d="M5.5 7V5C5.5 3.067 10.5 3.067 10.5 5V7" stroke="rgba(196,181,253,0.6)" stroke-width="1.2" stroke-linecap="round"/><circle cx="8" cy="10.5" r="1" fill="rgba(196,181,253,0.6)"/></svg>
                    GDPR Compliant
                </div>
                <div style="color: var(--magenta)">·</div>
                <!-- Repeat for seamless loop -->
                <div class="d-flex align-items-center gap-2 text-white-50">
                    <svg class="trust-strip-icon" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z" fill="rgba(196,181,253,0.7)"/></svg>
                    UNICEF Aligned
                </div>
                <div style="color: var(--magenta)">·</div>
                <div class="d-flex align-items-center gap-2 text-white-50">
                    <svg class="trust-strip-icon" viewBox="0 0 16 16" fill="none"><path d="M8 2C8 2 13 5 13 9C13 11.5 10.8 13.5 8 14C5.2 13.5 3 11.5 3 9C3 5 8 2 8 2Z" fill="none" stroke="rgba(196,181,253,0.5)" stroke-width="1.2"/></svg>
                    Child-Safe Certified
                </div>
            </div>
        </div>

        <!-- FEATURES -->
        <section id="features" class="py-5 position-relative z-3 mt-5">
            <div class="container">
                <div class="reveal mb-5 text-center text-lg-start">
                    <span class="text-uppercase fw-bold letter-spacing-3 mb-2 d-inline-block" style="color: var(--magenta); font-size: 12px; letter-spacing: 3px;">Core Features</span>
                    <h2 class="hero-headline fs-1">Everything a family needs<br><em class="fw-light text-white-50">in one magical place</em></h2>
                    <p class="text-white-50 mt-3 mx-auto mx-lg-0" style="max-width: 520px; font-size: 18px;">
                        YOPY combines cutting-edge AI insights with child-friendly design to create
                        a safe, enriching digital environment for the whole family.
                    </p>
                </div>
            </div>

            <!-- CAROUSEL -->
            <div class="container-fluid px-0" style="max-width:1160px; margin: 0 auto; position: relative;">

                <div class="carousel-outer" id="carouselOuter">
                    <div class="carousel-track" id="carouselTrack">

                        <!-- Card 1 — violet -->
                        <div class="carousel-card">
                            <div class="card-accent"></div>
                            <div class="card-body-inner">
                                <span class="card-num">01</span>
                                <div class="feat-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="9" r="4.5" stroke="#a78bfa" stroke-width="1.6"/>
                                        <path d="M5 20C5 17.24 8.13 15 12 15s7 2.24 7 5" stroke="#a78bfa" stroke-width="1.6" stroke-linecap="round"/>
                                        <path d="M17 7c1.5 0 3.5 1 3.5 3.5" stroke="#c4b5fd" stroke-width="1.3" stroke-linecap="round" opacity="0.6"/>
                                    </svg>
                                </div>
                                <h3>Behavior Insights</h3>
                                <p>Real-time intelligence on your child's emotional patterns and digital habits — beautifully visualized for every parent.</p>
                            </div>
                        </div>

                        <!-- Card 2 — magenta -->
                        <div class="carousel-card">
                            <div class="card-accent"></div>
                            <div class="card-body-inner">
                                <span class="card-num">02</span>
                                <div class="feat-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="5" width="18" height="13" rx="2.5" stroke="#f0abfc" stroke-width="1.6"/>
                                        <path d="M9 12L11 14L15 10" stroke="#f0abfc" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 21h8" stroke="#f0abfc" stroke-width="1.4" stroke-linecap="round" opacity="0.45"/>
                                    </svg>
                                </div>
                                <h3>Safe Mini-Games</h3>
                                <p>Age-appropriate games built around developmental milestones — all inside a bubble-wrapped digital playground.</p>
                            </div>
                        </div>

                        <!-- Card 3 — blue -->
                        <div class="carousel-card">
                            <div class="card-accent"></div>
                            <div class="card-body-inner">
                                <span class="card-num">03</span>
                                <div class="feat-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="8" cy="8" r="3" stroke="#93c5fd" stroke-width="1.5"/>
                                        <circle cx="16" cy="8" r="3" stroke="#93c5fd" stroke-width="1.5"/>
                                        <path d="M3 19c0-2.5 2.24-4.5 5-4.5" stroke="#93c5fd" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M21 19c0-2.5-2.24-4.5-5-4.5" stroke="#93c5fd" stroke-width="1.5" stroke-linecap="round"/>
                                        <circle cx="12" cy="16" r="2.5" stroke="#bfdbfe" stroke-width="1.3"/>
                                        <path d="M9.5 21c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5" stroke="#bfdbfe" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                                    </svg>
                                </div>
                                <h3>Parent Dashboard</h3>
                                <p>Monitor screen time, review activity reports and get gentle alerts from a privacy-first family control center.</p>
                            </div>
                        </div>

                        <!-- Card 4 — amber -->
                        <div class="carousel-card">
                            <div class="card-accent"></div>
                            <div class="card-body-inner">
                                <span class="card-num">04</span>
                                <div class="feat-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2.5L13.8 8H19.5L15 11.3L16.8 17L12 14L7.2 17L9 11.3L4.5 8H10.2L12 2.5Z" stroke="#fcd34d" stroke-width="1.5" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="1.8" fill="#fcd34d" opacity="0.4"/>
                                    </svg>
                                </div>
                                <h3>Character World</h3>
                                <p>Children choose a magical companion that evolves and grows alongside them — every milestone feels enchanted.</p>
                            </div>
                        </div>

                        <!-- Card 5 — teal -->
                        <div class="carousel-card">
                            <div class="card-accent"></div>
                            <div class="card-body-inner">
                                <span class="card-num">05</span>
                                <div class="feat-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 4C8.13 4 5 7.13 5 11c0 2.8 1.6 5.24 4 6.45V20h6v-2.55C17.4 16.24 19 13.8 19 11c0-3.87-3.13-7-7-7Z" stroke="#6ee7b7" stroke-width="1.5"/>
                                        <circle cx="12" cy="2" r="1.3" fill="#6ee7b7" opacity="0.75"/>
                                        <circle cx="20" cy="5.5" r="1.1" fill="#6ee7b7" opacity="0.5"/>
                                        <circle cx="4"  cy="5.5" r="1.1" fill="#6ee7b7" opacity="0.5"/>
                                    </svg>
                                </div>
                                <h3>Smart Alerts</h3>
                                <p>Notifications that feel like a caring nudge, not an alarm — keeping parents informed without the anxiety.</p>
                            </div>
                        </div>

                    </div><!-- /carousel-track -->

                    <!-- Floating arrow buttons inside the overflow container -->
                    <button class="carousel-btn carousel-btn-prev" id="carouselPrev" aria-label="Previous">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <button class="carousel-btn carousel-btn-next" id="carouselNext" aria-label="Next">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                </div><!-- /carousel-outer -->

                <!-- Footer controls -->
                <div class="carousel-footer">
                    <div class="carousel-progress">
                        <div class="carousel-progress-fill" id="carouselProgress"></div>
                    </div>
                    <div class="c-dots" id="carouselDots">
                        <span class="c-dot active"></span>
                        <span class="c-dot"></span>
                        <span class="c-dot"></span>
                        <span class="c-dot"></span>
                        <span class="c-dot"></span>
                    </div>
                    <button class="carousel-play-btn" id="carouselPlay">
                        <svg id="cPlayIcon" width="10" height="10" viewBox="0 0 10 10" fill="none" style="display:none"><path d="M2.5 1.5L8.5 5L2.5 8.5V1.5Z" fill="currentColor"/></svg>
                        <svg id="cPauseIcon" width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="2" y="1.5" width="2.2" height="7" rx="0.8" fill="currentColor"/><rect x="5.8" y="1.5" width="2.2" height="7" rx="0.8" fill="currentColor"/></svg>
                        <span id="cPlayLabel">Pause</span>
                    </button>
                </div>

            </div><!-- /container-fluid -->
        </section>

        <!-- AWARENESS -->
        <section id="awareness" class="py-5 my-5 position-relative z-3">
            <div class="container">
                <div class="row align-items-center gx-5 gy-5">
                    <div class="col-lg-6 reveal text-center text-lg-start">
                        <span class="text-uppercase fw-bold mb-2 d-inline-block" style="color: var(--magenta); font-size: 12px; letter-spacing: 3px;">Child Safety Awareness</span>
                        <h2 class="hero-headline fs-1">Why digital safety<br><em class="fw-light text-white-50">matters now</em></h2>
                        <p class="text-white-50 mt-3 mb-4 mx-auto mx-lg-0" style="max-width: 480px; font-size: 18px;">
                            Children spend more time in digital spaces than ever. YOPY helps parents stay ahead of risks while nurturing healthy, balanced development.
                        </p>
                        <a href="<?= $basePath ?>/auth/register" class="cta-primary d-inline-flex mb-5">Start Protecting Your Child
                            <svg width="12" height="12" viewBox="0 0 18 18" fill="none" style="margin-left:5px;"><path d="M9 0L10.96 6.54L17.5 6.35L12.24 10.46L14.09 17L9 13L3.91 17L5.76 10.46L0.5 6.35L7.04 6.54L9 0Z" fill="currentColor"/></svg>
                        </a>

                        <!-- SLOGANS replacing wrong stats -->
                        <div class="slogan-grid reveal delay-2 text-start">
                            <div class="slogan-box">
                                <div class="slogan-icon">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <circle cx="9" cy="9" r="7" stroke="#f0abfc" stroke-width="1.3"/>
                                        <path d="M6 9L8 11L12 7" stroke="#f0abfc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="slogan-word">Stay Present</div>
                                <div class="slogan-sub">Real-time insights so you're always in the loop, never in the dark.</div>
                            </div>
                            <div class="slogan-box">
                                <div class="slogan-icon">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M9 2C9 2 15 5.5 15 10C15 13 12.3 15.5 9 16C5.7 15.5 3 13 3 10C3 5.5 9 2 9 2Z" stroke="#f0abfc" stroke-width="1.3"/>
                                        <path d="M6.5 10L8.5 12L11.5 8" stroke="#f0abfc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="slogan-word">Be the Shield</div>
                                <div class="slogan-sub">Gentle protection that lets kids explore freely and safely.</div>
                            </div>
                            <div class="slogan-box">
                                <div class="slogan-icon">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <circle cx="9" cy="7" r="3" stroke="#c4b5fd" stroke-width="1.3"/>
                                        <path d="M4 16C4 13.24 6.24 11 9 11s5 2.24 5 5" stroke="#c4b5fd" stroke-width="1.3" stroke-linecap="round"/>
                                        <path d="M13.5 3.5C14.5 3.5 16 4.5 16 6.5" stroke="#c4b5fd" stroke-width="1.1" stroke-linecap="round" opacity="0.6"/>
                                    </svg>
                                </div>
                                <div class="slogan-word">Grow Together</div>
                                <div class="slogan-sub">Parents and children learning and evolving as one digital family.</div>
                            </div>
                            <div class="slogan-box">
                                <div class="slogan-icon">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M9 2L10.5 6.5H15.5L11.5 9.5L13 14L9 11.5L5 14L6.5 9.5L2.5 6.5H7.5L9 2Z" stroke="#c4b5fd" stroke-width="1.3" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div class="slogan-word">Make It Magic</div>
                                <div class="slogan-sub">Turn everyday learning into moments children look forward to.</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 reveal delay-2">
                        <div class="video-frame w-100 mx-auto" style="max-width: 600px;">
                            <video
                                src="public/images/intro.mp4"
                                controls
                                preload="metadata"
                                style="width: 100%; display: block; border-radius: 24px;"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TEAM -->
        <section id="team" class="py-5 my-5 position-relative z-3">
            <div class="container text-center">
                <div class="reveal mb-5">
                    <span class="text-uppercase fw-bold mb-2 d-inline-block" style="color: var(--magenta); font-size: 12px; letter-spacing: 3px;">The People Behind YOPY</span>
                    <h2 class="hero-headline fs-1">Built with <em class="fw-light text-white-50">heart &amp; science</em></h2>
                </div>

                <div class="row justify-content-center g-4">
                    <!-- Team Member 1 -->
                    <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center reveal delay-1">
                        <div class="team-card w-100" style="max-width: 240px;">
                            <div class="team-avatar-wrap">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <circle cx="18" cy="14" r="6" stroke="#c4b5fd" stroke-width="1.5"/>
                                    <path d="M8 30C8 25.03 12.48 21 18 21s10 4.03 10 9" stroke="#c4b5fd" stroke-width="1.5" stroke-linecap="round"/>
                                    <!-- laptop hint -->
                                    <rect x="12" y="19" width="12" height="7" rx="1.5" stroke="#f0abfc" stroke-width="1.1" opacity="0.5"/>
                                </svg>
                            </div>
                            <div class="fs-5 fw-bold text-white mb-1">Rayen Bouzaien</div>
                            
                        </div>
                    </div>
                    <!-- Team Member 2 -->
                    <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center reveal delay-2">
                        <div class="team-card w-100" style="max-width: 240px;">
                            <div class="team-avatar-wrap">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <circle cx="18" cy="14" r="6" stroke="#c4b5fd" stroke-width="1.5"/>
                                    <path d="M8 30C8 25.03 12.48 21 18 21s10 4.03 10 9" stroke="#c4b5fd" stroke-width="1.5" stroke-linecap="round"/>
                                    <!-- brush hint -->
                                    <path d="M22 10L26 6" stroke="#f0abfc" stroke-width="1.3" stroke-linecap="round" opacity="0.6"/>
                                    <circle cx="26" cy="6" r="1.5" fill="#f0abfc" opacity="0.5"/>
                                </svg>
                            </div>
                            <div class="fs-5 fw-bold text-white mb-1">Rahma Jnayah</div>
                            
                        </div>
                    </div>
                    <!-- Team Member 3 -->
                    <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center reveal delay-1">
                        <div class="team-card w-100" style="max-width: 240px;">
                            <div class="team-avatar-wrap">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <circle cx="18" cy="14" r="6" stroke="#c4b5fd" stroke-width="1.5"/>
                                    <path d="M8 30C8 25.03 12.48 21 18 21s10 4.03 10 9" stroke="#c4b5fd" stroke-width="1.5" stroke-linecap="round"/>
                                    <!-- microscope hint -->
                                    <circle cx="26" cy="9" r="2" stroke="#f0abfc" stroke-width="1.1" opacity="0.6"/>
                                    <path d="M26 11V14" stroke="#f0abfc" stroke-width="1.1" stroke-linecap="round" opacity="0.5"/>
                                </svg>
                            </div>
                            <div class="fs-5 fw-bold text-white mb-1">NAwre Ammar</div>
                           
                        </div>
                    </div>
                    <!-- Team Member 4 -->
                    <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center reveal delay-2">
                        <div class="team-card w-100" style="max-width: 240px;">
                            <div class="team-avatar-wrap">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <circle cx="18" cy="14" r="6" stroke="#c4b5fd" stroke-width="1.5"/>
                                    <path d="M8 30C8 25.03 12.48 21 18 21s10 4.03 10 9" stroke="#c4b5fd" stroke-width="1.5" stroke-linecap="round"/>
                                    <!-- chart hint -->
                                    <path d="M12 19L15 16L18 18L22 13" stroke="#f0abfc" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
                                </svg>
                            </div>
                            <div class="fs-5 fw-bold text-white mb-1">Mohamed Arsalen Kharrat</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA BANNER -->
        <div class="container mb-5 pb-5">
            <div class="cta-banner reveal p-4 p-md-5 text-center shadow-lg position-relative overflow-hidden">
                <h2 class="text-white fw-bold mb-3" style="font-family: var(--font-display); font-size: clamp(28px, 4vw, 48px);">Start your family's journey today
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:inline;vertical-align:middle;margin-left:6px;">
                        <path d="M12 2L13.9 8.26L20.5 8.09L15.5 11.97L17.27 18.23L12 14.5L6.73 18.23L8.5 11.97L3.5 8.09L10.1 8.26L12 2Z" fill="#f0d060" opacity="0.9"/>
                    </svg>
                </h2>
                <p class="text-white-50 mx-auto mb-4" style="max-width: 460px; font-size: 18px;">Join families already using YOPY to build brighter, safer digital futures for their children.</p>
                <div class="d-flex gap-3 justify-content-center flex-wrap position-relative z-2">
                    <a href="<?= $basePath ?>/auth/register" class="cta-primary">Get Started Free
                        <svg width="12" height="12" viewBox="0 0 18 18" fill="none" style="margin-left:4px;"><path d="M9 0L10.96 6.54L17.5 6.35L12.24 10.46L14.09 17L9 13L3.91 17L5.76 10.46L0.5 6.35L7.04 6.54L9 0Z" fill="currentColor"/></svg>
                    </a>
                    <a href="#features" class="cta-secondary bg-dark">See All Features</a>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <footer class="pt-5 pb-4 border-top" style="background: rgba(0,0,0,0.5); border-color: rgba(196,181,253,0.08)!important; backdrop-filter: blur(10px);">
            <div class="container">
                <div class="row gy-5 gx-md-5 mb-5">
                    <div class="col-lg-5">
                        <a href="#" class="text-decoration-none d-flex align-items-center gap-2 mb-3">
                            <div class="logo-mark text-white">
                                <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 0L10.96 6.54L17.5 6.35L12.24 10.46L14.09 17L9 13L3.91 17L5.76 10.46L0.5 6.35L7.04 6.54L9 0Z" fill="currentColor"/></svg>
                            </div>
                            <span class="logo-text">YOPY</span>
                        </a>
                        <p class="text-white-50 pe-lg-5" style="font-size: 15px;">Helping families grow brighter through intelligent, safe, and magical digital experiences.</p>
                    </div>
                    <div class="col-6 col-lg-2">
                        <h4 class="fs-6 fw-bold text-uppercase mb-3" style="color: var(--lavender); letter-spacing: 1px;">Product</h4>
                        <ul class="list-unstyled d-flex flex-column gap-2">
                            <li><a href="#features" class="text-decoration-none text-white-50">Features</a></li>
                            <li><a href="#" class="text-decoration-none text-white-50">For Parents</a></li>
                            <li><a href="#" class="text-decoration-none text-white-50">For Children</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-lg-2">
                        <h4 class="fs-6 fw-bold text-uppercase mb-3" style="color: var(--lavender); letter-spacing: 1px;">Company</h4>
                        <ul class="list-unstyled d-flex flex-column gap-2">
                            <li><a href="#team" class="text-decoration-none text-white-50">Our Team</a></li>
                            <li><a href="#" class="text-decoration-none text-white-50">About</a></li>
                            <li><a href="#" class="text-decoration-none text-white-50">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-lg-3">
                        <h4 class="fs-6 fw-bold text-uppercase mb-3" style="color: var(--lavender); letter-spacing: 1px;">Legal</h4>
                        <ul class="list-unstyled d-flex flex-column gap-2">
                            <li><a href="#" class="text-decoration-none text-white-50">Privacy Policy</a></li>
                            <li><a href="#" class="text-decoration-none text-white-50">Terms of Service</a></li>
                            <li><a href="#" class="text-decoration-none text-white-50">GDPR</a></li>
                        </ul>
                    </div>
                </div>

                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-4" style="border-color: rgba(196,181,253,0.08)!important;">
                    <p class="mb-3 mb-md-0 text-white-50" style="font-size: 14px;">© 2026 YOPY. All rights reserved.</p>
                    <div class="d-flex gap-2">
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/_yopy_1/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="YOPY on Instagram">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.7"/>
                                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/>
                                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                            </svg>
                        </a>
                       
                       
                    </div>
                </div>
            </div>
        </footer>

    </div><!-- /.page-wrapper -->

    <!-- Carousel JS — bulletproof: measures live DOM positions -->
    <script>
    (function () {
        'use strict';

        const track    = document.getElementById('carouselTrack');
        const outer    = document.getElementById('carouselOuter');
        const prevBtn  = document.getElementById('carouselPrev');
        const nextBtn  = document.getElementById('carouselNext');
        const playBtn  = document.getElementById('carouselPlay');
        const playIcon = document.getElementById('cPlayIcon');
        const pauseIcon= document.getElementById('cPauseIcon');
        const playLabel= document.getElementById('cPlayLabel');
        const progressFill = document.getElementById('carouselProgress');
        const dots     = document.querySelectorAll('#carouselDots .c-dot');

        if (!track) return;

        const cards = Array.from(track.querySelectorAll('.carousel-card'));
        const TOTAL  = cards.length;
        let current  = 0;
        let timer    = null;
        let playing  = true;

        /* ── how many cards are visible at current viewport width ── */
        function visibleCount() {
            const w = window.innerWidth;
            if (w < 641)  return 1;
            if (w < 1024) return 2;
            return 3;
        }

        /* ── max position we can scroll to ── */
        function maxPos() {
            return Math.max(0, TOTAL - visibleCount());
        }

        /* ── THE KEY FIX: measure the EXACT pixel distance between
           consecutive cards using live bounding rects.
           We reset transform to 0 first to get unbiased measurements. ── */
        function measureStep() {
            if (cards.length < 2) {
                return cards[0].getBoundingClientRect().width + 20;
            }
            // Temporarily remove transform so we measure natural positions
            const prev = track.style.transition;
            track.style.transition = 'none';
            track.style.transform  = 'translateX(0)';
            // Force reflow
            track.getBoundingClientRect();
            const r0 = cards[0].getBoundingClientRect().left;
            const r1 = cards[1].getBoundingClientRect().left;
            // Restore
            track.style.transition = prev;
            return r1 - r0;
        }

        let step = 0; // cached, recalculated on resize

        /* ── navigate to a specific index ── */
        function goTo(idx) {
            current = Math.max(0, Math.min(idx, maxPos()));
            // Recalculate step right before applying (handles resize)
            if (step === 0) step = measureStep();
            track.style.transform = `translateX(-${current * step}px)`;
            updateUI();
        }

        function updateUI() {
            // dots
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
            // progress bar
            const pct = maxPos() > 0 ? (current / maxPos()) * 100 : 100;
            if (progressFill) progressFill.style.width = pct + '%';
            // arrow disabled state
            if (prevBtn) prevBtn.disabled = current === 0;
            if (nextBtn) nextBtn.disabled = current === maxPos();
        }

        function next() { goTo(current >= maxPos() ? 0 : current + 1); }
        function prev() { goTo(current <= 0 ? maxPos() : current - 1); }

        function startAuto() {
            clearInterval(timer);
            timer = setInterval(next, 3400);
            playing = true;
            if (playIcon)  playIcon.style.display  = 'none';
            if (pauseIcon) pauseIcon.style.display  = '';
            if (playLabel) playLabel.textContent    = 'Pause';
        }

        function stopAuto() {
            clearInterval(timer);
            playing = false;
            if (playIcon)  playIcon.style.display  = '';
            if (pauseIcon) pauseIcon.style.display  = 'none';
            if (playLabel) playLabel.textContent    = 'Play';
        }

        /* ── event listeners ── */
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); });
        if (playBtn) playBtn.addEventListener('click', () => playing ? stopAuto() : startAuto());

        dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); }));

        /* Pause on hover */
        if (outer) {
            outer.addEventListener('mouseenter', stopAuto);
            outer.addEventListener('mouseleave', () => { if (!playing) startAuto(); });
        }

        /* Touch / swipe */
        let tx = 0;
        if (track) {
            track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
            track.addEventListener('touchend', e => {
                const dx = e.changedTouches[0].clientX - tx;
                if (Math.abs(dx) > 45) { stopAuto(); dx < 0 ? next() : prev(); }
            });
        }

        /* Recalculate on resize — debounced */
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                step = 0; // force remeasure
                current = Math.min(current, maxPos());
                // snap without transition
                const prevTrans = track.style.transition;
                track.style.transition = 'none';
                step = measureStep();
                track.style.transform = `translateX(-${current * step}px)`;
                track.getBoundingClientRect(); // flush
                track.style.transition = prevTrans;
                updateUI();
            }, 120);
        });

        /* Init: measure after fonts/images settle */
        window.addEventListener('load', () => {
            step = measureStep();
            goTo(0);
            startAuto();
        });
        // Fallback if load already fired
        if (document.readyState === 'complete') {
            setTimeout(() => { step = measureStep(); goTo(0); startAuto(); }, 80);
        }

    })();
    </script>
</body>
</html>