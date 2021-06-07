import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')
console.log(loadingBarElement)

const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        gsap.delayedCall(0.5, () =>
        {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''

        })
        
    },
    // Progress
    (itemURL, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)

const gltfLoader = new GLTFLoader(loadingManager)

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#1f2123', 0.1, 8.5)
scene.fog = fog

/**
 * Overlay
 */
 const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1 ,1)
 const overlayMaterial = new THREE.ShaderMaterial({ 
     transparent: true,
     uniforms:
     {
         uAlpha: { value: 1 }
     },
     vertexShader: `
     void main()
         {
             gl_Position = vec4(position, 1.0);
         }
     `,
     fragmentShader: `
         uniform float uAlpha;
         
         void main()
         {
             gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
         }
     `
  })
 const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
 scene.add(overlay)

/**
 * animation Variables  
 */
let mixer1 = null
let mixer2 = null
let mixer3 = null
let FilingArchiveOpenAnim1 = null
let FilingArchiveOpenAnim2 = null
let FilingArchiveOpenAnim3 = null
let FilingArchiveOpenAnim4 = null
let FilingArchiveCloseAnim1 = null
let FilingArchiveCloseAnim2 = null
let FilingArchiveCloseAnim3 = null
let FilingArchiveCloseAnim4 = null

/**
 * Objects
 */
gltfLoader.load(
    '/assets/models/Table.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    '/assets/models/Flowers.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    '/assets/models/Computer.gltf',
    (gltf) =>
    {
        mixer1 = new THREE.AnimationMixer(gltf.scene)
        const keysAnim0 = mixer1.clipAction(gltf.animations[0])
        const keysAnim1 = mixer1.clipAction(gltf.animations[1])
        const keysAnim2 = mixer1.clipAction(gltf.animations[2])
        const keysAnim3 = mixer1.clipAction(gltf.animations[3])
        const keysAnim4 = mixer1.clipAction(gltf.animations[4])
        const keysAnim5 = mixer1.clipAction(gltf.animations[5])
        const keysAnim6 = mixer1.clipAction(gltf.animations[6])
        const keysAnim7 = mixer1.clipAction(gltf.animations[7])
        const mouseAnim = mixer1.clipAction(gltf.animations[8])
        keysAnim0.play()
        keysAnim1.play()
        keysAnim2.play()
        keysAnim3.play()
        keysAnim4.play()
        keysAnim5.play()
        keysAnim6.play()
        keysAnim7.play()
        mouseAnim.play()
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    '/assets/models/Room.gltf',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    '/assets/models/FilingArchive.gltf',
    (gltf) =>
    {
        mixer2 = new THREE.AnimationMixer(gltf.scene)
        FilingArchiveOpenAnim1 = mixer2.clipAction(gltf.animations[1])
        FilingArchiveOpenAnim2 = mixer2.clipAction(gltf.animations[3])
        FilingArchiveOpenAnim3 = mixer2.clipAction(gltf.animations[5])
        FilingArchiveOpenAnim4 = mixer2.clipAction(gltf.animations[8])
        FilingArchiveCloseAnim1 = mixer2.clipAction(gltf.animations[0])
        FilingArchiveCloseAnim2 = mixer2.clipAction(gltf.animations[2])
        FilingArchiveCloseAnim3 = mixer2.clipAction(gltf.animations[4])
        FilingArchiveCloseAnim4 = mixer2.clipAction(gltf.animations[6])
        scene.add(gltf.scene)
    }
)
gltfLoader.load(
    '/assets/models/TreeShadow.gltf',
    (gltf) =>
    {
        mixer3 = new THREE.AnimationMixer(gltf.scene)
        const TreeAnim0 = mixer3.clipAction(gltf.animations[0])
        const TreeAnim1 = mixer3.clipAction(gltf.animations[1])
        TreeAnim0.play()
        TreeAnim1.play()
        scene.add(gltf.scene)
    }
)

// Camera Animation Objects
const cameraLookatGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
const cameraLookatMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0})
const cameraLookat = new THREE.Mesh(cameraLookatGeometry, cameraLookatMaterial)
cameraLookat.position.y = 1
scene.add(cameraLookat)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-3.6, 1.4, 1.4)
scene.add(camera)

/**
 * GSAP Animations
 */
