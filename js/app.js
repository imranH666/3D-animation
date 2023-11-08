let scene
let camera
let renderer
let circle
let skelet
let perticle


function init() {
    scene = new THREE.Scene()

    const fov = 75 
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 10000

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 400
    scene.add(camera)

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.autoClear = false
    renderer.setClearColor(0x000000, 0.0)
    document.getElementById("canvas").appendChild(renderer.domElement)

    // 3d object
    circle = new THREE.Object3D()
    skelet = new THREE.Object3D()
    perticle = new THREE.Object3D()

    scene.add(circle)
    scene.add(skelet)
    scene.add(perticle)

    let geometry = new THREE.TetrahedronGeometry(2, 1)
    let geo1 = new THREE.IcosahedronGeometry(7, 1)
    let geo2 = new THREE.IcosahedronGeometry(15, 4)

    let material = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.flatShading})
    let mat = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: true})

    for(let i = 0; i < 1000; i++) {
        let mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        mesh.position.multiplyScalar(90 + (Math.random() * 700))
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
        perticle.add(mesh)
    }

    let innerPlanet = new THREE.Mesh(geo1, material)
    innerPlanet.scale.x = innerPlanet.scale.y = innerPlanet.scale.z = 16
    circle.add(innerPlanet)

    let outerPlanet = new THREE.Mesh(geo2, mat)
    outerPlanet.scale.x = outerPlanet.scale.y = outerPlanet.scale.z = 10
    skelet.add(outerPlanet)


    let ambienLight = new THREE.AmbientLight(0x99999)
    scene.add(ambienLight)

    let dLight = []
    dLight[0] = new THREE.DirectionalLight(0xfff, 1)
    dLight[0].position.set(1, 0, 0)
    dLight[1] = new THREE.DirectionalLight(0xe725ad, 1)
    dLight[1].position.set(0.75, 1, 0.5)
    dLight[2] = new THREE.DirectionalLight(0x09f3ad, 1)
    dLight[2].position.set(-0.75, -1, 0.5)
    scene.add(dLight[0])
    scene.add(dLight[1])
    scene.add(dLight[2])

    animate()

    function animate() {
        requestAnimationFrame(animate)

        perticle.rotation.x += 0.0000
        perticle.rotation.y -= 0.0040
        perticle.rotation.z -= 0.0020

        circle.rotation.x = 0.0030
        circle.rotation.y = 0.0030

        skelet.rotation.x -= 0.0010
        skelet.rotation.y -= 0.0010


        renderer.render(scene, camera)
    }
}



window.onload = init