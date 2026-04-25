<?php
session_start();
// Guard: must be logged in AND have entered child mode via modeChose.php
if (!isset($_SESSION['user_id']) || ($_SESSION['chosen_mode'] ?? '') !== 'child') {
  header('Location: ../../auth/login.php');
  exit;
}
$nickname  = htmlspecialchars($_SESSION['username'] ?? 'Explorer');
$buddyId   = htmlspecialchars($_SESSION['chosen_character']['id'] ?? 'joy');
$sessionId = htmlspecialchars($_SESSION['current_game_session'] ?? '');
// ── DB & POST HANDLER FOR BUDDY SAVE ─────────────────────────────
require_once __DIR__ . '/../../../config/database.php';
function getDB(): PDO { return Database::connect(); }


if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'save_buddy') {
    header('Content-Type: application/json; charset=utf-8');
    $pdo     = getDB();
    $childId = (int)($_SESSION['child_id'] ?? 0);
    $buddy   = $_POST['buddy'] ?? '';

    $validBuddies = ['joy','sadness','anger','disgust','fear','anxiety'];

    if ($childId && in_array($buddy, $validBuddies)) {
        $pdo->prepare("UPDATE children SET buddy = ? WHERE child_id = ?")
            ->execute([$buddy, $childId]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid buddy or session']);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YOPY — Who Are You Today?</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Quicksand:wght@500;600;700&family=Baloo+2:wght@700;800&display=swap" rel="stylesheet">
  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0
    }

    html,
    body {
      width: 100%;
      height: 100%;
      overflow: hidden
    }

    body {
      font-family: 'Quicksand', sans-serif;
      background: #0D0820;
      color: #fff;
      cursor: default
    }

    .cosmos {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background:
        radial-gradient(ellipse 80% 55% at 18% 0%, rgba(120, 60, 220, .28) 0%, transparent 55%),
        radial-gradient(ellipse 55% 45% at 88% 12%, rgba(60, 150, 255, .18) 0%, transparent 50%),
        radial-gradient(ellipse 65% 60% at 55% 100%, rgba(200, 80, 160, .15) 0%, transparent 55%),
        linear-gradient(160deg, #0D0820 0%, #110B2E 50%, #0A1528 100%)
    }

    .stars {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: radial-gradient(rgba(255, 255, 255, .7) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, .4) 1px, transparent 1px);
      background-size: 64px 64px, 32px 32px;
      background-position: 0 0, 16px 16px;
      opacity: .35
    }

    .topbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 200;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      background: rgba(13, 8, 32, .7);
      backdrop-filter: blur(22px);
      border-bottom: 1px solid rgba(180, 120, 255, .14)
    }

    .tb-logo {
      font-family: 'Bubblegum Sans', cursive;
      font-size: 22px;
      letter-spacing: 1px;
      background: linear-gradient(130deg, #C084FC, #F472B6, #FB923C);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent
    }

    .tb-center {
      font-family: 'Baloo 2', cursive;
      font-size: 16px;
      font-weight: 800;
      color: rgba(255, 255, 255, .7)
    }

    .tb-pill {
      font-size: 12px;
      font-weight: 700;
      padding: 7px 18px;
      border-radius: 100px;
      background: rgba(200, 140, 255, .12);
      border: 1.5px solid rgba(200, 140, 255, .25);
      color: rgba(200, 160, 255, .85)
    }

    #main {
      position: fixed;
      top: 58px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      z-index: 1
    }

    /* STAGE */
    #stage {
      width: 78%;
      display: flex;
      flex-direction: column;
      padding: 22px 0 0;
      overflow: hidden;
      position: relative
    }

    .stage-header {
      padding: 0 32px 18px;
      display: flex;
      align-items: baseline;
      gap: 14px;
      flex-shrink: 0
    }

    .stage-title {
      font-family: 'Bubblegum Sans', cursive;
      font-size: clamp(24px, 2.8vw, 36px);
      background: linear-gradient(120deg, #C084FC, #F472B6, #FB923C, #FBBF24);
      background-size: 220% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: tShift 6s linear infinite
    }

    @keyframes tShift {
      to {
        background-position: 220% center
      }
    }

    .stage-sub {
      font-size: 14px;
      font-weight: 600;
      color: rgba(200, 180, 255, .6)
    }

    /* ===== ORIGINAL STYLES + FINAL MOBILE FIX ===== */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0
    }

    html,
    body {
      width: 100%;
      height: 100%;
      overflow: hidden
    }

    body {
      font-family: 'Quicksand', sans-serif;
      background: #0D0820;
      color: #fff;
      cursor: default;
    }

    /* NEW COSMIC BACKGROUND */
    .cosmos,
    .stars {
      display: none;
    }

    .anime-bg {
      position: fixed;
      inset: 0;
      z-index: -2;
      background:
        linear-gradient(125deg, rgba(10, 7, 24, 0.72), rgba(30, 20, 55, 0.78)),
        url('https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=2');
      background-size: cover;
      background-position: center 30%;
      filter: brightness(0.85) saturate(1.1);
    }

    .floating-orb {
      position: fixed;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 180, 220, 0.25), rgba(120, 80, 255, 0.05));
      filter: blur(60px);
      pointer-events: none;
      z-index: -1;
      width: 400px;
      height: 400px;
    }

    .orb1 {
      top: 10%;
      left: -8%;
      background: radial-gradient(circle, #ff9f7c40, #a855f720);
    }

    .orb2 {
      bottom: 0%;
      right: -5%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, #6a4eff30, #f0b3ff20);
    }

    .orb3 {
      top: 40%;
      right: 25%;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, #ffcd6e30, #ff88b020);
    }

    #magicCanvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.7;
    }

    /* TOPBAR */
    .topbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 200;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      background: rgba(13, 8, 32, 0.75);
      backdrop-filter: blur(22px);
      border-bottom: 1px solid rgba(180, 120, 255, 0.18);
    }

    .tb-logo {
      font-family: 'Bubblegum Sans', cursive;
      font-size: 22px;
      letter-spacing: 1px;
      background: linear-gradient(130deg, #C084FC, #F472B6, #FB923C);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .tb-center {
      font-family: 'Baloo 2', cursive;
      font-size: 16px;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.75);
    }

    .tb-pill {
      font-size: 12px;
      font-weight: 700;
      padding: 7px 18px;
      border-radius: 100px;
      background: rgba(200, 140, 255, 0.15);
      border: 1.5px solid rgba(200, 140, 255, 0.3);
      color: rgba(200, 160, 255, 0.9);
    }

    /* MAIN LAYOUT */
    #main {
      position: fixed;
      top: 58px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      z-index: 1;
    }


    #carousel {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 0 32px 24px;
      overflow-x: auto;
      overflow-y: visible;
      scroll-behavior: smooth;
      scrollbar-width: none
    }

    #carousel::-webkit-scrollbar {
      display: none
    }


    /* CARD */
    .c-card {
      flex: 0 0 180px;
      height: calc(100% - 20px);
      max-height: 400px;
      min-height: 280px;
      border-radius: 28px;
      position: relative;
      cursor: pointer;
      border: 2.5px solid rgba(255, 255, 255, .08);
      background: rgba(255, 255, 255, .04);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 22px;
      overflow: hidden;
      transition: transform .4s cubic-bezier(.34, 1.56, .64, 1), border-color .3s ease, box-shadow .35s ease, flex-basis .35s ease;
      opacity: 0;
      transform: translateY(40px);
      animation: cardIn .55s cubic-bezier(.34, 1.4, .64, 1) forwards
    }

    .c-card:nth-child(1) {
      animation-delay: .05s
    }

    .c-card:nth-child(2) {
      animation-delay: .12s
    }

    .c-card:nth-child(3) {
      animation-delay: .19s
    }

    .c-card:nth-child(4) {
      animation-delay: .26s
    }

    .c-card:nth-child(5) {
      animation-delay: .33s
    }

    .c-card:nth-child(6) {
      animation-delay: .40s
    }

    @keyframes cardIn {
      to {
        opacity: 1;
        transform: translateY(0)
      }
    }

    .c-card:hover {
      transform: translateY(-12px) scale(1.03);
      box-shadow: 0 24px 48px rgba(0, 0, 0, .45)
    }

    .c-card.active {
      flex-basis: 220px;
      border-color: var(--ec);
      transform: translateY(-16px) scale(1.05);
      box-shadow: 0 0 0 1px var(--ec), 0 28px 56px rgba(0, 0, 0, .5), 0 0 60px rgba(var(--er), var(--eg), var(--eb), .22)
    }

    /* CAROUSEL */
    #carousel {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 0 32px 24px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      scroll-padding: 32px;
      scrollbar-width: none;
    }

    #carousel::-webkit-scrollbar {
      display: none;
    }

    .c-card {
      flex: 0 0 180px;
      height: calc(100% - 20px);
      max-height: 400px;
      min-height: 280px;
      border-radius: 28px;
      position: relative;
      cursor: pointer;
      border: 2.5px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 22px;
      overflow: hidden;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.35s ease;
      scroll-snap-align: center;
      opacity: 0;
      transform: translateY(40px);
      animation: cardIn 0.55s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .c-card:nth-child(1) {
      animation-delay: .05s
    }

    .c-card:nth-child(2) {
      animation-delay: .12s
    }

    .c-card:nth-child(3) {
      animation-delay: .19s
    }

    .c-card:nth-child(4) {
      animation-delay: .26s
    }

    .c-card:nth-child(5) {
      animation-delay: .33s
    }

    .c-card:nth-child(6) {
      animation-delay: .40s
    }

    @keyframes cardIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .c-card:hover {
      transform: translateY(-14px) scale(1.05);
      box-shadow: 0 28px 56px rgba(0, 0, 0, 0.5);
    }

    .c-card.active {
      flex-basis: 230px;
      border-color: var(--ec);
      transform: translateY(-18px) scale(1.07);
      box-shadow: 0 0 0 2px var(--ec), 0 32px 64px rgba(0, 0, 0, 0.6), 0 0 70px rgba(var(--er), var(--eg), var(--eb), 0.3);
    }

    ² .card-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      border-radius: inherit;
      opacity: .55;
      transition: opacity .4s ease;
      background: radial-gradient(ellipse 80% 60% at 50% 85%, rgba(var(--er), var(--eg), var(--eb), .3), transparent 70%)
    }

    .c-card:hover .card-bg,
    .c-card.active .card-bg {
      opacity: 1
    }

    .face-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 14px;
      z-index: 2
    }

    .face-wrap svg {
      width: min(148px, 78%);
      height: auto;
      overflow: visible;
      filter: drop-shadow(0 8px 24px rgba(var(--er), var(--eg), var(--eb), .45));
      animation: faceFloat 3s ease-in-out infinite
    }

    .c-card:nth-child(odd) .face-wrap svg {
      animation-delay: -1.2s
    }

    .c-card:nth-child(even) .face-wrap svg {
      animation-delay: -2.4s
    }

    @keyframes faceFloat {

      0%,
      100% {
        transform: translateY(0) rotate(-2deg)
      }

      50% {
        transform: translateY(-10px) rotate(2deg)
      }
    }

    .c-card.active .face-wrap svg {
      animation: faceActive 1s cubic-bezier(.34, 1.56, .64, 1) forwards
    }

    @keyframes faceActive {
      0% {
        transform: scale(1)
      }

      50% {
        transform: scale(1.18) rotate(-4deg)
      }

      100% {
        transform: scale(1.08)
      }
    }

    .card-foot {
      position: relative;
      z-index: 2;
      text-align: center
    }

    .c-name {
      font-family: 'Bubblegum Sans', cursive;
      font-size: 20px;
      color: #fff;
      letter-spacing: .5px;
      margin-bottom: 6px
    }

    .c-tag {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      background: rgba(var(--er), var(--eg), var(--eb), .2);
      border: 1px solid rgba(var(--er), var(--eg), var(--eb), .4);
      color: var(--ec)
    }

    .tick {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 10;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--ec);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      transform: scale(0);
      opacity: 0;
      transition: transform .35s cubic-bezier(.34, 1.56, .64, 1), opacity .25s ease;
      box-shadow: 0 4px 14px rgba(var(--er), var(--eg), var(--eb), .5)
    }

    .c-card.active .tick {
      transform: scale(1);
      opacity: 1
    }

    .vline {
      width: 2px;
      flex-shrink: 0;
      background: linear-gradient(to bottom, transparent, rgba(200, 140, 255, .25) 20%, rgba(255, 160, 100, .3) 50%, rgba(100, 200, 255, .25) 80%, transparent)
    }

    /* PREVIEW */
    #preview {
      width: 22%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 22px 18px 26px;
      position: relative;
      overflow: hidden
    }

    #prevBg {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      transition: background .7s ease
    }

    #prevOrb {
      position: absolute;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(60px);
      opacity: 0;
      transition: background .7s ease, opacity .6s ease;
      pointer-events: none;
      z-index: 0
    }

    .prev-lbl {
      position: relative;
      z-index: 2;
      font-family: 'Bubblegum Sans', cursive;
      font-size: 14px;
      color: rgba(200, 160, 255, .7);
      letter-spacing: .5px
    }

    #bigFaceWrap {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 200px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center
    }

    #bigFaceWrap svg {
      width: 100%;
      height: auto;
      overflow: visible
    }

    .prev-ring {
      position: absolute;
      border-radius: 50%;
      animation: ringPulse 2.8s ease-in-out infinite
    }

    .pr1 {
      width: 160px;
      height: 160px;
      border: 2px solid rgba(var(--pr), var(--pg), var(--pb), .25)
    }

    .pr2 {
      width: 210px;
      height: 210px;
      border: 1px solid rgba(var(--pr), var(--pg), var(--pb), .12);
      animation-delay: -.8s
    }

    @keyframes ringPulse {

      0%,
      100% {
        transform: scale(.92);
        opacity: .6
      }

      50% {
        transform: scale(1.04);
        opacity: 1
      }
    }

    .prev-emoji {
      position: absolute;
      z-index: 3;
      pointer-events: none;
      font-size: var(--sz, 18px);
      animation: emojiDrift var(--d, 4s) var(--dl, 0s) ease-in-out infinite alternate
    }

    @keyframes emojiDrift {
      0% {
        transform: translate(0, 0) rotate(-8deg) scale(1)
      }

      100% {
        transform: translate(var(--tx, 6px), var(--ty, -16px)) rotate(8deg) scale(1.1)
      }
    }

    .prev-name {
      position: relative;
      z-index: 2;
      font-family: 'Bubblegum Sans', cursive;
      font-size: clamp(22px, 2vw, 28px);
      color: #fff;
      text-align: center
    }

    .prev-mood {
      position: relative;
      z-index: 2;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--ec);
      padding: 5px 16px;
      border-radius: 100px;
      background: rgba(var(--er), var(--eg), var(--eb), .15);
      border: 1px solid rgba(var(--er), var(--eg), var(--eb), .3)
    }

    .prev-desc {
      position: relative;
      z-index: 2;
      font-size: 11.5px;
      font-weight: 600;
      color: rgba(255, 255, 255, .55);
      text-align: center;
      line-height: 1.6;
      padding: 0 6px
    }

    #goBtn {
      position: relative;
      z-index: 2;
      width: 100%;
      font-family: 'Bubblegum Sans', cursive;
      font-size: 17px;
      letter-spacing: .5px;
      color: #fff;
      border: none;
      cursor: pointer;
      border-radius: 100px;
      padding: 15px 20px;
      background: linear-gradient(135deg, #A855F7, #EC4899);
      box-shadow: 0 8px 28px rgba(168, 85, 247, .35);
      opacity: .35;
      pointer-events: none;
      transition: opacity .3s, transform .25s cubic-bezier(.34, 1.56, .64, 1), box-shadow .25s ease, background .4s ease
    }

    #goBtn.on {
      opacity: 1;
      pointer-events: all;
      animation: goPop 2.2s ease-in-out infinite
    }

    @keyframes goPop {

      0%,
      100% {
        transform: scale(1);
        box-shadow: 0 8px 28px rgba(168, 85, 247, .35)
      }

      50% {
        transform: scale(1.04);
        box-shadow: 0 12px 40px rgba(168, 85, 247, .6)
      }
    }

    #goBtn:hover {
      transform: scale(1.07) translateY(-3px) !important
    }

    #emptyMsg {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px
    }

    .empty-anim {
      font-size: 52px;
      animation: emptyPop 2.2s ease-in-out infinite
    }

    @keyframes emptyPop {

      0%,
      100% {
        transform: translateY(0) rotate(-5deg)
      }

      50% {
        transform: translateY(-14px) rotate(5deg)
      }
    }

    .empty-txt {
      font-size: 13px;
      font-weight: 600;
      color: rgba(180, 150, 255, .55);
      text-align: center;
      line-height: 1.6
    }

    #selInfo {
      display: none;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%
    }

    #particles {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none
    }

    #portal {
      position: fixed;
      inset: 0;
      z-index: 999;
      pointer-events: none;
      clip-path: circle(0% at 89% 50%)
    }

    @keyframes blink {

      0%,
      92%,
      100% {
        transform: scaleY(1)
      }

      95% {
        transform: scaleY(.05)
      }
    }

    .eb {
      transform-origin: center center;
      animation: blink 4s ease-in-out infinite
    }

    .eb2 {
      animation-delay: -1.5s
    }

    @keyframes breathe {

      0%,
      100% {
        transform: scaleX(1) scaleY(1)
      }

      50% {
        transform: scaleX(1.03) scaleY(1.02)
      }
    }

    .breathe {
      transform-origin: 50% 80%;
      animation: breathe 3s ease-in-out infinite
    }

    @keyframes headShake {

      0%,
      100% {
        transform: rotate(0)
      }

      20% {
        transform: rotate(-3deg)
      }

      40% {
        transform: rotate(3deg)
      }

      60% {
        transform: rotate(-2deg)
      }

      80% {
        transform: rotate(2deg)
      }
    }

    @keyframes tremor {

      0%,
      100% {
        transform: translate(-3px, -2px) rotate(-1deg)
      }

      50% {
        transform: translate(3px, 2px) rotate(1deg)
      }
    }

    /* PREVIEW PANEL */
    #preview {
      width: 22%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 22px 18px 26px;
      position: relative;
      overflow: hidden;
      background: rgba(20, 12, 36, 0.4);
      backdrop-filter: blur(24px);
      border-radius: 60px;
      margin: 16px 24px 16px 8px;
      border: 1px solid rgba(255, 210, 110, 0.5);
      box-shadow: 0 25px 40px rgba(0, 0, 0, 0.4);
    }

    #prevBg {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      transition: background 0.7s ease;
    }

    #prevOrb {
      position: absolute;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(60px);
      opacity: 0;
      transition: background 0.7s ease, opacity 0.6s ease;
      pointer-events: none;
      z-index: 0;
    }

    .prev-lbl {
      position: relative;
      z-index: 2;
      font-family: 'Bubblegum Sans', cursive;
      font-size: 14px;
      color: #ffd58c;
      letter-spacing: 0.5px;
      background: rgba(0, 0, 0, 0.4);
      padding: 6px 18px;
      border-radius: 100px;
      backdrop-filter: blur(2px);
    }

    #bigFaceWrap {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 200px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #bigFaceWrap svg {
      width: 100%;
      height: auto;
      overflow: visible;
      filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.6));
    }

    .prev-ring {
      position: absolute;
      border-radius: 50%;
      animation: ringPulse 2.8s ease-in-out infinite;
    }

    .pr1 {
      width: 160px;
      height: 160px;
      border: 2px solid rgba(var(--pr), var(--pg), var(--pb), 0.7);
    }

    .pr2 {
      width: 210px;
      height: 210px;
      border: 1px solid rgba(var(--pr), var(--pg), var(--pb), 0.4);
      animation-delay: -0.8s;
    }

    @keyframes ringPulse {

      0%,
      100% {
        transform: scale(0.92);
        opacity: 0.6
      }

      50% {
        transform: scale(1.04);
        opacity: 1
      }
    }

    .prev-emoji {
      position: absolute;
      z-index: 3;
      pointer-events: none;
      font-size: var(--sz, 18px);
      animation: emojiDrift var(--d, 4s) var(--dl, 0s) ease-in-out infinite alternate;
    }

    @keyframes emojiDrift {
      0% {
        transform: translate(0, 0) rotate(-8deg) scale(1)
      }

      100% {
        transform: translate(var(--tx, 6px), var(--ty, -16px)) rotate(8deg) scale(1.1)
      }
    }

    .prev-name {
      position: relative;
      z-index: 2;
      font-family: 'Bubblegum Sans', cursive;
      font-size: clamp(22px, 2vw, 28px);
      background: linear-gradient(135deg, #fff2c9, #ffbc6e);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-align: center;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .prev-mood {
      position: relative;
      z-index: 2;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--ec);
      padding: 5px 16px;
      border-radius: 100px;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid var(--ec);
      backdrop-filter: blur(2px);
    }

    .prev-desc {
      position: relative;
      z-index: 2;
      font-size: 11.5px;
      font-weight: 600;
      color: #ffefcf;
      text-align: center;
      line-height: 1.6;
      padding: 0 6px;
      background: rgba(0, 0, 0, 0.45);
      border-radius: 40px;
      padding: 10px 16px;
    }

    #goBtn {
      position: relative;
      z-index: 2;
      width: 100%;
      font-family: 'Bubblegum Sans', cursive;
      font-size: 17px;
      letter-spacing: 0.5px;
      color: #fff;
      border: none;
      cursor: pointer;
      border-radius: 100px;
      padding: 15px 20px;
      background: linear-gradient(135deg, #A855F7, #EC4899);
      box-shadow: 0 8px 28px rgba(168, 85, 247, 0.4);
      opacity: 0.35;
      pointer-events: none;
      transition: opacity 0.3s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, background 0.4s ease;
    }

    #goBtn.on {
      opacity: 1;
      pointer-events: all;
      animation: goPop 2s ease-in-out infinite;
    }

    @keyframes goPop {

      0%,
      100% {
        transform: scale(1);
        box-shadow: 0 8px 28px rgba(168, 85, 247, 0.35)
      }

      50% {
        transform: scale(1.04);
        box-shadow: 0 12px 40px rgba(168, 85, 247, 0.6)
      }
    }

    #goBtn:hover {
      transform: scale(1.08) translateY(-4px);
      box-shadow: 0 14px 40px rgba(168, 85, 247, 0.6);
    }

    #emptyMsg {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .empty-anim {
      font-size: 52px;
      animation: emptyPop 2.2s ease-in-out infinite;
    }

    @keyframes emptyPop {

      0%,
      100% {
        transform: translateY(0) rotate(-5deg)
      }

      50% {
        transform: translateY(-14px) rotate(5deg)
      }
    }

    .empty-txt {
      font-size: 13px;
      font-weight: 600;
      color: #ffefcf;
      text-align: center;
      line-height: 1.6;
      background: rgba(0, 0, 0, 0.5);
      padding: 8px 20px;
      border-radius: 50px;
    }

    #selInfo {
      display: none;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    #portal {
      position: fixed;
      inset: 0;
      z-index: 999;
      pointer-events: none;
      clip-path: circle(0% at 89% 50%);
    }

    /* SVG animations */
    @keyframes blink {

      0%,
      92%,
      100% {
        transform: scaleY(1)
      }

      95% {
        transform: scaleY(0.05)
      }
    }

    .eb {
      transform-origin: center center;
      animation: blink 4s ease-in-out infinite;
    }

    .eb2 {
      animation-delay: -1.5s;
    }

    @keyframes breathe {

      0%,
      100% {
        transform: scaleX(1) scaleY(1)
      }

      50% {
        transform: scaleX(1.03) scaleY(1.02)
      }
    }

    .breathe {
      transform-origin: 50% 80%;
      animation: breathe 3s ease-in-out infinite;
    }

    @keyframes headShake {

      0%,
      100% {
        transform: rotate(0)
      }

      20% {
        transform: rotate(-3deg)
      }

      40% {
        transform: rotate(3deg)
      }

      60% {
        transform: rotate(-2deg)
      }

      80% {
        transform: rotate(2deg)
      }
    }

    @keyframes tremor {

      0%,
      100% {
        transform: translate(-3px, -2px) rotate(-1deg)
      }

      50% {
        transform: translate(3px, 2px) rotate(1deg)
      }
    }

    /* ==================== MOBILE FIX (Name moved to .prev-lbl) ==================== */
    @media (max-width:768px) {
      #main {
        flex-direction: column;
      }

      .vline {
        display: none;
      }

      .stage-header {
        display: none;
      }

      #stage {
        width: 100%;
        padding: 12px 0 20px;
      }

      #preview {
        width: 100%;
        height: auto;
        min-height: 280px;
        margin: 8px 16px 16px;
        padding: 20px 16px 24px;
        border-radius: 40px;
      }

      .c-card {
        flex: 0 0 155px;
        min-height: 250px;
      }

      #carousel {
        gap: 12px;
        padding: 0 16px 20px;
      }

      /* Hide the old name element on mobile */
      .prev-name {
        display: none !important;
      }

      /* Make .prev-lbl bigger and more name-like on mobile */
      .prev-lbl {
        font-size: 26px;
        padding: 8px 24px;
        background: rgba(0, 0, 0, 0.45);
        color: #fff2c9;
        letter-spacing: 1px;
        margin-bottom: 4px;
      }

      #bigFaceWrap {
        max-width: 138px;
      }

      #bigFaceWrap svg {
        max-width: 138px;
      }

      .prev-mood {
        font-size: 10.5px;
        padding: 4px 13px;
      }

      .prev-desc {
        font-size: 10.5px;
        line-height: 1.45;
        padding: 8px 14px;
      }

      #goBtn {
        margin-top: auto;
        font-size: 16px;
        padding: 14px 20px;
      }
    }

    ²
  </style>
