var eventLogger = {
    quoteRegistered: false,
    trackvalues: {
        social: {
            "twt-tweet": "twitter_click",
            "twt-retweet": "twitter_click",
            "twt-favorite": "twitter_click",
            "twt-follow": "twitter_click",
            "fb-like": "facebook_click",
            "fb-share": "facebook_post",
            "goog-plus": "google_click",
            "lin-share": "linkedin_click",
            "pin-share": "pinterest_click",
            "reddit-share": "reddit_click",
            "stumbleupon-share": "stumbleupon_click",
            "embed": "embed_click",
            "link": "link_click",
            "email": "email_click",
            "print": "print_click",
            "cmt-cmmt": "disqus_click"
        }
    },
    init: function() {
        if (jQuery("body.cnn-story").length > 0) {
            if (typeof(business) == "undefined") {
                business = {
                    mny: {
                        bubble_quotes: 0
                    }
                };
            }
        }
    },
    social_track: function(h, a) {
        var g = "";
        var c = this.trackvalues.social[h];
        var f = {
            type: "social-click"
        };
        if (typeof a === "undefined" || a == null) {
            g = window.location.href;
        } else {
            g = a;
        } if (c != null && g != "") {
            try {
                f.data = {
                    clickObj: {
                        socialType: c,
                        pageName: g
                    }
                };
                trackMetrics(f);
            } catch (d) {}
        }
    },
    incBubbleCount: function() {
        try {
            business.mny.bubble_quotes++;
        } catch (a) {}
    },
    log: function(c, a) {
        try {
            switch (c) {
                case "quote":
                    if (this.quoteRegistered == false) {
                        logMetrics({
                            "action": c,
                            "data": {
                                "component": a
                            }
                        });
                        this.quoteRegistered = true;
                    }
                    break;
                case "navclick":
                case "navhover":
                case "quotehover":
                    logMetrics({
                        "action": c,
                        "data": {
                            "component": a
                        }
                    });
                    break;
            }
        } catch (d) {}
    }
};
eventLogger.init();

$('.js-share-fb').click(function(){
    event.preventDefault();
    eventLogger.social_track('fb-share');
});


$('.js-share-tw').click(function(){
    event.preventDefault();
    eventLogger.social_track('twt-tweet');
});