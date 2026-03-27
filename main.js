/* ============================================================
   Portfolio — Mateusz Kowalski
   main.js
   ============================================================ */

// ── STATE ────────────────────────────────────────────────────
var currentMode = null;

// Element IDs that belong to each mode
var gameEls = [
  'hero-tag-g', 'hero-logo-g', 'hero-name-g', 'hero-title-g', 'hero-desc-g', 'proj-sub-g',
  'gprojects', 'tl1-g', 'tl2-g', 'tl2-where-g', 'about-p-g',
  'skills-g', 'cl-game'
];
var artEls = [
  'hero-tag-a', 'hero-logo-a', 'hero-name-a', 'hero-title-a', 'hero-desc-a', 'proj-sub-a',
  'aprojects', 'consequences', 'tl1-a', 'tl2-a', 'tl2-where-a',
  'about-p-a', 'skills-a', 'cl-art'
];

// ── HELPERS ──────────────────────────────────────────────────
function show(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = '';
}

function hide(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// ── MODE SWITCHING ───────────────────────────────────────────
function setMode(mode, isInit) {
  if (mode === currentMode && !isInit) return;

  var wrap = document.getElementById('transition-wrap');

  if (!isInit) {
    wrap.style.opacity = '0';
    setTimeout(function () {
      applyMode(mode, false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      wrap.style.opacity = '1';
    }, 400);
  } else {
    applyMode(mode, true);
  }
}

function applyMode(mode, isInit) {
  currentMode = mode;
  localStorage.setItem('portfolioMode', mode);

  // Only update hash when already on a mode-hash URL
  if (
    window.location.hash === '#game' ||
    window.location.hash === '#art' ||
    window.location.hash === '#graphics'
  ) {
    history.replaceState(null, null, '#' + mode);
  }

  document.body.className = 'mode-' + mode;
  document.getElementById('pill').style.left = mode === 'art' ? 'calc(50%)' : '4px';

  if (mode === 'game') {
    gameEls.forEach(show);
    artEls.forEach(hide);
  } else {
    artEls.forEach(show);
    gameEls.forEach(hide);
  }

  // Entry animations
  var items = document.querySelectorAll('.entry');
  items.forEach(function (el) { el.classList.remove('in'); });
  requestAnimationFrame(function () {
    items.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('in'); }, isInit ? i * 100 : i * 75);
    });
  });

  // Re-check scroll-reveal elements
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.remove('visible');
  });
  setTimeout(function () {
    document.querySelectorAll('.reveal').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40) el.classList.add('visible');
    });
  }, 300);
}

// ── SMOOTH SCROLL FOR NAV LINKS ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    // Let mode-switch hashes pass through
    if (href === '#' || href === '#game' || href === '#art' || href === '#graphics') return;

    e.preventDefault();
    var targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── INTERSECTION OBSERVER (scroll reveal) ────────────────────
var obs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

// ── PARALLAX ORBS ────────────────────────────────────────────
document.addEventListener('mousemove', function (e) {
  var x = (e.clientX / window.innerWidth  - 0.5) * 22;
  var y = (e.clientY / window.innerHeight - 0.5) * 22;
  var o1 = document.querySelector('.orb-1');
  var o2 = document.querySelector('.orb-2');
  var o3 = document.querySelector('.orb-3');
  if (o1) o1.style.transform = 'translate(' + (x * .5) + 'px,' + (y * .5) + 'px)';
  if (o2) o2.style.transform = 'translate(' + (-x * .3) + 'px,' + (-y * .3) + 'px)';
  if (o3) o3.style.transform = 'translate(' + (x * .7) + 'px,' + (y * .6) + 'px)';
});

// ── CONTACT FORM ─────────────────────────────────────────────
function sendForm(btn) {
  btn.textContent = 'Wysłano! Odezwę się wkrótce.';
  btn.style.opacity = '0.7';
  btn.disabled = true;
}

// ── HASH CHANGE (mode switching via URL) ─────────────────────
window.addEventListener('hashchange', function () {
  var h = window.location.hash.replace('#', '');
  if (h === 'art' || h === 'graphics') {
    setMode('art', false);
  } else if (h === 'game') {
    setMode('game', false);
  }
});

// ── BOOT ─────────────────────────────────────────────────────
function boot() {
  var storedMode = localStorage.getItem('portfolioMode') || 'game';
  var h = window.location.hash.replace('#', '');
  var mode = (h === 'art' || h === 'graphics') ? 'art' : (h === 'game' ? 'game' : storedMode);
  setMode(mode, true);
}