</head>

<body>
  <canvas id="particles"></canvas>
  <div class="cosmos"></div>
  <div class="stars"></div>
  <div id="portal"></div>

  <div class="topbar">
    <a href="../../auth/modeChose.php" style=" text-decoration: none;"> <span class="tb-logo">YOPY</span> </a>
    <span class="tb-center">&#10024; Who are you feeling today?</span>
    <span class="tb-pill">Hey <?php echo $nickname; ?>!</span>
  </div>

  <div id="main">
    <div id="stage">
      <div class="stage-header">
        <h1 class="stage-title">Pick your Emotion Buddy</h1>
        <span class="stage-sub">Choose who you feel like right now &#128171;</span>
      </div>
      <div id="carousel">

        <!-- JOY -->
        <div class="c-card" style="--ec:#FBBF24;--er:251;--eg:191;--eb:36"
          data-id="joy" data-name="Joy" data-mood="HAPPY"
          data-desc="Bursting with sunshine! Joy turns every moment into a pure celebration.">
          <div class="card-bg"></div>
          <div class="tick">&#10003;</div>
          <div class="face-wrap">
            <svg viewBox="0 0 120 134" xmlns="http://www.w3.org/2000/svg">
              <g class="breathe">
                <ellipse cx="60" cy="22" rx="30" ry="16" fill="#38BDF8" />
                <polygon points="48,14 55,0 63,16" fill="#38BDF8" />
                <polygon points="60,11 68,0 75,14" fill="#60CAFF" />
                <polygon points="36,18 41,5 50,18" fill="#29A8E0" />
                <polygon points="74,16 80,4 88,18" fill="#60CAFF" />
                <ellipse cx="60" cy="80" rx="40" ry="44" fill="#FDE68A" />
                <ellipse cx="28" cy="90" rx="13" ry="8" fill="rgba(251,146,60,.32)" />
                <ellipse cx="92" cy="90" rx="13" ry="8" fill="rgba(251,146,60,.32)" />
                <ellipse cx="44" cy="74" rx="13" ry="14" fill="white" class="eb" />
                <circle cx="44" cy="76" r="8" fill="#38BDF8" class="eb" />
                <circle cx="44" cy="76" r="4.5" fill="#1E3A5F" class="eb" />
                <circle cx="46" cy="73" r="2" fill="white" class="eb" />
                <ellipse cx="76" cy="74" rx="13" ry="14" fill="white" class="eb eb2" />
                <circle cx="76" cy="76" r="8" fill="#38BDF8" class="eb eb2" />
                <circle cx="76" cy="76" r="4.5" fill="#1E3A5F" class="eb eb2" />
                <circle cx="78" cy="73" r="2" fill="white" class="eb eb2" />
                <circle cx="60" cy="86" r="3.5" fill="rgba(180,100,20,.25)" />
                <path d="M36 98 Q60 120 84 98" stroke="#B45309" stroke-width="4" fill="none" stroke-linecap="round" />
                <rect x="50" y="98" width="9" height="8" rx="2.5" fill="white" />
                <rect x="61" y="98" width="9" height="8" rx="2.5" fill="white" />
              </g><text x="8" y="30" font-size="14" opacity=".75">&#11088;</text>
            </svg>
          </div>
          <div class="card-foot">
            <p class="c-name">Joy</p><span class="c-tag">Happy</span>
          </div>
        </div>

        <!-- SADNESS -->
        <div class="c-card" style="--ec:#60A5FA;--er:96;--eg:165;--eb:250"
          data-id="sadness" data-name="Sadness" data-mood="BLUE"
          data-desc="Thoughtful and tender. Sadness reminds us that all feelings matter.">
          <div class="card-bg"></div>
          <div class="tick">&#10003;</div>
          <div class="face-wrap">
            <svg viewBox="0 0 120 134" xmlns="http://www.w3.org/2000/svg">
              <g class="breathe">
                <ellipse cx="60" cy="32" rx="36" ry="28" fill="#2563EB" />
                <ellipse cx="34" cy="50" rx="12" ry="22" fill="#1D4ED8" />
                <ellipse cx="60" cy="84" rx="35" ry="40" fill="#93C5FD" />
                <circle cx="44" cy="78" r="16" fill="none" stroke="#1E3A8A" stroke-width="4" />
                <circle cx="76" cy="78" r="16" fill="none" stroke="#1E3A8A" stroke-width="4" />
                <line x1="28" y1="73" x2="24" y2="70" stroke="#1E3A8A" stroke-width="3" />
                <line x1="92" y1="73" x2="96" y2="70" stroke="#1E3A8A" stroke-width="3" />
                <ellipse cx="44" cy="78" rx="10" ry="12" fill="white" class="eb" />
                <circle cx="44" cy="80" r="7" fill="#2563EB" class="eb" />
                <circle cx="44" cy="80" r="4" fill="#1E3A8A" class="eb" />
                <circle cx="46" cy="77" r="2" fill="white" class="eb" />
                <ellipse cx="76" cy="78" rx="10" ry="12" fill="white" class="eb eb2" />
                <circle cx="76" cy="80" r="7" fill="#2563EB" class="eb eb2" />
                <circle cx="76" cy="80" r="4" fill="#1E3A8A" class="eb eb2" />
                <circle cx="78" cy="77" r="2" fill="white" class="eb eb2" />
                <path d="M34 62 Q44 68 54 62" stroke="#1E3A8A" stroke-width="3" fill="none" stroke-linecap="round" />
                <path d="M66 62 Q76 68 86 62" stroke="#1E3A8A" stroke-width="3" fill="none" stroke-linecap="round" />
                <path d="M42 104 Q60 96 78 104" stroke="#1D4ED8" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <ellipse cx="40" cy="118" rx="3.5" ry="6" fill="#BFDBFE" opacity=".9" />
                <circle cx="40" cy="113" r="3.5" fill="#BFDBFE" opacity=".9" />
              </g>
            </svg>
          </div>
          <div class="card-foot">
            <p class="c-name">Sadness</p><span class="c-tag">Blue</span>
          </div>
        </div>

        <!-- ANGER -->
        <div class="c-card" style="--ec:#F87171;--er:248;--eg:113;--eb:113"
          data-id="anger" data-name="Anger" data-mood="FIRED UP"
          data-desc="Passionate and fierce — Anger fights hard for what is right!">
          <div class="card-bg"></div>
          <div class="tick">&#10003;</div>
          <div class="face-wrap">
            <svg viewBox="0 0 120 134" xmlns="http://www.w3.org/2000/svg">
              <g style="animation:headShake 1.8s ease-in-out infinite">
                <path d="M52 30 Q46 14 56 8 Q58 20 60 16 Q62 8 66 12 Q64 22 68 18 Q72 8 78 14 Q74 26 68 28Z" fill="#FB923C" />
                <path d="M54 30 Q50 18 58 12 Q60 22 62 18 Q64 10 68 14 Q66 24 70 20 Q73 12 77 18 Q74 26 68 28Z" fill="#FCD34D" />
                <rect x="18" y="34" width="84" height="80" rx="14" fill="#DC2626" />
                <rect x="18" y="70" width="84" height="3" fill="rgba(0,0,0,.1)" />
                <rect x="18" y="80" width="84" height="3" fill="rgba(0,0,0,.1)" />
                <rect x="18" y="98" width="84" height="16" rx="14" fill="rgba(0,0,0,.15)" />
                <polygon points="22,52 50,66 50,71 22,55" fill="#7F1D1D" />
                <polygon points="98,52 70,66 70,71 98,55" fill="#7F1D1D" />
                <ellipse cx="42" cy="76" rx="13" ry="11" fill="white" class="eb" />
                <circle cx="42" cy="76" r="7" fill="#7F1D1D" class="eb" />
                <circle cx="44" cy="73" r="3" fill="white" class="eb" />
                <ellipse cx="78" cy="76" rx="13" ry="11" fill="white" class="eb eb2" />
                <circle cx="78" cy="76" r="7" fill="#7F1D1D" class="eb eb2" />
                <circle cx="80" cy="73" r="3" fill="white" class="eb eb2" />
                <rect x="32" y="96" width="56" height="14" rx="6" fill="#7F1D1D" />
                <rect x="34" y="96" width="9" height="14" fill="white" />
                <rect x="45" y="96" width="9" height="14" fill="white" />
                <rect x="56" y="96" width="9" height="14" fill="white" />
                <rect x="67" y="96" width="8" height="14" fill="white" />
                <path d="M22 44 Q17 35 22 25" stroke="#FB923C" stroke-width="3" fill="none" stroke-linecap="round" />
                <path d="M98 44 Q103 35 98 25" stroke="#FB923C" stroke-width="3" fill="none" stroke-linecap="round" />
              </g>
            </svg>
          </div>
          <div class="card-foot">
            <p class="c-name">Anger</p><span class="c-tag">Fired Up</span>
          </div>
        </div>

        <!-- DISGUST -->
        <div class="c-card" style="--ec:#4ADE80;--er:74;--eg:222;--eb:128"
          data-id="disgust" data-name="Disgust" data-mood="SASSY"
          data-desc="Stylish and selective — only the finest things will do for Disgust!">
          <div class="card-bg"></div>
          <div class="tick">&#10003;</div>
          <div class="face-wrap">
            <svg viewBox="0 0 120 134" xmlns="http://www.w3.org/2000/svg">
              <g class="breathe">
                <ellipse cx="60" cy="24" rx="36" ry="22" fill="#15803D" />
                <ellipse cx="38" cy="42" rx="12" ry="22" fill="#166534" />
                <ellipse cx="82" cy="42" rx="12" ry="22" fill="#166534" />
                <rect x="44" y="120" width="32" height="10" rx="5" fill="#C026D3" opacity=".7" />
                <ellipse cx="60" cy="82" rx="37" ry="42" fill="#4ADE80" />
                <line x1="36" y1="60" x2="28" y2="50" stroke="#14532D" stroke-width="3" stroke-linecap="round" />
                <line x1="44" y1="56" x2="38" y2="45" stroke="#14532D" stroke-width="3" stroke-linecap="round" />
                <line x1="52" y1="54" x2="50" y2="43" stroke="#14532D" stroke-width="3" stroke-linecap="round" />
                <line x1="84" y1="60" x2="92" y2="50" stroke="#14532D" stroke-width="3" stroke-linecap="round" />
                <line x1="76" y1="56" x2="82" y2="45" stroke="#14532D" stroke-width="3" stroke-linecap="round" />
                <line x1="68" y1="54" x2="70" y2="43" stroke="#14532D" stroke-width="3" stroke-linecap="round" />
                <ellipse cx="44" cy="72" rx="14" ry="12" fill="white" class="eb" />
                <circle cx="44" cy="72" r="8" fill="#15803D" class="eb" />
                <circle cx="44" cy="72" r="4.5" fill="#052e16" class="eb" />
                <circle cx="46" cy="69" r="2.5" fill="white" class="eb" />
                <ellipse cx="76" cy="72" rx="14" ry="12" fill="white" class="eb eb2" />
                <circle cx="76" cy="72" r="8" fill="#15803D" class="eb eb2" />
                <circle cx="76" cy="72" r="4.5" fill="#052e16" class="eb eb2" />
                <circle cx="78" cy="69" r="2.5" fill="white" class="eb eb2" />
                <path d="M32 58 Q44 52 56 58" stroke="#14532D" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <path d="M64 58 Q76 52 88 58" stroke="#14532D" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <path d="M40 98 Q52 92 60 94 Q68 92 80 98" stroke="#14532D" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <path d="M46 106 Q60 100 74 106" stroke="#14532D" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </g>
            </svg>
          </div>
          <div class="card-foot">
            <p class="c-name">Disgust</p><span class="c-tag">Sassy</span>
          </div>
        </div>

        <!-- FEAR -->
        <div class="c-card" style="--ec:#C084FC;--er:192;--eg:132;--eb:252"
          data-id="fear" data-name="Fear" data-mood="SCARED"
          data-desc="Always on high alert — Fear keeps you safe from absolutely everything!">
          <div class="card-bg"></div>
          <div class="tick">&#10003;</div>
          <div class="face-wrap">
            <svg viewBox="0 0 120 134" xmlns="http://www.w3.org/2000/svg">
              <g style="animation:tremor .3s ease-in-out infinite alternate">
                <line x1="60" y1="4" x2="60" y2="24" stroke="#7E22CE" stroke-width="3" stroke-linecap="round" />
                <ellipse cx="60" cy="2" rx="5" ry="7" fill="#A855F7" opacity=".7" />
                <path d="M60 24 Q68 18 76 24 Q84 30 92 22" stroke="#7E22CE" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <ellipse cx="60" cy="84" rx="32" ry="50" fill="#D8B4FE" />
                <ellipse cx="44" cy="72" rx="17" ry="20" fill="white" class="eb" />
                <circle cx="44" cy="74" r="11" fill="#7E22CE" class="eb" />
                <circle cx="44" cy="74" r="6" fill="#1A0533" class="eb" />
                <circle cx="47" cy="70" r="3.5" fill="white" class="eb" />
                <ellipse cx="76" cy="72" rx="17" ry="20" fill="white" class="eb eb2" />
                <circle cx="76" cy="74" r="11" fill="#7E22CE" class="eb eb2" />
                <circle cx="76" cy="74" r="6" fill="#1A0533" class="eb eb2" />
                <circle cx="79" cy="70" r="3.5" fill="white" class="eb eb2" />
                <path d="M30 52 Q44 44 58 52" stroke="#4C1D95" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <path d="M62 52 Q76 44 90 52" stroke="#4C1D95" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <ellipse cx="60" cy="110" rx="12" ry="10" fill="#4C1D95" />
                <ellipse cx="60" cy="109" rx="8" ry="7" fill="#1A0533" />
              </g>
            </svg>
          </div>
          <div class="card-foot">
            <p class="c-name">Fear</p><span class="c-tag">Scared</span>
          </div>
        </div>

        <!-- ANXIETY -->
        <div class="c-card" style="--ec:#FB923C;--er:251;--eg:146;--eb:60"
          data-id="anxiety" data-name="Anxiety" data-mood="WORRIED"
          data-desc="Always planning 10 steps ahead — Anxiety never skips a single what-if!">
          <div class="card-bg"></div>
          <div class="tick">&#10003;</div>
          <div class="face-wrap">
            <svg viewBox="0 0 120 134" xmlns="http://www.w3.org/2000/svg">
              <g class="breathe">
                <ellipse cx="60" cy="26" rx="38" ry="22" fill="#EA580C" />
                <path d="M24 26 Q18 10 28 6 Q30 18 36 14 Q32 4 44 2 Q46 16 54 12 Q52 2 62 0 Q66 14 70 10 Q72 2 80 6 Q78 18 86 14 Q88 4 96 10 Q94 22 100 20Z" fill="#C2410C" />
                <ellipse cx="60" cy="86" rx="38" ry="46" fill="#FDBA74" />
                <ellipse cx="30" cy="96" rx="12" ry="7" fill="rgba(239,68,68,.22)" />
                <ellipse cx="90" cy="96" rx="12" ry="7" fill="rgba(239,68,68,.22)" />
                <circle cx="44" cy="80" r="13" fill="white" class="eb" />
                <path d="M44 80 m9 0 a9 9 0 1 1-18 0 a9 9 0 1 1 18 0" fill="none" stroke="#431407" stroke-width="2.5" class="eb" />
                <path d="M44 80 m5 0 a5 5 0 1 1-10 0 a5 5 0 1 1 10 0" fill="none" stroke="#431407" stroke-width="2" class="eb" />
                <circle cx="44" cy="80" r="2" fill="#431407" class="eb" />
                <circle cx="47" cy="75" r="2.5" fill="white" class="eb" />
                <circle cx="76" cy="80" r="13" fill="white" class="eb eb2" />
                <path d="M76 80 m9 0 a9 9 0 1 1-18 0 a9 9 0 1 1 18 0" fill="none" stroke="#431407" stroke-width="2.5" class="eb eb2" />
                <path d="M76 80 m5 0 a5 5 0 1 1-10 0 a5 5 0 1 1 10 0" fill="none" stroke="#431407" stroke-width="2" class="eb eb2" />
                <circle cx="76" cy="80" r="2" fill="#431407" class="eb eb2" />
                <circle cx="79" cy="75" r="2.5" fill="white" class="eb eb2" />
                <path d="M32 64 Q44 70 56 64" stroke="#92400E" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <path d="M64 64 Q76 70 88 64" stroke="#92400E" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <path d="M36 108 Q48 116 60 108 Q72 116 84 108" stroke="#92400E" stroke-width="3.5" fill="none" stroke-linecap="round" />
                <ellipse cx="100" cy="62" rx="4" ry="6" fill="#FEF9C3" opacity=".8" />
                <circle cx="100" cy="57" r="4" fill="#FEF9C3" opacity=".8" />
              </g>
            </svg>
          </div>
          <div class="card-foot">
            <p class="c-name">Anxiety</p><span class="c-tag">Worried</span>
          </div>
        </div>

      </div>
    </div>
    <div class="vline"></div>

    <!-- PREVIEW -->
    <div id="preview">
      <div id="prevBg"></div>
      <div id="prevOrb"></div>
      <p class="prev-lbl">YOUR BUDDY</p>
      <div id="emptyMsg">
        <span class="empty-anim">&#128070;</span>
        <p class="empty-txt">Tap any card<br>to see your buddy<br>come alive here!</p>
      </div>
      <div id="selInfo">
        <div id="bigFaceWrap"></div>
        <p class="prev-name" id="pName">-</p>
        <span class="prev-mood" id="pMood" style="--ec:#FBBF24;--er:251;--eg:191;--eb:36">-</span>
        <p class="prev-desc" id="pDesc">-</p>
      </div>
      <button id="goBtn" onclick="go()">Let&apos;s Play! &#127918;</button>
    </div>
  </div>

  <script>
    const BIG = {
      joy: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
            <ellipse cx="90" cy="30" rx="46" ry="24" fill="#38BDF8"/>
            <polygon points="70,20 80,2 93,22" fill="#38BDF8"/>
            <polygon points="90,16 102,0 112,20" fill="#60CAFF"/>
            <polygon points="50,26 58,6 72,26" fill="#29A8E0"/>
            <polygon points="110,22 118,4 130,26" fill="#60CAFF"/>
            <ellipse cx="90" cy="120" rx="62" ry="66" fill="#FDE68A"/>
            <ellipse cx="40" cy="134" rx="20" ry="12" fill="rgba(251,146,60,.3)"/>
            <ellipse cx="140" cy="134" rx="20" ry="12" fill="rgba(251,146,60,.3)"/>
            <ellipse cx="66" cy="112" rx="20" ry="22" fill="white" class="eb"/>
            <circle cx="66" cy="115" r="13" fill="#38BDF8" class="eb"/>
            <circle cx="66" cy="115" r="7.5" fill="#1E3A5F" class="eb"/>
            <circle cx="70" cy="110" r="3.5" fill="white" class="eb"/>
            <ellipse cx="114" cy="112" rx="20" ry="22" fill="white" class="eb eb2"/>
            <circle cx="114" cy="115" r="13" fill="#38BDF8" class="eb eb2"/>
            <circle cx="114" cy="115" r="7.5" fill="#1E3A5F" class="eb eb2"/>
            <circle cx="118" cy="110" r="3.5" fill="white" class="eb eb2"/>
            <circle cx="90" cy="126" r="5" fill="rgba(180,100,20,.2)"/>
            <path d="M52 148 Q90 180 128 148" stroke="#B45309" stroke-width="6" fill="none" stroke-linecap="round"/>
            <rect x="74" y="148" width="13" height="12" rx="3.5" fill="white"/>
            <rect x="90" y="148" width="13" height="12" rx="3.5" fill="white"/>
            <rect x="106" y="148" width="10" height="12" rx="3.5" fill="white"/>
            </g><text x="8" y="44" font-size="22" opacity=".8">&#11088;</text><text x="148" y="38" font-size="18" opacity=".7">&#10024;</text></svg>`,
      sadness: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="46" rx="54" ry="38" fill="#2563EB"/>
<ellipse cx="50" cy="72" rx="18" ry="32" fill="#1D4ED8"/>
<ellipse cx="90" cy="126" rx="52" ry="60" fill="#93C5FD"/>
<circle cx="66" cy="118" r="24" fill="none" stroke="#1E3A8A" stroke-width="6"/>
<circle cx="114" cy="118" r="24" fill="none" stroke="#1E3A8A" stroke-width="6"/>
<line x1="42" y1="110" x2="36" y2="106" stroke="#1E3A8A" stroke-width="4.5"/>
<line x1="138" y1="110" x2="144" y2="106" stroke="#1E3A8A" stroke-width="4.5"/>
<ellipse cx="66" cy="118" rx="15" ry="18" fill="white" class="eb"/>
<circle cx="66" cy="121" r="11" fill="#2563EB" class="eb"/>
<circle cx="66" cy="121" r="6" fill="#1E3A8A" class="eb"/>
<circle cx="70" cy="116" r="3" fill="white" class="eb"/>
<ellipse cx="114" cy="118" rx="15" ry="18" fill="white" class="eb eb2"/>
<circle cx="114" cy="121" r="11" fill="#2563EB" class="eb eb2"/>
<circle cx="114" cy="121" r="6" fill="#1E3A8A" class="eb eb2"/>
<circle cx="118" cy="116" r="3" fill="white" class="eb eb2"/>
<path d="M48 94 Q66 102 84 94" stroke="#1E3A8A" stroke-width="4.5" fill="none" stroke-linecap="round"/>
<path d="M96 94 Q114 102 132 94" stroke="#1E3A8A" stroke-width="4.5" fill="none" stroke-linecap="round"/>
<path d="M60 156 Q90 144 120 156" stroke="#1D4ED8" stroke-width="5" fill="none" stroke-linecap="round"/>
<ellipse cx="60" cy="178" rx="5.5" ry="9" fill="#BFDBFE" opacity=".9"/>
<circle cx="60" cy="170" r="5.5" fill="#BFDBFE" opacity=".9"/>
<ellipse cx="120" cy="180" rx="4.5" ry="7" fill="#BFDBFE" opacity=".65"/>
<circle cx="120" cy="174" r="4.5" fill="#BFDBFE" opacity=".65"/>
</g></svg>`,
      anger: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg">
<g style="animation:headShake 1.8s ease-in-out infinite">
<path d="M72 46 Q62 22 76 12 Q80 28 83 22 Q86 10 92 16 Q90 30 96 24 Q100 10 108 18 Q104 34 96 40Z" fill="#FB923C"/>
<path d="M76 46 Q68 26 78 16 Q82 30 85 24 Q88 12 94 18 Q92 32 98 26 Q102 14 108 22 Q104 34 96 40Z" fill="#FCD34D"/>
<rect x="20" y="52" width="140" height="120" rx="20" fill="#DC2626"/>
<rect x="20" y="104" width="140" height="4" fill="rgba(0,0,0,.1)"/>
<rect x="20" y="120" width="140" height="4" fill="rgba(0,0,0,.1)"/>
<rect x="20" y="148" width="140" height="24" rx="20" fill="rgba(0,0,0,.12)"/>
<polygon points="24,76 66,98 66,106 24,82" fill="#7F1D1D"/>
<polygon points="156,76 114,98 114,106 156,82" fill="#7F1D1D"/>
<ellipse cx="60" cy="114" rx="20" ry="16" fill="white" class="eb"/>
<circle cx="60" cy="114" r="11" fill="#7F1D1D" class="eb"/>
<circle cx="63" cy="110" r="5" fill="white" class="eb"/>
<ellipse cx="120" cy="114" rx="20" ry="16" fill="white" class="eb eb2"/>
<circle cx="120" cy="114" r="11" fill="#7F1D1D" class="eb eb2"/>
<circle cx="123" cy="110" r="5" fill="white" class="eb eb2"/>
<rect x="46" y="144" width="88" height="22" rx="10" fill="#7F1D1D"/>
<rect x="48" y="144" width="14" height="22" fill="white"/>
<rect x="64" y="144" width="14" height="22" fill="white"/>
<rect x="80" y="144" width="14" height="22" fill="white"/>
<rect x="96" y="144" width="14" height="22" fill="white"/>
<rect x="112" y="144" width="10" height="22" fill="white"/>
<path d="M26 64 Q20 52 26 38" stroke="#FB923C" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M154 64 Q160 52 154 38" stroke="#FB923C" stroke-width="4" fill="none" stroke-linecap="round"/>
</g></svg>`,
      disgust: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="34" rx="54" ry="30" fill="#15803D"/>
<ellipse cx="56" cy="58" rx="18" ry="32" fill="#166534"/>
<ellipse cx="124" cy="58" rx="18" ry="32" fill="#166534"/>
<rect x="62" y="186" width="56" height="14" rx="7" fill="#C026D3" opacity=".72"/>
<ellipse cx="90" cy="120" rx="56" ry="62" fill="#4ADE80"/>
<line x1="52" y1="84" x2="42" y2="70" stroke="#14532D" stroke-width="4" stroke-linecap="round"/>
<line x1="64" y1="78" x2="57" y2="63" stroke="#14532D" stroke-width="4" stroke-linecap="round"/>
<line x1="76" y1="75" x2="73" y2="60" stroke="#14532D" stroke-width="4" stroke-linecap="round"/>
<line x1="128" y1="84" x2="138" y2="70" stroke="#14532D" stroke-width="4" stroke-linecap="round"/>
<line x1="116" y1="78" x2="123" y2="63" stroke="#14532D" stroke-width="4" stroke-linecap="round"/>
<line x1="104" y1="75" x2="107" y2="60" stroke="#14532D" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="64" cy="108" rx="22" ry="18" fill="white" class="eb"/>
<circle cx="64" cy="108" r="13" fill="#15803D" class="eb"/>
<circle cx="64" cy="108" r="7" fill="#052e16" class="eb"/>
<circle cx="68" cy="103" r="4" fill="white" class="eb"/>
<ellipse cx="116" cy="108" rx="22" ry="18" fill="white" class="eb eb2"/>
<circle cx="116" cy="108" r="13" fill="#15803D" class="eb eb2"/>
<circle cx="116" cy="108" r="7" fill="#052e16" class="eb eb2"/>
<circle cx="120" cy="103" r="4" fill="white" class="eb eb2"/>
<path d="M46 90 Q64 82 82 90" stroke="#14532D" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M98 90 Q116 82 134 90" stroke="#14532D" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M56 148 Q74 138 90 142 Q106 138 124 148" stroke="#14532D" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M66 160 Q90 152 114 160" stroke="#14532D" stroke-width="4" fill="none" stroke-linecap="round"/>
</g></svg>`,
      fear: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg">
<g style="animation:tremor .3s ease-in-out infinite alternate">
<line x1="90" y1="4" x2="90" y2="30" stroke="#7E22CE" stroke-width="4.5" stroke-linecap="round"/>
<ellipse cx="90" cy="2" rx="7" ry="10" fill="#A855F7" opacity=".7"/>
<path d="M90 30 Q102 20 114 30 Q126 40 138 28" stroke="#7E22CE" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<ellipse cx="90" cy="126" rx="48" ry="72" fill="#D8B4FE"/>
<ellipse cx="60" cy="106" rx="26" ry="30" fill="white" class="eb"/>
<circle cx="60" cy="110" r="18" fill="#7E22CE" class="eb"/>
<circle cx="60" cy="110" r="9" fill="#1A0533" class="eb"/>
<circle cx="65" cy="103" r="5.5" fill="white" class="eb"/>
<ellipse cx="120" cy="106" rx="26" ry="30" fill="white" class="eb eb2"/>
<circle cx="120" cy="110" r="18" fill="#7E22CE" class="eb eb2"/>
<circle cx="120" cy="110" r="9" fill="#1A0533" class="eb eb2"/>
<circle cx="125" cy="103" r="5.5" fill="white" class="eb eb2"/>
<path d="M40 76 Q60 66 80 76" stroke="#4C1D95" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M100 76 Q120 66 140 76" stroke="#4C1D95" stroke-width="5" fill="none" stroke-linecap="round"/>
<ellipse cx="90" cy="164" rx="18" ry="14" fill="#4C1D95"/>
<ellipse cx="90" cy="162" rx="12" ry="10" fill="#1A0533"/>
<path d="M34 122 Q27 128 34 134" stroke="rgba(126,34,206,.5)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M146 122 Q153 128 146 134" stroke="rgba(126,34,206,.5)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
</g></svg>`,
      anxiety: `<svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg"><g>
<ellipse cx="90" cy="38" rx="58" ry="32" fill="#EA580C"/>
<path d="M32 38 Q24 14 36 8 Q38 24 46 19 Q40 4 54 1 Q56 18 66 14 Q62 0 76 2 Q80 18 86 14 Q86 0 98 4 Q96 18 104 14 Q106 2 116 8 Q112 22 122 18 Q124 4 134 10 Q130 26 140 22Z" fill="#C2410C"/>
<ellipse cx="90" cy="128" rx="58" ry="70" fill="#FDBA74"/>
<ellipse cx="46" cy="142" rx="18" ry="10" fill="rgba(239,68,68,.2)"/>
<ellipse cx="134" cy="142" rx="18" ry="10" fill="rgba(239,68,68,.2)"/>
<circle cx="64" cy="118" r="20" fill="white" class="eb"/>
<path d="M64 118 m14 0 a14 14 0 1 1-28 0 a14 14 0 1 1 28 0" fill="none" stroke="#431407" stroke-width="3.5" class="eb"/>
<path d="M64 118 m8 0 a8 8 0 1 1-16 0 a8 8 0 1 1 16 0" fill="none" stroke="#431407" stroke-width="3" class="eb"/>
<path d="M64 118 m4 0 a4 4 0 1 1-8 0 a4 4 0 1 1 8 0" fill="none" stroke="#431407" stroke-width="2.5" class="eb"/>
<circle cx="64" cy="118" r="2" fill="#431407" class="eb"/>
<circle cx="68" cy="112" r="3.5" fill="white" class="eb"/>
<circle cx="116" cy="118" r="20" fill="white" class="eb eb2"/>
<path d="M116 118 m14 0 a14 14 0 1 1-28 0 a14 14 0 1 1 28 0" fill="none" stroke="#431407" stroke-width="3.5" class="eb eb2"/>
<path d="M116 118 m8 0 a8 8 0 1 1-16 0 a8 8 0 1 1 16 0" fill="none" stroke="#431407" stroke-width="3" class="eb eb2"/>
<path d="M116 118 m4 0 a4 4 0 1 1-8 0 a4 4 0 1 1 8 0" fill="none" stroke="#431407" stroke-width="2.5" class="eb eb2"/>
<circle cx="116" cy="118" r="2" fill="#431407" class="eb eb2"/>
<circle cx="120" cy="112" r="3.5" fill="white" class="eb eb2"/>
<path d="M46 98 Q64 106 82 98" stroke="#92400E" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M98 98 Q116 106 134 98" stroke="#92400E" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M48 156 Q68 166 90 156 Q112 166 132 156" stroke="#92400E" stroke-width="5" fill="none" stroke-linecap="round"/>
<ellipse cx="152" cy="92" rx="6" ry="9" fill="#FEF9C3" opacity=".85"/>
<circle cx="152" cy="84" r="6" fill="#FEF9C3" opacity=".85"/>
</g></svg>`
    };

    const CHARS = {
      joy: {
        name: "Joy",
        mood: "HAPPY",
        desc: "Bursting with sunshine! Joy turns every moment into a pure celebration.",
        ec: "#FBBF24",
        er: 251,
        eg: 191,
        eb: 36,
        orb: "rgba(251,191,36,.22)",
        emojis: [{
          e: "&#11088;",
          sz: "20px",
          d: "4.2s",
          dl: "0s",
          tx: "8px",
          ty: "-18px",
          l: "20%",
          t: "22%"
        }, {
          e: "&#10024;",
          sz: "16px",
          d: "5.1s",
          dl: "-1.2s",
          tx: "-6px",
          ty: "-22px",
          l: "65%",
          t: "32%"
        }, {
          e: "&#128516;",
          sz: "22px",
          d: "3.8s",
          dl: "-2s",
          tx: "10px",
          ty: "-14px",
          l: "40%",
          t: "50%"
        }]
      },
      sadness: {
        name: "Sadness",
        mood: "BLUE",
        desc: "Thoughtful and tender. Sadness reminds us that all feelings really matter.",
        ec: "#60A5FA",
        er: 96,
        eg: 165,
        eb: 250,
        orb: "rgba(96,165,250,.2)",
        emojis: [{
          e: "&#128167;",
          sz: "18px",
          d: "4.6s",
          dl: "0s",
          tx: "4px",
          ty: "-20px",
          l: "18%",
          t: "26%"
        }, {
          e: "&#127783;",
          sz: "22px",
          d: "5.8s",
          dl: "-1.5s",
          tx: "-8px",
          ty: "-16px",
          l: "60%",
          t: "20%"
        }, {
          e: "&#128546;",
          sz: "20px",
          d: "3.5s",
          dl: "-2.5s",
          tx: "6px",
          ty: "-12px",
          l: "35%",
          t: "48%"
        }]
      },
      anger: {
        name: "Anger",
        mood: "FIRED UP",
        desc: "Passionate and fierce — Anger fights hard for what is right!",
        ec: "#F87171",
        er: 248,
        eg: 113,
        eb: 113,
        orb: "rgba(248,113,113,.2)",
        emojis: [{
          e: "&#128293;",
          sz: "22px",
          d: "2.8s",
          dl: "0s",
          tx: "8px",
          ty: "-18px",
          l: "15%",
          t: "22%"
        }, {
          e: "&#128162;",
          sz: "18px",
          d: "3.5s",
          dl: "-1s",
          tx: "-6px",
          ty: "-14px",
          l: "62%",
          t: "28%"
        }, {
          e: "&#128548;",
          sz: "20px",
          d: "4.2s",
          dl: "-2s",
          tx: "12px",
          ty: "-8px",
          l: "38%",
          t: "48%"
        }]
      },
      disgust: {
        name: "Disgust",
        mood: "SASSY",
        desc: "Stylish and selective — only the finest things will do for Disgust!",
        ec: "#4ADE80",
        er: 74,
        eg: 222,
        eb: 128,
        orb: "rgba(74,222,128,.2)",
        emojis: [{
          e: "&#128133;",
          sz: "20px",
          d: "5.0s",
          dl: "0s",
          tx: "-8px",
          ty: "-16px",
          l: "15%",
          t: "25%"
        }, {
          e: "&#127807;",
          sz: "18px",
          d: "4.4s",
          dl: "-1.8s",
          tx: "8px",
          ty: "-20px",
          l: "62%",
          t: "22%"
        }, {
          e: "&#128529;",
          sz: "22px",
          d: "3.6s",
          dl: "-3s",
          tx: "-4px",
          ty: "-10px",
          l: "36%",
          t: "50%"
        }]
      },
      fear: {
        name: "Fear",
        mood: "SCARED",
        desc: "Always on high alert — Fear keeps you safe from absolutely everything!",
        ec: "#C084FC",
        er: 192,
        eg: 132,
        eb: 252,
        orb: "rgba(192,132,252,.2)",
        emojis: [{
          e: "&#128064;",
          sz: "22px",
          d: "3.2s",
          dl: "0s",
          tx: "6px",
          ty: "-18px",
          l: "12%",
          t: "24%"
        }, {
          e: "&#128561;",
          sz: "20px",
          d: "4.0s",
          dl: "-1.3s",
          tx: "-10px",
          ty: "-14px",
          l: "62%",
          t: "28%"
        }, {
          e: "&#9889;",
          sz: "16px",
          d: "2.6s",
          dl: "-2.2s",
          tx: "8px",
          ty: "-10px",
          l: "40%",
          t: "50%"
        }]
      },
      anxiety: {
        name: "Anxiety",
        mood: "WORRIED",
        desc: "Always planning 10 steps ahead — Anxiety never skips a single what-if!",
        ec: "#FB923C",
        er: 251,
        eg: 146,
        eb: 60,
        orb: "rgba(251,146,60,.22)",
        emojis: [{
          e: "&#127744;",
          sz: "22px",
          d: "3.8s",
          dl: "0s",
          tx: "-6px",
          ty: "-20px",
          l: "14%",
          t: "22%"
        }, {
          e: "&#128173;",
          sz: "20px",
          d: "5.2s",
          dl: "-1.4s",
          tx: "8px",
          ty: "-16px",
          l: "60%",
          t: "24%"
        }, {
          e: "&#128560;",
          sz: "18px",
          d: "4.0s",
          dl: "-2.6s",
          tx: "-4px",
          ty: "-10px",
          l: "36%",
          t: "50%"
        }]
      }
    };

    const cvs = document.getElementById('particles');
    const ctx2 = cvs.getContext('2d');

    function resizeCvs() {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight
    }
    resizeCvs();
    window.addEventListener('resize', resizeCvs);
    let activeColor = [180, 140, 255];
    const DOTS = Array.from({
      length: 45
    }, () => ({
      x: Math.random() * cvs.width,
      y: Math.random() * cvs.height,
      r: Math.random() * 2.5 + .5,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .35,
      a: Math.random() * .5 + .1
    }));
    (function frame() {
      requestAnimationFrame(frame);
      ctx2.clearRect(0, 0, cvs.width, cvs.height);
      DOTS.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = cvs.width;
        if (d.x > cvs.width) d.x = 0;
        if (d.y < 0) d.y = cvs.height;
        if (d.y > cvs.height) d.y = 0;
        ctx2.beginPath();
        ctx2.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx2.fillStyle = `rgba(${activeColor[0]},${activeColor[1]},${activeColor[2]},${d.a})`;
        ctx2.fill();
      });
    })();
