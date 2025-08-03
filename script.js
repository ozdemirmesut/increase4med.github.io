document.addEventListener('DOMContentLoaded', () => {

    // GSAP eklentilerini kaydet
    gsap.registerPlugin(ScrollTrigger);

    // --- YÜKLENME ANİMASYONU ---
    const loaderBar = document.querySelector('.loader-bar');
    const mainContent = document.querySelector('#main-content');

    loaderBar.style.width = '100%';
    setTimeout(() => {
        gsap.to('#loader', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.querySelector('#loader').style.display = 'none';
                gsap.to('#main-content', {
                    visibility: 'visible',
                    opacity: 1,
                    duration: 1
                });
            }
        });
    }, 1200);


    // --- BÖLÜM 1: HERO ANİMASYONU ---
    gsap.to('.hero-title', {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
            trigger: '.section-hero',
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
        }
    });
    gsap.to('.hero-video', {
        filter: 'brightness(0.3)',
        scrollTrigger: {
            trigger: '.section-hero',
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
        }
    });

    // --- BÖLÜM 2: MEYDAN OKUMA METNİ ANİMASYONU ---
    gsap.to('.challenge-text', {
        opacity: 1,
        y: -50,
        scrollTrigger: {
            trigger: '.section-challenge',
            start: 'top center',
            end: 'center center',
            scrub: 1,
        }
    });
     gsap.to('.challenge-text', {
        opacity: 0,
        y: -100,
        scrollTrigger: {
            trigger: '.section-challenge',
            start: 'center center',
            end: 'bottom center',
            scrub: 1,
        }
    });


    // --- BÖLÜM 3: 3D DRON ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('drone-canvas-container').appendChild(renderer.domElement);

    // Işıklar
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    let drone;
    const loader = new THREE.GLTFLoader();
    
    // NOT: Bu 3D model linki bir örnektir. Düzgün çalışmayabilir veya değişebilir.
    // Gerçek bir projede kendi .glb dosyanızı sunucunuza yüklemeniz gerekir.
    // Sketchfab gibi sitelerden ücretsiz veya ücretli modeller bulabilirsiniz.
    loader.load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf', (gltf) => {
        drone = gltf.scene;
        drone.scale.set(1.5, 1.5, 1.5);
        drone.rotation.y = Math.PI;
        scene.add(drone);
    }, undefined, (error) => {
        console.error(error);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (drone) {
             // Dronun kendi kendine yavaşça dönmesi
             drone.rotation.y += 0.001;
        }
        renderer.render(scene, camera);
    }
    animate();

    // 3D Animasyonun ScrollTrigger ile kontrolü
    let tl3D = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-drone',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: true,
        }
    });

    tl3D.to(camera.position, { z: 2.5, ease: 'power1.in' }, 0)
        .to(drone.rotation, { x: Math.PI * 0.2, y: Math.PI * 1.7, ease: 'power1.inOut' }, 0)
        .to('#anno-1', { opacity: 1, scale: 1, ease: 'power2.out' }, 0.2)
        .to('#anno-1', { opacity: 0, scale: 0.8, ease: 'power2.in' }, 0.35)
        .to(drone.rotation, { x: -Math.PI * 0.1, y: Math.PI * 2.5, ease: 'power1.inOut' }, 0.4)
        .to('#anno-2', { opacity: 1, scale: 1, ease: 'power2.out' }, 0.5)
        .to('#anno-3', { opacity: 1, scale: 1, ease: 'power2.out' }, 0.6)
        .to('#anno-2, #anno-3', { opacity: 0, scale: 0.8, ease: 'power2.in' }, 0.85)
        .to(camera.position, { z: 10, ease: 'power1.in' }, 0.9)
        .to(drone.rotation, { y: Math.PI * 4, ease: 'power1.in' }, 0.9);


    // --- BÖLÜM 5: ETKİ İSTATİSTİKLERİ ---
    gsap.from('.impact-stat', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: '.section-impact',
            start: 'top center',
        }
    });

    document.querySelectorAll('.stat-number').forEach(el => {
        const targetValue = parseInt(el.dataset.value);
        gsap.from(el, {
            textContent: 0,
            duration: 2,
            ease: 'power1.inOut',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            }
        });
    });
    
    // Pencere yeniden boyutlandırıldığında
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});