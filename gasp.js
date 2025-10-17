gsap.to(".box1", { 
    x: 320,
    duration: 3,
    repeat: -1,
    opacity: 0,
})

gsap.fromTo(".box2", {  x: 50 }, 
    {
        x: 320, 
        duration: 3,
        delay: 1,
        repeat: -1,
        opacity: 0,
    })

gsap.from(".box3",
    {
        x: 400, 
        duration: 3,
        delay: 1,
        repeat: -1,
        opacity: 0,
    })


let moved = false;
const box4 = document.querySelector(".box4")
box4.addEventListener("click", () => {
    if(!moved){
            gsap.set(".box4",
        {
            x: 400, 
        })
    } else {
       gsap.set(".box4",
        {
            x: 0, 
        }) 
    }
    moved = !moved
})

gsap.to(".box5", { 
    rotation: 360,
    duration: 2, 
    ease: "none",
    repeat: -1
});

gsap.to(".box6", { 
    rotation: 360, 
    duration: 2, 
    ease: "bounce.out",
    repeat: -1,
});

gsap.to(".box7", { 
    rotation: 360, 
    duration: 2, 
    ease: "power1.out",
    repeat: -1,
});

gsap.to(".box8", { 
    rotation: 360, 
    duration: 2, 
    ease: "steps(12)",
    repeat: -1,
});

gsap.to(".box9", { 
    rotation: 360, 
    duration: 2, 
    ease: "circ.inOut",
    repeat: -1,
});

gsap.to(".boxX", { 
    rotation: 360, 
    duration: 2, 
    ease: "back.inOut(3)",
    repeat: -1,
});

gsap.to(".staggers-box", {
    duration: 1,
    rotation: 360,
    delay: 0.5,
    stagger: 1,
    repeat: -1,
    ease: "back.inOut(3)",
    yoyo: true
})

document.querySelectorAll(".staggers-box").forEach((box, index) => {
  box.addEventListener("click", () => {
    if(!moved){
        gsap.to(".staggers-box", {
        duration: 1,
        opacity: 1,
        y: -50,
        stagger: {
            from: index, 
            amount: 1,
        },
        ease: "back.inOut(3)",
        overwrite: "auto",
    });
        }else{
        gsap.to(".staggers-box", {
        duration: 1,
        opacity: 1,
        y: 50,
        stagger: {
            from: index, 
            amount: 1
        },
        ease: "back.inOut(3)",
        overwrite: "auto",
    });
        }
    moved = !moved
  });
});

let control = gsap.to(".control-box", { 
    x: 400,
    duration: 3,
    repeat: -1,
    paused: true
})

let tl = gsap.timeline({ paused: true })
document.querySelectorAll(".timeline-box").forEach((box, index) => {
    switch(index) {
        case 0 :{
            tl.to(box, {duration: 2, x: 400})
            break;
        }
        case 1 :{
            tl.to(box, {duration: 1, x: 400, delay: 1})
            break;
        }
        case 2 :{
            tl.to(box, {duration: 3, x: 400, rotation: 360}, "-=0.6")
        }
    }
})


document.querySelectorAll(".control").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        switch(index){
            case 0 :{
                control.play();
                break;
            }
            case 1 :{
                control.pause();
                break;
            }
            case 2 :{
                control.resume();
                break;
            }
            case 3 :{
                control.reverse();
                break;
            }
            case 4 :{
                control.restart();
                break;
            }
            case 5 :{
                tl.play()
                tl.restart()
            }
        }
    })
})

gsap.set(".mouse", {xPercent: -50, yPercent: -50});

const mouse = document.querySelector(".mouse");
const btns = document.querySelectorAll('button');

let xTo = gsap.quickTo(".mouse", "x", {duration: 0.6, ease: "power3"});
let yTo = gsap.quickTo(".mouse", "y", {duration: 0.6, ease: "power3"});

const original = {
  width: mouse.offsetWidth,
  height: mouse.offsetHeight,
  borderRadius: getComputedStyle(mouse).borderRadius
};

// 鼠标跟随全局
window.addEventListener("mousemove", e => {
  const isHovering = [...btns].some(btn => btn.matches(":hover"));
  if (!isHovering) {
    xTo(e.clientX);
    yTo(e.clientY);
  }
});

// 按钮吸附效果
btns.forEach(btn => {

  btn.addEventListener("mouseenter", () => {
    const rect = btn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    gsap.to(mouse, {
      duration: 0.5,
      width: rect.width + 10,
      height: rect.height + 10,
      borderRadius: 30,
      ease: "back.out(5)",
      overwrite: "auto"
    });

    xTo(btnX);
    yTo(btnY);
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(mouse, {
      duration: 0.5,
      width: original.width,
      height: original.height,
      borderRadius: original.borderRadius,
      ease: "back.out(3)",
      overwrite: "auto"
    });
  });

  btn.addEventListener("click", () => {
    gsap.to(mouse, {
      duration: 0.3,
      width: original.width,
      height: original.height,
      borderRadius: original.borderRadius,
      ease: "back.out(3)",
      overwrite: "auto"
    });

    setTimeout(() => {
        const isHovering = btn.matches(":hover");
        if (!isHovering) {
            gsap.to(".mouse", {
                duration: 1,
                width: original.width,
                height: original.height,
                borderRadius: original.borderRadius,
                ease: "back.out(5)",
                overwrite: "auto"
            });
        } else {
            const rect = btn.getBoundingClientRect();
            gsap.to(".mouse", {
                duration: 1,
                height: rect.height + 10,
                width:  rect.width + 10,
                borderRadius: 30,
                ease: "back.out(5)",
                overwrite: "auto"
            });
        }
    }, 300);
  });
});