const title = document.getElementById("title")
const projectsWrapper = document.getElementById("projectsWrapper")
const aboutWrapper = document.getElementById("aboutWrapper")
const archiveWrapper = document.getElementById("archiveWrapper")

//DOS Text Animation

const DOSTitle = document.getElementById("projectsTitle")
const DOSText0 = document.getElementById("DOSText0")
const DOSText1 = document.getElementById("DOSText1")
const DOSText2 = document.getElementById("DOSText2")
const DOSText3 = document.getElementById("DOSText3")
const DOSText4 = document.getElementById("DOSText4")

//To Projects View
document.getElementById("projects").addEventListener("click", () =>
{
    // Camera
    gsap.to(cameraLookat.position, { duration: 2, x: 5, y: 1, z: -1.05, ease: "sine.inOut"})
    gsap.to(camera.position, { duration: 2, x: 2.4, y: 1.4, z: -1.05, ease:"sine.inOut"})
    gsap.to(camera, { duration: 2, fov: 20, ease:"sine.inOut" })

    // Add and Remove CSS Classes
    title.classList.add('above')
    projectsWrapper.classList.add('show')
    aboutWrapper.classList.remove('show')
    archiveWrapper.classList.remove('show')
    DOSTitle.classList.add('show')
    DOSText0.classList.add('show')
    DOSText1.classList.add('show')
    DOSText2.classList.add('show')
    DOSText3.classList.add('show')
    DOSText4.classList.add('show')

    FilingArchiveOpenAnim1.stop()
    FilingArchiveOpenAnim2.stop()
    FilingArchiveOpenAnim3.stop()
    FilingArchiveOpenAnim4.stop()
    FilingArchiveCloseAnim1.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim2.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim3.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim4.setLoop( THREE.LoopOnce )
    FilingArchiveOpenAnim1.clampWhenFinished = false
    FilingArchiveOpenAnim2.clampWhenFinished = false    
    FilingArchiveOpenAnim3.clampWhenFinished = false
    FilingArchiveOpenAnim4.clampWhenFinished = false
    FilingArchiveCloseAnim1.play()
    FilingArchiveCloseAnim2.play()
    FilingArchiveCloseAnim3.play()
    FilingArchiveCloseAnim4.play()
})

// To Home View
document.getElementById("title").addEventListener("click", () =>
{
    // Camera
    gsap.to(cameraLookat.position, { duration: 2, x: 0, y: 1, z: 0, ease:"sine.inOut" })
    gsap.to(camera.position, { duration: 2, x: -3.6, y: 1.4, z: 1.4, ease:"sine.inOut"}) 
    gsap.to(camera, { duration: 2, fov: 30, ease:"sine.inOut" })

    // Add and Remove CSS Classes
    title.classList.remove('above')
    projectsWrapper.classList.remove('show')
    aboutWrapper.classList.remove('show')
    archiveWrapper.classList.remove('show')
    DOSTitle.classList.remove('show')
    DOSText0.classList.remove('show')
    DOSText1.classList.remove('show')
    DOSText2.classList.remove('show')
    DOSText3.classList.remove('show')
    DOSText4.classList.remove('show')

    FilingArchiveOpenAnim1.stop()
    FilingArchiveOpenAnim2.stop()
    FilingArchiveOpenAnim3.stop()
    FilingArchiveOpenAnim4.stop()
    FilingArchiveCloseAnim1.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim2.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim3.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim4.setLoop( THREE.LoopOnce )
    FilingArchiveOpenAnim1.clampWhenFinished = false
    FilingArchiveOpenAnim2.clampWhenFinished = false    
    FilingArchiveOpenAnim3.clampWhenFinished = false
    FilingArchiveOpenAnim4.clampWhenFinished = false
    FilingArchiveCloseAnim1.play()
    FilingArchiveCloseAnim2.play()
    FilingArchiveCloseAnim3.play()
    FilingArchiveCloseAnim4.play()
})