boot();

// ── UNITY 3D BACKGROUND ──────────────────────────────────────
(function initUnityBg() {
  if (typeof THREE === 'undefined') return;

  var canvas = document.getElementById('unity-bg');
  if (!canvas) return;

  // ─── SCENE SETUP
  var scene = new THREE.Scene();
  scene.background = null; // transparent — body bg shows through

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-11, 16, 14);
  camera.lookAt(0, -2, 0);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // ─── GRID (Unity style)
  var gridMinor = new THREE.GridHelper(80, 80, 0x1a3a28, 0x1a3a28);
  scene.add(gridMinor);

  var gridMajor = new THREE.GridHelper(80, 8, 0x2a5a3a, 0x2a5a3a);
  gridMajor.position.y = 0.001;
  scene.add(gridMajor);

  // Axis lines
  function makeAxisLine(from, to, color) {
    var geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(from[0], from[1], from[2]),
      new THREE.Vector3(to[0],   to[1],   to[2])
    ]);
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: color }));
  }
  scene.add(makeAxisLine([-40, 0.002, 0], [40, 0.002, 0], 0x4d2020));
  scene.add(makeAxisLine([0, 0.002, -40], [0, 0.002, 40], 0x1a3a5c));

  // ─── GIZMO
  var gizmo = new THREE.Group();
  scene.add(gizmo);

  function makeArrow(color, direction, length) {
    length = length || 1.6;
    var group = new THREE.Group();
    var mat = new THREE.MeshPhongMaterial({ color: color, emissive: color, emissiveIntensity: 0.4 });
    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, length, 8), mat);
    shaft.position.y = length / 2;
    group.add(shaft);
    var cone = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.38, 10), mat);
    cone.position.y = length + 0.19;
    group.add(cone);
    if (direction === 'x') group.rotation.z = -Math.PI / 2;
    if (direction === 'z') group.rotation.x =  Math.PI / 2;
    return group;
  }

  gizmo.add(makeArrow(0x66cc44, 'y'));
  gizmo.add(makeArrow(0xee4444, 'x'));
  gizmo.add(makeArrow(0x4488ee, 'z'));

  var cubeMat = new THREE.MeshPhongMaterial({ color: 0xdddddd, emissive: 0x888888, emissiveIntensity: 0.3 });
  gizmo.add(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), cubeMat));

  function makeSquare(color, dir) {
    var mat = new THREE.MeshPhongMaterial({
      color: color, transparent: true, opacity: 0.35,
      side: THREE.DoubleSide, emissive: color, emissiveIntensity: 0.2
    });
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.38), mat);
    if (dir === 'xy') { mesh.position.set(0.38, 0.38, 0); }
    if (dir === 'xz') { mesh.rotation.x = Math.PI/2; mesh.position.set(0.38, 0, 0.38); }
    if (dir === 'yz') { mesh.rotation.y = Math.PI/2; mesh.position.set(0, 0.38, 0.38); }
    return mesh;
  }
  gizmo.add(makeSquare(0x4488ee, 'xy'));
  gizmo.add(makeSquare(0x66cc44, 'xz'));
  gizmo.add(makeSquare(0xee4444, 'yz'));

  // ─── LIGHTING
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  // ─── MOUSE TRACKING
  var mouseBg = new THREE.Vector2(-999, -999);
  var raycaster = new THREE.Raycaster();
  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  var targetPosBg  = new THREE.Vector3(0, 0, 0);
  var currentPosBg = new THREE.Vector3(0, 0, 0);

  window.addEventListener('mousemove', function(e) {
    mouseBg.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouseBg.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseBg, camera);
    var hits = raycaster.intersectObject(ground);
    if (hits.length > 0) {
      targetPosBg.copy(hits[0].point);
      targetPosBg.y = 0;
    }
  });

  // ─── RESIZE
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ─── LOOP
  var tBg = 0;
  function animateBg() {
    requestAnimationFrame(animateBg);
    tBg += 0.016;
    currentPosBg.lerp(targetPosBg, 0.06);
    gizmo.position.copy(currentPosBg);
    gizmo.position.y = 0.15 + Math.sin(tBg * 1.4) * 0.06;
    renderer.render(scene, camera);
  }
  animateBg();
})();
