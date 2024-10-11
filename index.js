$(".featured_item").each(function (index) {
    let tl = gsap.timeline( {paused : true});
    const f = f => {
        tl.clear();
        tl = gsap.timeline({
            paused: true,
            defaults: { 
                duration: .8, 
                ease: "expo.inOut" 
            }
        });
        tl.set(".featured_cover_wrap", {
            opacity:1
        });
        tl.fromTo(f.find(".featured_cover_wrap"), {
            clipPath: "polygon(0% 0%, -10% 0%, 0% 100%, 0% 100%)"
        },{
            clipPath: "polygon(0% 0%, 105% 0%, 100% 100%, 0% 100%)"
        }, 0)
        tl.fromTo(f.find(".featured_cover_wrap .g_visual_wrap"), {
            scale: 1.4
        }, {
            scale: 1,
            ease: "power1.out",
            duration: 1
        }, 0)
        .fromTo(f.find(".featured_cover_link"), {
            y: "100%"
        }, {
            y: "0%",
            duration: .8,
        }, "<0.1")
        .to(f.find(".featured_visual_border"), {
            opacity: 1,
        }, 0)

        // f.siblings().each((function () {
        //     tl.fromTo($(this).find(".featured_number_wrap"), {
        //         opacity: 1
        //     }, {
        //         opacity: .4,
        //         duration: .4,
        //         ease: "none"
        //     }, 0).fromTo($(this).find(".featured_visual_overlay"), {
        //         opacity: 0
        //     }, {
        //         opacity: .5,
        //         duration: .6,
        //         ease: "none"
        //     }, 0)
        // }))
    }
    f($(this));
    $(this).on("mouseenter", function () {
        $(".nav_wrap, .featured_number_wrap").addClass("is-light");
        tl.kill();
        f($(this));
        tl.restart()
    })
    $(this).on("mouseleave", function () {
        $(".nav_wrap, .featured_number_wrap").removeClass("is-light");
        tl.timeScale(1.3);
        tl.reverse()
    })
  });