let sel = null;
document.querySelectorAll('.c-card').forEach(card => {
    card.addEventListener('click', () => {
        // 1. UI Reset
        document.querySelectorAll('.c-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // 2. Data Setup
        const id = card.dataset.id;
        sel = id;
        const ch = CHARS[id];
        activeColor = [ch.er, ch.eg, ch.eb];

        // 3. Update Preview Visuals
        document.getElementById('prevOrb').style.background = ch.orb;
        document.getElementById('prevOrb').style.opacity = '1';
        document.getElementById('prevBg').style.background = `radial-gradient(ellipse 120% 100% at 50% 100%,rgba(${ch.er},${ch.eg},${ch.eb},.18),transparent 65%)`;
        
        const wrap = document.getElementById('bigFaceWrap');
        wrap.innerHTML = `<div class="prev-ring pr1" style="--pr:${ch.er};--pg:${ch.eg};--pb:${ch.eb}"></div><div class="prev-ring pr2" style="--pr:${ch.er};--pg:${ch.eg};--pb:${ch.eb}"></div>${BIG[id]}`;

        // 4. Update Emojis
        document.querySelectorAll('.prev-emoji').forEach(e => e.remove());
        const prev = document.getElementById('preview');
        ch.emojis.forEach(em => {
            const el = document.createElement('span');
            el.className = 'prev-emoji';
            el.style.cssText = `left:${em.l};top:${em.t};--sz:${em.sz};--d:${em.d};--dl:${em.dl};--tx:${em.tx};--ty:${em.ty}`;
            el.innerHTML = em.e;
            prev.appendChild(el);
        });

        // 5. Update Text Info
        document.getElementById('pName').textContent = ch.name;
        document.getElementById('pDesc').textContent = ch.desc;
        
        const m = document.getElementById('pMood');
        m.textContent = ch.mood;
        m.style.cssText = `--ec:${ch.ec};--er:${ch.er};--eg:${ch.eg};--eb:${ch.eb}`;

        // 6. Mobile vs Desktop Label Logic
        const lbl = document.querySelector('.prev-lbl');
        if (window.innerWidth <= 768) {
            lbl.textContent = ch.name;
        } else {
            lbl.textContent = 'YOUR BUDDY';
        }

        // 7. Button State
        const btn = document.getElementById('goBtn');
        btn.classList.add('on');
        btn.style.background = `linear-gradient(135deg,rgba(${ch.er},${ch.eg},${ch.eb},1),rgba(${ch.er},${ch.eg},${ch.eb},.7))`;
        btn.style.boxShadow = `0 8px 28px rgba(${ch.er},${ch.eg},${ch.eb},.4)`;

        // 8. Visibility Toggle
        document.getElementById('emptyMsg').style.display = 'none';
        document.getElementById('selInfo').style.display = 'flex';
    });
});
// Simple API helper (same as in accounts.php)
async function api(action, data = {}) {
  // Use URLSearchParams instead of FormData to avoid strict FormData wrappers
  // from security tooling that reject non-Blob values.
  const body = new URLSearchParams();
  body.append('action', String(action));
  Object.keys(data).forEach(key => {
    const value = data[key];
    body.append(key, value == null ? '' : String(value));
  });
  const res = await fetch(window.location.href, { method: 'POST', body });
    return await res.json();
}
async function go() {
    if (!sel) return;

    // ← NEW: Save selected buddy permanently to the child's profile
    const saveResult = await api('save_buddy', { buddy: sel });
    if (!saveResult.success) {
        console.warn('⚠️ Could not save buddy (non-critical)');
    }

    // Rest of your original go() code (sessionStorage + portal animation)
    sessionStorage.setItem('chosen_character', JSON.stringify({
        id: sel,
        ...CHARS[sel]
    }));

    const ch = CHARS[sel];
    const portal = document.getElementById('portal');
    portal.style.background = `radial-gradient(circle,rgba(${ch.er},${ch.eg},${ch.eb},1) 0%,#0D0820 70%)`;
    portal.style.transition = 'none';
    portal.style.clipPath = 'circle(0% at 89% 50%)';
    void portal.offsetWidth;
    portal.style.transition = 'clip-path .85s cubic-bezier(.4,0,.18,1)';
    portal.style.clipPath = 'circle(150% at 89% 50%)';

    setTimeout(() => {
        window.location.href = '../game-menu/menu.php';
    }, 950);
}
  </script>
</body>

</html>