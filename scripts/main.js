/* ============================================================
   Site scripts. Classic (non-module) script on purpose, so the page
   also works when index.html is opened straight from disk (file://),
   where browsers block ES modules. Each feature is one init*().
   ============================================================ */
(function () {
  'use strict';

  /**
   * Game dev / graphic design switch.
   * Markup: [data-mode-set="game|art"] buttons. State lives on <html data-mode>.
   * The initial mode is resolved by an inline script in <head> (no flash).
   */
  function initModeSwitch() {
    var buttons = document.querySelectorAll('[data-mode-set]');
    if (!buttons.length) return;

    var STORAGE_KEY = 'portfolio-mode';
    var HASHES = { game: '#gry', art: '#grafika' };
    var HASH_TO_MODE = { '#gry': 'game', '#game': 'game', '#grafika': 'art', '#art': 'art', '#graphics': 'art' };
    var root = document.documentElement;

    function syncButtons() {
      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.modeSet === root.dataset.mode));
      });
    }

    function save(mode) {
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch (e) {
        // Storage blocked (private mode, file://): the switch still works for this visit.
      }
    }

    function apply(mode) {
      if (mode === root.dataset.mode) return;

      var update = function () {
        root.dataset.mode = mode;
        syncButtons();
      };

      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !reduceMotion && !document.hidden) {
        // The transition is only a crossfade; if the browser skips it, the update still runs.
        var transition = document.startViewTransition(update);
        [transition.ready, transition.updateCallbackDone, transition.finished].forEach(function (promise) {
          promise.catch(function () {});
        });
      } else {
        update();
      }

      save(mode);
      if (HASH_TO_MODE[location.hash]) history.replaceState(null, '', HASHES[mode]);
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        apply(button.dataset.modeSet);
      });
    });

    window.addEventListener('hashchange', function () {
      var mode = HASH_TO_MODE[location.hash];
      if (mode) apply(mode);
    });

    syncButtons();
  }

  /** Mobile navigation. Markup: [data-nav] > [data-nav-toggle] + [data-nav-menu] */
  function initNav() {
    var nav = document.querySelector('[data-nav]');
    if (!nav) return;

    var toggle = nav.querySelector('[data-nav-toggle]');
    var menu = nav.querySelector('[data-nav-menu]');

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.dataset.state = open ? 'open' : 'closed';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) setOpen(false);
    });
  }

  /**
   * Project preview in a native <dialog>.
   * Links with [data-viewer="page"] open in an iframe, [data-viewer="image"] as an image.
   * Without JS the links simply navigate, so content stays reachable.
   * Markup: [data-viewer-dialog] > [data-viewer-heading] [data-viewer-open] [data-viewer-close] [data-viewer-stage]
   */
  function initViewer() {
    var dialog = document.querySelector('[data-viewer-dialog]');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    var heading = dialog.querySelector('[data-viewer-heading]');
    var openLink = dialog.querySelector('[data-viewer-open]');
    var stage = dialog.querySelector('[data-viewer-stage]');
    var closeButton = dialog.querySelector('[data-viewer-close]');
    var trigger = null;

    function clearStage() {
      var media = stage.querySelector('iframe, img');
      if (media) media.remove();
      stage.dataset.state = 'loading';
    }

    function open(link) {
      var url = link.getAttribute('href');
      var isImage = link.dataset.viewer === 'image';
      var title = link.dataset.viewerTitle || link.textContent.trim();

      trigger = link;
      clearStage();
      heading.textContent = title;
      openLink.href = url;

      var media = document.createElement(isImage ? 'img' : 'iframe');
      if (isImage) {
        media.alt = title;
      } else {
        media.title = title;
        // Lets case pages autoplay their (muted) videos inside the dialog.
        media.allow = 'autoplay; fullscreen; picture-in-picture';
      }
      media.addEventListener('load', function () {
        stage.dataset.state = 'ready';
        if (isImage) return;
        // Case pages link to the next project inside the iframe: keep the bar in sync.
        try {
          heading.textContent = media.contentDocument.title.replace(/\s+—\s+Eryk Sobczak$/, '');
          openLink.href = media.contentWindow.location.href;
        } catch (e) {
          // Cross-origin or file:// — keep the original title.
        }
      });
      media.src = url;
      stage.append(media);

      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
    }

    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[data-viewer]');
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      open(link);
    });

    closeButton.addEventListener('click', function () {
      dialog.close();
    });

    // Click on the backdrop (outside the dialog box) closes it.
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      document.documentElement.style.overflow = '';
      clearStage();
      if (trigger) trigger.focus();
    });
  }

  /**
   * Draggable decorative stickers (mouse / pen only; touch keeps normal scrolling).
   * Markup: [data-stickers] > [data-sticker]. Offset is stored in --dx / --dy.
   */
  function initStickers() {
    var area = document.querySelector('[data-stickers]');
    if (!area || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    area.addEventListener('pointerdown', function (event) {
      var sticker = event.target.closest('[data-sticker]');
      if (!sticker) return;

      event.preventDefault();
      sticker.setPointerCapture(event.pointerId);
      sticker.dataset.state = 'dragging';

      var startX = event.clientX - (parseFloat(sticker.style.getPropertyValue('--dx')) || 0);
      var startY = event.clientY - (parseFloat(sticker.style.getPropertyValue('--dy')) || 0);

      function move(e) {
        sticker.style.setProperty('--dx', e.clientX - startX + 'px');
        sticker.style.setProperty('--dy', e.clientY - startY + 'px');
      }

      function drop() {
        delete sticker.dataset.state;
        sticker.removeEventListener('pointermove', move);
      }

      sticker.addEventListener('pointermove', move);
      sticker.addEventListener('pointerup', drop, { once: true });
      sticker.addEventListener('pointercancel', drop, { once: true });
    });
  }

  /**
   * Rounded panel corners under the sticky header.
   * Marks the header with [data-over-panel] only while a .panel crosses its bottom edge,
   * so the corner masks (CSS) never show over the plain page background.
   */
  function initHeaderCorners() {
    var header = document.querySelector('.site-header');
    var panels = document.querySelectorAll('.panel');
    if (!header || !panels.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      var line = header.getBoundingClientRect().bottom;
      var over = Array.prototype.some.call(panels, function (panel) {
        var rect = panel.getBoundingClientRect();
        return rect.top < line && rect.bottom > line;
      });
      header.toggleAttribute('data-over-panel', over);
    }

    function schedule() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
  }

  /**
   * YouTube videos. The markup is a poster link (works without JS: opens YouTube).
   * Over http(s) the link is swapped for an embedded player:
   *  - [data-video-autoplay] on page load: muted, looped autoplay (browsers only allow muted autoplay),
   *  - otherwise on click, with sound.
   * Opened from disk (file://) YouTube refuses to embed (error 153: no referrer),
   * so the link is left alone and opens the video on YouTube.
   * Markup: a.video[data-video="<id>"][data-video-title][data-video-autoplay?]
   */
  function initVideos() {
    var canEmbed = location.protocol === 'http:' || location.protocol === 'https:';
    if (!canEmbed) return;

    function embed(link, autoplay) {
      var id = encodeURIComponent(link.dataset.video);
      var params = autoplay
        ? 'autoplay=1&mute=1&loop=1&playlist=' + id + '&playsinline=1&rel=0'
        : 'autoplay=1&playsinline=1&rel=0';

      var player = document.createElement('div');
      player.className = link.className;
      player.dataset.state = 'playing';

      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?' + params;
      iframe.title = link.dataset.videoTitle || 'Wideo';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';

      player.append(iframe);
      link.replaceWith(player);
      return iframe;
    }

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only visible videos start; a video in the hidden mode starts when its mode is switched on.
    function autoplayVisible() {
      if (reduceMotion) return;
      document.querySelectorAll('a[data-video][data-video-autoplay]').forEach(function (link) {
        if (link.offsetParent !== null) embed(link, true);
      });
    }

    autoplayVisible();
    new MutationObserver(autoplayVisible).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode'],
    });

    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[data-video]');
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      embed(link, false).focus();
    });
  }

  initModeSwitch();
  initVideos();
  initHeaderCorners();
  initNav();
  initViewer();
  initStickers();
})();
