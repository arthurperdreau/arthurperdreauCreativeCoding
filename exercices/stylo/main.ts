import "@/style.css";
import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import {Autoplay, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);



gsap.utils.toArray("#bic-image, h2, p").forEach((el) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });
});

gsap.utils.toArray("h2, p").forEach((el) => {
    gsap.fromTo(el,
        { x: -50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
            }
        }
    );
});
gsap.fromTo("#pen",
    {
        scale: 0.2,
        rotate: 0
    },
    {
        scale: 2.5,
        rotate: 720,
        ease: "none",
        scrollTrigger: {
            trigger: "#pen",
            start: "top center",
            end: "bottom top",
            scrub: true,

        }
    }
);

let isOpen = false;

const button = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const items = document.querySelectorAll("#menu li");
const list = document.querySelector("#menu ul");

gsap.set(menu, { width: 64, height: 64, zIndex: 49 });
gsap.set(list, { opacity: 0 });

const tl = gsap.timeline({
    paused: true,
    onComplete: () => isOpen = true,
    onReverseComplete: () => isOpen = false
});

tl.to(menu, {
    width: "100%",
    height: "100%",
    duration: 0.5,
    ease: "power2.inOut"
})
    .to(list, {
        opacity: 1,
        duration: 0.3
    })
    .from(items, {
        x: 200,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
    }, "-=0.2");

if ("addEventListener" in button) {
    button.addEventListener("click", () => {
        isOpen ? tl.reverse() : tl.play();
    });
}

new Swiper(".slider", {
    slidesPerView: 4,
    spaceBetween: 120,
    loop: true,
    speed: 4000,
    modules: [Autoplay],
    allowTouchMove: false,
    autoplay: {
        delay: 1,
        disableOnInteraction: false,
    },
});
const penSlider = new Swiper(".pen-slider", {
    slidesPerView: 3,
    spaceBetween: 60,
    centeredSlides: true,
    loop: true,
    speed: 600,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    modules: [Navigation, Autoplay],
    navigation: {
        nextEl: ".pen-slider .swiper-button-next",
        prevEl: ".pen-slider .swiper-button-prev",
    },
    on: {
        init(swiper) {
            updateZoom(swiper);
        },
        slideChange(swiper) {
            updateZoom(swiper);
        },
    },
});

function updateZoom(swiper: any) {
    swiper.slides.forEach((slide: HTMLElement) => {
        slide.style.transform = "scale(0.75)";
        slide.style.opacity = "0.4";
        slide.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    });

    const active = swiper.slides[swiper.activeIndex];
    if (active) {
        active.style.transform = "scale(1.2)";
        active.style.opacity = "1";
    }
}

gsap.to("hr", {
    yPercent: 100,
    duration: 5,
    stagger: 0.5,
});