//To About View
document.getElementById("about").addEventListener("click", () =>
{
    // Camera
    gsap.to(cameraLookat.position, { duration: 2, x: -1, y: 1, z: 0.1, ease:"sine.inOut" })
    gsap.to(camera.position, { duration: 2, x: 1.7, y: 3.64, z: 2.9, ease:"sine.inOut" })
    gsap.to(camera, { duration: 2, fov: 30, ease:"sine.inOut" })

    // Baffle Animation
    const aboutTitleBaffle = baffle(".aboutTitle")
    aboutTitleBaffle.set({characters : 'Ð¿¾»×Æ⇑¶¥ψβ⊆∏℘ΧΘ⇔¼£§©®Σλχ←',speed: 100})
    aboutTitleBaffle.start()
    aboutTitleBaffle.reveal(5000, 1000); 

    // Add and Remove CSS Classes
    title.classList.add('above')
    projectsWrapper.classList.remove('show')
    aboutWrapper.classList.add('show')
    archiveWrapper.classList.remove('show')
    DOSTitle.classList.remove('show')
    DOSText0.classList.remove('show')
    DOSText1.classList.remove('show')
    DOSText2.classList.remove('show')
    DOSText3.classList.remove('show')
    DOSText4.classList.remove('show')

    // glTF Animation Trigger
    FilingArchiveOpenAnim1.stop()
    FilingArchiveOpenAnim2.stop()
    FilingArchiveOpenAnim3.stop()
    FilingArchiveOpenAnim4.stop()
    FilingArchiveCloseAnim1.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim2.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim3.setLoop( THREE.LoopOnce )
    FilingArchiveCloseAnim4.setLoop( THREE.LoopOnce )
    FilingArchiveOpenAnim1.clampWhenFinished = false
    FilingArchiveOpenAnim2.clampWhenFinished = false    
    FilingArchiveOpenAnim3.clampWhenFinished = false
    FilingArchiveOpenAnim4.clampWhenFinished = false
    FilingArchiveCloseAnim1.play()
    FilingArchiveCloseAnim2.play()
    FilingArchiveCloseAnim3.play()
    FilingArchiveCloseAnim4.play()
})

//To Archive View
document.getElementById("archive").addEventListener("click", () =>
{
    // Camera
    gsap.to(cameraLookat.position, { duration: 2, x: 3.6, y: 0.8, z: 4, ease:"sine.inOut" })
    gsap.to(camera.position, { duration: 2, x: 0.8, y: 0.9, z: 1.2, ease:"sine.inOut" })
    gsap.to(camera, { duration: 2, fov: 30, ease:"sine.inOut" })

    // Baffle Animation
    const aboutTitleBaffle = baffle(".archiveTitle")
    aboutTitleBaffle.set({characters : 'Ð¿¾»×Æ⇑¶¥ψβ⊆∏℘ΧΘ⇔¼£§©®Σλχ←',speed: 100})
    aboutTitleBaffle.start()
    aboutTitleBaffle.reveal(1000, 300); 

    // Add and Remove CSS Classes
    title.classList.add('above')
    projectsWrapper.classList.remove('show')
    aboutWrapper.classList.remove('show')
    archiveWrapper.classList.add('show')
    DOSTitle.classList.remove('show')
    DOSText0.classList.remove('show')
    DOSText1.classList.remove('show')
    DOSText2.classList.remove('show')
    DOSText3.classList.remove('show')
    DOSText4.classList.remove('show')

    FilingArchiveCloseAnim1.stop()
    FilingArchiveCloseAnim2.stop()
    FilingArchiveCloseAnim3.stop()
    FilingArchiveCloseAnim4.stop()
    FilingArchiveOpenAnim1.setLoop( THREE.LoopOnce )
    FilingArchiveOpenAnim2.setLoop( THREE.LoopOnce )
    FilingArchiveOpenAnim3.setLoop( THREE.LoopOnce )
    FilingArchiveOpenAnim4.setLoop( THREE.LoopOnce )
    FilingArchiveOpenAnim1.clampWhenFinished = true
    FilingArchiveOpenAnim2.clampWhenFinished = true
    FilingArchiveOpenAnim3.clampWhenFinished = true
    FilingArchiveOpenAnim4.clampWhenFinished = true
    FilingArchiveOpenAnim1.play()
    FilingArchiveOpenAnim2.play()
    FilingArchiveOpenAnim3.play()
    FilingArchiveOpenAnim4.play()
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //Update Mixers
    if(mixer1 !== null)
    {
     mixer1.update(deltaTime)
    }
    if(mixer2 !== null)
    {
     mixer2.update(deltaTime)
    }
    if(mixer3 !== null)
    {
     mixer3.update(deltaTime)
    }
    camera.updateProjectionMatrix()

    camera.lookAt(cameraLookat.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()