(function(h, o, g) {
    var p = function() {
        for (var b = /audio(.min)?.js.*/, a = document.getElementsByTagName("script"), c = 0, d = a.length; c < d; c++) {
            var e = a[c].getAttribute("src");
            if (b.test(e)) return e.replace(b, "")
        }
    }();
    g[h] = {
        instanceCount: 0,
        instances: {},
        settings: {
            autoplay: false,
            loop: false,
            preload: true,
            imageLocation: p + "",
            createPlayer: {
                markup: '<div class="audiojs-scrubber" data-scrub>\
                            <div class="audiojs-progress"></div>\
                            <div class="audiojs-loaded"></div>\
                        </div>\
                        <div class="clearfix" style="position:relative;">\
                            <div class="audiojs-title"><small id="audiojs-title"></small></div>\
                            <div class="audiojs-time">\
                                <em class="audiojs-played">00:00</em>\
                                /\
                                <strong class="audiojs-duration">00:00</strong>\
                            </div>\
                        </div>\
                        <div class="clearfix audiojs-btns">\
                            <div id="audiojs-prev" class="audiojs-prev">\
                                <small>\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.92 48.92">\
                                    <path d="M78.46,25.54L50,50,78.46,74.46V25.54ZM21.54,50L50,74.46V25.54Z" transform="translate(-21.54 -25.54)"/>\
                                    </svg>\
                                </small>\
                            </div>\
                            <div class="audiojs-play-pause" id="audiojs-play-pause">\
                                <small class="audiojs-play">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.77 27.54">\
                                        <polygon class="cls-1" points="0 0 0 27.54 13.77 13.77 0 0"></polygon>\
                                    </svg>\
                                </small>\
                                <small class="audiojs-pause">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.2 41.9">\
                                        <rect width="8.1" height="41.9"/>\
                                        <rect x="16.1" width="8.1" height="41.9"/>\
                                    </svg>\
                                </small>\
                            </div>\
                            <div id="audiojs-next" class="audiojs-next">\
                                <small>\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.92 48.92">\
                                    <path d="M21.54,74.46L50,50,21.54,25.54V74.46ZM78.46,50L50,25.54V74.46Z" transform="translate(-21.54 -25.54)"/>\
                                    </svg>\
                                </small>\
                            </div>\
                        </div>\
                        <div class="audiojs-error-message"></div>',
                playPauseClass: "audiojs-play-pause",
                scrubberClass: "audiojs-scrubber",
                progressClass: "audiojs-progress",
                loaderClass: "audiojs-loaded",
                timeClass: "audiojs-time",
                durationClass: "audiojs-duration",
                playedClass: "audiojs-played",
                errorMessageClass: "audiojs-error-message",
                playingClass: "audiojs-is-playing",
                loadingClass: "audiojs-loading",
                errorClass: "audiojs-error"
            },
            css: '',
            trackEnded: function() {
            },
            loadError: function() {
                var b = this.settings.createPlayer,
                    a = j(b.errorMessageClass, this.wrapper);
                g[h].helpers.removeClass(this.wrapper,
                    b.loadingClass);
                g[h].helpers.addClass(this.wrapper, b.errorClass);
                a.innerHTML = 'Error loading: "' + this.mp3 + '"'
            },
            init: function() {
                g[h].helpers.addClass(this.wrapper, this.settings.createPlayer.loadingClass)
            },
            loadStarted: function() {
                var b = this.settings.createPlayer,
                    a = j(b.durationClass, this.wrapper),
                    c = Math.floor(this.duration / 60),
                    d = Math.floor(this.duration % 60);
                g[h].helpers.removeClass(this.wrapper, b.loadingClass);
                a.innerHTML = (c < 10 ? "0" : "") + c + ":" + (d < 10 ? "0" : "") + d
            },
            loadProgress: function(b) {
                var a = this.settings.createPlayer,
                    c = j(a.scrubberClass, this.wrapper);
                j(a.loaderClass, this.wrapper).style.width = c.offsetWidth * b + "px";
            },
            playPause: function() {
                this.playing ? this.settings.play() : this.settings.pause()
            },
            play: function() {
                g[h].helpers.addClass(this.wrapper, this.settings.createPlayer.playingClass)
            },
            pause: function() {
                g[h].helpers.removeClass(this.wrapper, this.settings.createPlayer.playingClass)
            },
            updatePlayhead: function(b) {
                var a = this.settings.createPlayer,
                    c = j(a.scrubberClass, this.wrapper);
                j(a.progressClass, this.wrapper).style.width =
                    c.offsetWidth * b + "px";
                a = j(a.playedClass, this.wrapper);
                c = this.duration * b;
                b = Math.floor(c / 60);
                c = Math.floor(c % 60);
                a.innerHTML = (b < 10 ? "0" : "") + b + ":" + (c < 10 ? "0" : "") + c;
                var time = (b < 10 ? "0" : "") + b + ":" + (c < 10 ? "0" : "") + c;
            }
        },
        create: function(b, a) {
            a = a || {};
            return b.length ? this.createAll(a, b) : this.newInstance(b, a)
        },
        createAll: function(b, a) {
            var c = a || document.getElementsByTagName("audio"),
                d = [];
            b = b || {};
            for (var e = 0, i = c.length; e < i; e++) d.push(this.newInstance(c[e], b));
            return d
        },
        newInstance: function(b, a) {
            var c = this.helpers.clone(this.settings),
                d = "audiojs" + this.instanceCount,
                e = "audiojs_wrapper" + this.instanceCount;
            this.instanceCount++;
            if (b.getAttribute("autoplay") != null) c.autoplay = true;
            if (b.getAttribute("loop") != null) c.loop = true;
            if (b.getAttribute("preload") == "none") c.preload = false;
            a && this.helpers.merge(c, a);
            if (c.createPlayer.markup) b = this.createPlayer(b, c.createPlayer, e);
            else b.parentNode.setAttribute("id", e);
            e = new g[o](b, c);
            c.css && this.helpers.injectCss(e, c.css);
            if (c.useFlash && c.hasFlash) {
                this.injectFlash(e, d);
                this.attachFlashEvents(e.wrapper, e)
            } else c.useFlash && !c.hasFlash &&
                this.settings.flashError.apply(e);
            if (!c.useFlash || c.useFlash && c.hasFlash) this.attachEvents(e.wrapper, e);
            return this.instances[d] = e
        },
        createPlayer: function(b, a, c) {
            var d = document.createElement("div"),
                e = b.cloneNode(true);
            d.setAttribute("class", "audiojs");
            d.setAttribute("className", "audiojs");
            d.setAttribute("data-player", "");
            d.setAttribute("id", c);
            if (e.outerHTML && !document.createElement("audio").canPlayType) {
                e = this.helpers.cloneHtml5Node(b);
                d.innerHTML = a.markup;
                d.appendChild(e);
                b.outerHTML = d.outerHTML;
                d = document.getElementById(c)
            } else {
                d.appendChild(e);
                d.innerHTML += a.markup;
                b.parentNode.replaceChild(d, b)
            }
            return d.getElementsByTagName("audio")[0]
        },
        attachEvents: function(b, a) {
            if (a.settings.createPlayer) {
                var c = a.settings.createPlayer,
                    d = j(c.playPauseClass, b),
                    e = j(c.scrubberClass, b);
                g[h].events.addListener(d, "click", function() {
                    a.playPause.apply(a)
                });
                g[h].events.addListener(e, "click", function(i) {
                    i = i.clientX;
                    var f = this,
                        k = 0;
                    if (f.offsetParent) {
                        do k += f.offsetLeft; while (f = f.offsetParent)
                    }
                    a.skipTo((i - k) / e.offsetWidth)
                });
                if (!a.settings.useFlash) {
                    g[h].events.trackLoadProgress(a);
                    g[h].events.addListener(a.element, "timeupdate", function() {
                        a.updatePlayhead.apply(a)
                    });
                    g[h].events.addListener(a.element, "ended", function() {
                        a.trackEnded.apply(a)
                    });
                    g[h].events.addListener(a.source, "error", function() {
                        clearInterval(a.readyTimer);
                        clearInterval(a.loadTimer);
                        a.settings.loadError.apply(a)
                    })
                }
            }
        },
        helpers: {
            merge: function(b, a) {
                for (attr in a)
                    if (b.hasOwnProperty(attr) || a.hasOwnProperty(attr)) b[attr] = a[attr]
            },
            clone: function(b) {
                if (b ==
                    null || typeof b !== "object") return b;
                var a = new b.constructor,
                    c;
                for (c in b) a[c] = arguments.callee(b[c]);
                return a
            },
            addClass: function(b, a) {
                RegExp("(\\s|^)" + a + "(\\s|$)").test(b.className) || (b.className += " " + a)
            },
            removeClass: function(b, a) {
                b.className = b.className.replace(RegExp("(\\s|^)" + a + "(\\s|$)"), " ")
            },
            cloneHtml5Node: function(b) {
                var a = document.createDocumentFragment(),
                    c = a.createElement ? a : document;
                c.createElement("audio");
                c = c.createElement("div");
                a.appendChild(c);
                c.innerHTML = b.outerHTML;
                return c.firstChild
            }
        },
        events: {
            memoryLeaking: false,
            listeners: [],
            addListener: function(b, a, c) {
                if (b.addEventListener) b.addEventListener(a, c, false);
                else if (b.attachEvent) {
                    this.listeners.push(b);
                    if (!this.memoryLeaking) {
                        window.attachEvent("onunload", function() {
                            if (this.listeners)
                                for (var d = 0, e = this.listeners.length; d < e; d++) g[h].events.purge(this.listeners[d])
                        });
                        this.memoryLeaking = true
                    }
                    b.attachEvent("on" +
                        a,
                        function() {
                            c.call(b, window.event)
                        })
                }
            },
            trackLoadProgress: function(b) {
                if (b.settings.preload) {
                    var a, c;
                    b = b;
                    var d = /(ipod|iphone|ipad)/i.test(navigator.userAgent);
                    a = setInterval(function() {
                        if (b.element.readyState > -1) d || b.init.apply(b);
                        if (b.element.readyState > 1) {
                            b.settings.autoplay && b.play.apply(b);
                            clearInterval(a);
                            c = setInterval(function() {
                                b.loadProgress.apply(b);
                                b.loadedPercent >= 1 && clearInterval(c)
                            })
                        }
                    }, 10);
                    b.readyTimer = a;
                    b.loadTimer = c
                }
            },
            purge: function(b) {
                var a = b.attributes,
                    c;
                if (a)
                    for (c = 0; c < a.length; c +=
                        1)
                        if (typeof b[a[c].name] === "function") b[a[c].name] = null;
                if (a = b.childNodes)
                    for (c = 0; c < a.length; c += 1) purge(b.childNodes[c])
            },
            ready: function() {
                return function(b) {
                    var a = window,
                        c = false,
                        d = true,
                        e = a.document,
                        i = e.documentElement,
                        f = e.addEventListener ? "addEventListener" : "attachEvent",
                        k = e.addEventListener ? "removeEventListener" : "detachEvent",
                        n = e.addEventListener ? "" : "on",
                        m = function(l) {
                            if (!(l.type == "readystatechange" && e.readyState != "complete")) {
                                (l.type == "load" ? a : e)[k](n + l.type, m, false);
                                if (!c && (c = true)) b.call(a, l.type ||
                                    l)
                            }
                        },
                        q = function() {
                            try {
                                i.doScroll("left")
                            } catch (l) {
                                setTimeout(q, 50);
                                return
                            }
                            m("poll")
                        };
                    if (e.readyState == "complete") b.call(a, "lazy");
                    else {
                        if (e.createEventObject && i.doScroll) {
                            try {
                                d = !a.frameElement
                            } catch (r) {}
                            d && q()
                        }
                        e[f](n + "DOMContentLoaded", m, false);
                        e[f](n + "readystatechange", m, false);
                        a[f](n + "load", m, false)
                    }
                }
            }()
        }
    };
    g[o] = function(b, a) {
        this.element = b;
        this.wrapper = b.parentNode;
        this.source = b.getElementsByTagName("source")[0] || b;
        this.mp3 = function(c) {
            var d = c.getElementsByTagName("source")[0];
            return c.getAttribute("src") ||
                (d ? d.getAttribute("src") : null)
        }(b);
        this.settings = a;
        this.loadStartedCalled = false;
        this.loadedPercent = 0;
        this.duration = 1;
        this.playing = false
    };
    g[o].prototype = {
        updatePlayhead: function() {
            this.settings.updatePlayhead.apply(this, [this.element.currentTime / this.duration])
        },
        skipTo: function(b) {
            if (!(b > this.loadedPercent)) {
                this.element.currentTime = this.duration * b;
                this.updatePlayhead()
            }
        },
        load: function(b) {
            this.loadStartedCalled = false;
            this.source.setAttribute("src", b);
            this.element.load();
            this.mp3 = b;
            g[h].events.trackLoadProgress(this)
        },
        loadError: function() {
            this.settings.loadError.apply(this)
        },
        init: function() {
            this.settings.init.apply(this)
        },
        loadStarted: function() {
            if (!this.element.duration) return false;
            this.duration = this.element.duration;
            this.updatePlayhead();
            this.settings.loadStarted.apply(this)
        },
        loadProgress: function() {
            if (this.element.buffered != null && this.element.buffered.length) {
                if (!this.loadStartedCalled) this.loadStartedCalled = this.loadStarted();
                this.loadedPercent = this.element.buffered.end(this.element.buffered.length - 1) / this.duration;
                this.settings.loadProgress.apply(this, [this.loadedPercent])
            }
        },
        playPause: function() {
            this.playing ? this.pause() : this.play()
        },
        play: function() {
            /(ipod|iphone|ipad)/i.test(navigator.userAgent) && this.element.readyState == 0 && this.init.apply(this);
            if (!this.settings.preload) {
                this.settings.preload = true;
                this.element.setAttribute("preload", "auto");
                g[h].events.trackLoadProgress(this)
            }
            this.playing = true;
            this.element.play();
            this.settings.play.apply(this)
        },
        pause: function() {
            this.playing = false;
            this.element.pause();
            this.settings.pause.apply(this)
        },
        setVolume: function(b) {
            this.element.volume = b
        },
        trackEnded: function() {
            this.skipTo.apply(this, [0]);
            // pauses track before ending 
            // this.settings.loop || this.pause.apply(this);
            this.settings.trackEnded.apply(this)
        }
    };
    var j = function(b, a) {
        var c = [];
        a = a || document;
        if (a.getElementsByClassName) c = a.getElementsByClassName(b);
        else {
            var d, e, i = a.getElementsByTagName("*"),
                f = RegExp("(^|\\s)" + b + "(\\s|$)");
            d = 0;
            for (e = i.length; d < e; d++) f.test(i[d].className) && c.push(i[d])
        }
        return c.length > 1 ? c : c[0]
    }
})("audiojs", "audiojsInstance", this);