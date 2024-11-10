$(".featured_item").each(function () {
  let item = $(this);
  let tl;

  function createAnimation() {
    if (tl) tl.kill(); // Clear any existing timeline to prevent conflicts

    tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.65,
        ease: "expo.inOut",
      }
    });

    // Set initial states
    tl.set(item.find(".featured_cover_wrap"), { opacity: 1 });

    // Define animation steps for the hovered item
    tl.fromTo(
      item.find(".featured_cover_wrap"),
      { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      0
    )
    .fromTo(
      item.find(".featured_cover_wrap .g_visual_wrap"),
      { scale: 1.4 },
      { scale: 1, ease: "power1.out", duration: 0.8 },
      0
    )
    .fromTo(
      item.find(".featured_cover_link"),
      { y: "100%" },
      { y: "0%" },
      "<0.1"
    )
    .to(
      item.find(".featured_visual_border"),
      { opacity: 1 },
      0
    );

    // Apply sibling animations
    item.siblings().each(function () {
      // Create a new timeline for sibling animations to avoid overlap
      const sibling = $(this);
      gsap.to(sibling.find(".featured_number_wrap"), {
        opacity: 0.4,
        duration: 0.4,
        ease: "none"
      });
      gsap.to(sibling.find(".featured_visual_overlay"), {
        opacity: 0.5,
        duration: 0.4,
        ease: "none",
        delay: 0.1
      });
    });
  }

  // Event Handlers
  item.on("mouseenter", function () {
    $(".nav_wrap, .featured_number_wrap").addClass("is-light");
    createAnimation(); // Create a new timeline for this hover
    tl.restart();
  });

  item.on("mouseleave", function () {
    $(".nav_wrap, .featured_number_wrap").removeClass("is-light");

    // Reverse the current timeline
    if (tl) tl.timeScale(1.3).reverse();

    // Reset siblings to default opacity after mouse leaves
    item.siblings().each(function () {
      const sibling = $(this);
      gsap.to(sibling.find(".featured_number_wrap"), {
        opacity: 1,
        duration: 0.4,
        ease: "none"
      });
      gsap.to(sibling.find(".featured_visual_overlay"), {
        opacity: 0,
        duration: 0.4,
        ease: "none",
        delay: 0.1
      });
    });
  });
});

//info_tab
function info_tab() {
  console.log("function started");

  // Set initial states
  gsap.set($(".projects_popup_outer"), { y: "24.7rem" });

  // Create timeline outside the each loop
  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out", duration: 1.25 },
    onComplete: () => {
      gsap.set(".word", { overflow: "hidden" });
    },
  });
  tl.set(".word", { overflow: "visible" });

  $(".projects_hero_wrap").each(function (index) {
    // Build the timeline
    tl.to(".projects_hero_title .char", {
      yPercent: -101,
      autoAlpha: 0,
      duration: 1.5,
      stagger: { amount: 0.1 },
    });

    tl.to(
      ".projects_hero_liner",
      {
        yPercent: -70,
        autoAlpha: 0,
      },
      0.2
    );

    tl.to(
      $(this).find(".g_visual_overlay"),
      {
        visibility: "visible",
        opacity: 0.6,
      },
      0.2
    );

    tl.to(
      ".projects_popup_outer",
      {
        y: "0",
        duration: 0.8,
        ease: "power2.out",
      },
      "<0.2"
    );

    // tl.to(
    //   $(this).find(".g_visual_wrap").eq(0),
    //   {
    //     yPercent: -2,
    //     scale: 1.01,
    //     duration: 2,
    //     ease: "circ.out",
    //   },
    //   0.4
    // );
  });

  // Event handlers
  $(".projects_popup_outer").on("mouseenter", () => {
    tl.play();
  });

  $(".projects_popup_outer").on("mouseleave", () => {
    tl.timeScale(1.6).reverse();
  });
}
info_tab();

//loader
function loadertl() {
  gsap.registerPlugin(CustomEase)
  let counter = {
    value: 0
  }
  let custom_ease = "M0,0 C0.11,0.494 0.273,0.44 0.526,0.458 0.856,0.481 0.504,1 1,1 ";
  function updateLoaderText() {
    $(".loader_text").text(Math.floor(counter.value)+'%')
  }
  let tl = gsap.timeline({onComplete: () => { $(".loader_wrap").css("display","none")}});
  tl.to(counter, {
    onUpdate: updateLoaderText,
    value: 100,
    duration: 1.5,
    ease: CustomEase.create("custom", custom_ease)
  });
  tl.to('.loader_bar', {
    scaleX: 1,
    duration: 1.5,
    ease: CustomEase.create("custom", custom_ease)
  },0)
  tl.to('.loader_text', {
    duration: 1,
    autoAlpha: 0,
    ease: "expo.out",
  })
  tl.set('.loader_bar', {
    transformOrigin: "center center"
  },"<");
  tl.to('.loader_bar', {
    duration: 1.25,
    scaleY: 55,
    ease: "expo.inOut"
  },"<");
  tl.to('.loader_bar', {
    duration: 1.25,
    scaleX: 2,
    ease: "expo.inOut"
  },"<0.05");
  tl.to('.loader_wrap', {
    duration: 1.25,
    autoAlpha: 0,
    ease: "expo.inOut"
  },"<0.2");
  tl.from(".hero_wrap", {
    scale: 1.05,
    autoAlpha: 0,
    duration: 2,
    yPercent: -5,
    ease: "expo.out"
  },"<-0.2")
}
loadertl();

