// Initialize Particles.js
document.addEventListener("DOMContentLoaded", () => {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80, // Number of particles
          density: {
            enable: true,
            value_area: 800, // Area density
          },
        },
        color: {
          value: "#ffffff", // Particle color
        },
        shape: {
          type: "circle", // Shape of particles (circle, edge, triangle, etc.)
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5, // Number of sides for polygon shapes
          },
        },
        opacity: {
          value: 0.5, // Opacity of particles
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3, // Size of particles
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150, // Distance between linked particles
          color: "#ffffff", // Link color
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2, // Movement speed of particles
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out", // Behavior when particles go out of bounds
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse", // Repulse particles on hover
          },
          onclick: {
            enable: true,
            mode: "push", // Push new particles on click
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true, // Enable high-resolution displays
    });
  
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 60, // Adjust for fixed header
            behavior: 'smooth',
          });
        }
      });
    });
  });