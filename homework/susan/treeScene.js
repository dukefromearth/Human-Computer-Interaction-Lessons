/**
 * A helper function to load textures and objects
 */
const LoaderHelper = {
    _base: './',
    _data: {},
    _loaded: 0,
    _cb: null,

    // get loaded resource by name  
    get(name) {
        return this._data[name] || null;
    },

    // complete handler 
    onReady(cb) {
        this._cb = cb;
    },

    // common error handler 
    onError(err) {
        console.error(err.message || err);
    },

    // when a resource is loaded 
    onData(name, data) {
        this._loaded += 1;
        this._data[name] = data;
        let total = Object.keys(this._data).length;
        let loaded = (total && this._loaded === total);
        let hascb = (typeof this._cb === 'function');
        if (loaded && hascb) this._cb(total);
    },

    // custom .obj file 
    loadGeometry(name, file) {
        if (!name || !file) return;
        this._data[name] = new THREE.Object3D();
        const path = this._base + '/' + file;
        const loader = new THREE.OBJLoader();
        loader.load(path, data => { this.onData(name, data) }, null, this.onError);
    },

    // load image file 
    loadTexture(name, file) {
        if (!name || !file) return;
        this._data[name] = new THREE.Texture();
        const path = this._base + '/' + file;
        const loader = new THREE.TextureLoader();
        loader.load(path, data => { this.onData(name, data) }, null, this.onError);
    },
};

/**
 * A helper function to get information from the device
 */
const deviceInfo = (function () {
    const _w = window;
    const _s = window.screen;
    const _b = document.body;
    const _d = document.documentElement;

    return {
        screenWidth() {
            return Math.max(0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0);
        },
        screenHeight() {
            return Math.max(0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0);
        },
        screenRatio() {
            return this.screenWidth() / this.screenHeight();
        },
        screenCenterX() {
            return this.screenWidth() / 2;
        },
        screenCenterY() {
            return this.screenHeight() / 2;
        },
        mouseX(e) {
            return Math.max(0, e.pageX || e.clientX || 0);
        },
        mouseY(e) {
            return Math.max(0, e.pageY || e.clientY || 0);
        },
        mouseCenterX(e) {
            return this.mouseX(e) - this.screenCenterX();
        },
        mouseCenterY(e) {
            return this.mouseY(e) - this.screenCenterY();
        },
    };
})();

/**
 * Helper for adding easing effect 
 */
const addEase = (pos, to, ease) => {
    pos.x += (to.x - pos.x) / ease;
    pos.y += (to.y - pos.y) / ease;
    pos.z += (to.z - pos.z) / ease;
};

/**
 * Tree object
 */
const trees = {
    scene: null,
    group: null,
    move: { x: 0, y: -200, z: -700 },
    look: { x: 0, y: Math.PI, z: 0 },
    eMove: { x: 0, y: 0, z: 0 },

    // create
    create(scene) {
        this.scene = scene;
        this.group = new THREE.Object3D();
        this.group.scale.set(0.5, 0.5, 0.5);
        this.group.position.set(this.move.x, this.move.y, this.move.z);
        this.group.rotation.set(this.look.x, this.look.y, this.look.z);
        this.group.rotation.y = Math.PI;

        let light = new THREE.PointLight(0xffffff, .4, 600);
        light.position.set(0, 100, 300);

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('assets/');
        var url = "susan.mtl";
        let self = this;
        mtlLoader.load(url, function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('assets/susan.obj', function (object) {
                self.group.add(object);
                self.group.add(light);
                scene.add(self.group);
            });

        });
    },

    update(mouse) {
        this.group.position.x = (mouse.x * 0.01);

    },
};

/**
 * Ground object
 */
const groundPlain = {
    group: null,
    geometry: null,
    material: null,
    plane: null,
    simplex: null,
    factor: 300, // smoothness 
    scale: 30, // terrain size
    speed: 0.015, // move speed 
    cycle: 0,
    ease: 12,
    move: { x: 0, y: -300, z: -1000 },
    look: { x: 29.8, y: 0, z: 0 },

    // create
    create(scene) {
        this.group = new THREE.Object3D();
        this.group.position.set(this.move.x, this.move.y, this.move.z);
        this.group.rotation.set(this.look.x, this.look.y, this.look.z);

        this.geometry = new THREE.PlaneGeometry(4000, 2000, 128, 64);

        this.waterTexture = LoaderHelper.get('waterTexture');
        this.waterTexture.wrapT = THREE.RepeatWrapping;
        this.waterTexture.wrapS = THREE.RepeatWrapping;

        this.material = new THREE.MeshBasicMaterial({
            color: 0x0099ff,
            opacity: 1,
            map: this.waterTexture,
            side: THREE.FrontSide,
            depthTest: true,
        });

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.position.set(0, 0, 0);

        this.simplex = new SimplexNoise();
        this.moveNoise();

        this.group.add(this.plane);
        scene.add(this.group);
    },

    // change noise values over time 
    moveNoise() {
        for (let vertex of this.geometry.vertices) {
            let xoff = (vertex.x / this.factor);
            let yoff = (vertex.y / this.factor) + this.cycle;
            let rand = this.simplex.noise2D(xoff, yoff) * this.scale;
            vertex.z = rand;
        }
        this.geometry.verticesNeedUpdate = true;
        this.cycle += this.speed;
    },

    // update
    update(mouse) {
        this.moveNoise();
        this.move.x = -(mouse.x * 0.04);
        addEase(this.group.position, this.move, this.ease);
        addEase(this.group.rotation, this.look, this.ease);
    },
};


const setupScene = () => {
    const scene = new THREE.Scene();
    let mouse = { x: 0, y: 0 };

    // setup renderer 
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, precision: 'mediump' });
    renderer.setSize(deviceInfo.screenWidth(), deviceInfo.screenHeight());
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.sortObjects = true;
    renderer.domElement.setAttribute('id', 'stageElement');
    document.body.appendChild(renderer.domElement);

    // setup camera 
    const camera = new THREE.PerspectiveCamera(60, deviceInfo.screenRatio(), 0.1, 20000);
    camera.position.set(0, 0, 10);
    camera.rotation.set(0, 0, 0);
    camera.lookAt(scene.position);

    // soft white light
    var ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // setup objects 
    trees.create(scene);
    groundPlain.create(scene);

    // setup light source 
    const light = new THREE.SpotLight(0xf4f1c9, 6, 1200);
    light.position.set(-500, 500, 200);
    light.castShadow = true;
    light.target = scene;
    light.lookAt(trees.group);
    scene.add(light);

    // on page resize
    window.addEventListener('resize', e => {
        camera.aspect = deviceInfo.screenRatio();
        camera.updateProjectionMatrix();
        renderer.setSize(deviceInfo.screenWidth(), deviceInfo.screenHeight());
    });

    // on mouse move 
    window.addEventListener('mousemove', e => {
        mouse.x = deviceInfo.mouseCenterX(e);
        mouse.y = deviceInfo.mouseCenterY(e);
    });

    

    let angle = 0;

    // animation loop 
    const loop = () => {
        requestAnimationFrame(loop);
        // update objects 
        trees.update(mouse);
        groundPlain.update(mouse);

        trees.group.rotation.y += 0.001;
        trees.group.position.y += Math.sin(angle += 0.1);

        // render scene 
        renderer.render(scene, camera);
    };

    loop();
};

LoaderHelper.onReady(setupScene);
LoaderHelper.loadGeometry('treeGeometry', './assets/susan.obj');
LoaderHelper.loadTexture('waterTexture', './assets/water.jpg');