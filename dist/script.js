'use strict';
import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/DDSLoader.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import React, { useState, useEffect, useRef } from 'https://cdn.skypack.dev/react@18.2.0';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@18.2.0';
import gsap from 'https://cdn.skypack.dev/gsap@3.10.4';
console.clear();
const IS_DEBUG = false;
const ASSETS_PATH = 'https://assets.codepen.io/430361';
const FPS = 24;
const SCREEN = [{
        FOV: 65,
        Y: 2,
        Z: 7,
    }, {
        FOV: 45,
        Y: 1.15,
        Z: 6.5
    }];
const DEFAULT_LIFE = 40;
const DEFAULT_ENEMY_LIFE = 10;
const COMMANDS = ['Skip', 'Defend', 'Attack', 'Heal'];
let scene;
let camera;
let renderer;
let chicky;
let ghost;
let stage;
let dice;
let renderTimeout = 0;
//////////////////////////////////////////////////
// ENUMS
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["Chicky"] = 0] = "Chicky";
    ObjectType[ObjectType["Ghost"] = 1] = "Ghost";
})(ObjectType || (ObjectType = {}));
var FadeType;
(function (FadeType) {
    FadeType[FadeType["Hidden"] = 0] = "Hidden";
    FadeType[FadeType["In"] = 1] = "In";
    FadeType[FadeType["Out"] = 2] = "Out";
})(FadeType || (FadeType = {}));
var FloorType;
(function (FloorType) {
    FloorType[FloorType["None"] = 0] = "None";
    FloorType[FloorType["Next"] = 1] = "Next";
    FloorType[FloorType["Reset"] = 2] = "Reset";
})(FloorType || (FloorType = {}));
//////////////////////////////////////////////////
// HELPERS
function getRadian(degree) {
    return degree * Math.PI / 180;
}
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//////////////////////////////////////////////////
// ThreeJS Settings
function setRenderer() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(SKY_COLOR);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
}
function setLighting() {
    const ambientColor = 0xffffff;
    const ambientIntensity = 0.7;
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambientLight);
    const directionalColor = 0xffffff;
    const directionalIntensity = 0.8;
    const directionalLight = new THREE.DirectionalLight(directionalColor, directionalIntensity);
    const directionalX = -3;
    const directionalY = 5;
    const directionalZ = 2;
    directionalLight.position.set(directionalX, directionalY, directionalZ);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.bias = -0.0005;
    scene.add(directionalLight);
    if (IS_DEBUG) {
        scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));
    }
}
function setScreenSettings() {
    let fov = SCREEN[0].FOV;
    let y = SCREEN[0].Y;
    let z = SCREEN[0].Z;
    if (window.innerWidth > 525) {
        fov = SCREEN[1].FOV;
        y = SCREEN[1].Y;
        z = SCREEN[1].Z;
    }
    camera.fov = fov;
    camera.position.y = y;
    camera.position.z = z;
}
//////////////////////////////////////////////////
// ThreeJS Models
function loadModel(name) {
    return new Promise((resolve, reject) => {
        const manager = new THREE.LoadingManager();
        manager.addHandler(/\.dds$/i, new DDSLoader());
        new MTLLoader(manager)
            .load(`${ASSETS_PATH}/${name}.mtl`, (materials) => {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .load(`${ASSETS_PATH}/${name}.obj`, (obj) => {
                obj.traverse((o) => {
                    o.castShadow = true;
                    o.receiveShadow = true;
                });
                resolve(obj);
            }, undefined, (error) => {
                reject(error);
            });
        });
    });
}
async function setChicky() {
    chicky = await loadModel('RogueLikeChicky-5');
    scene.add(chicky);
    chicky.position.set(-2, 0, 0);
    chicky.traverse((obj) => {
        if (obj.isMesh === true) {
            obj.rotateY(getRadian(90));
        }
    });
}
async function setGhost() {
    ghost = await loadModel('RogueLikeGhost-6');
    scene.add(ghost);
    ghost.position.set(2, 0, 0);
    ghost.traverse((obj) => {
        if (obj.isMesh === true) {
            obj.rotateY(getRadian(-90));
        }
    });
}
async function setStage() {
    stage = await loadModel('RogueLikeStage');
    scene.add(stage);
    stage.position.set(0, -1.6, 0);
}
async function setDice() {
    dice = await loadModel('RogueLikeDice');
    scene.add(dice);
    dice.visible = false;
}
//////////////////////////////////////////////////
// Game Functions
function animateFloor(callback) {
    let y = SCREEN[0].Y;
    let z = SCREEN[0].Z;
    if (window.innerWidth > 525) {
        y = SCREEN[1].Y;
        z = SCREEN[1].Z;
    }
    gsap.fromTo(camera.position, {
        y: 0,
        z: 0,
    }, {
        y: y,
        z: z,
        duration: 0.75,
        ease: 'back.out(1.5)',
        onComplete() {
            callback();
        },
    });
}
function doSkip(obj) {
    return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 0.9,
            y: 1.1,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1,
            y: 1,
            duration: 1,
            ease: 'elastic.out',
            onComplete() {
                resolve();
            },
        });
    });
}
function doAttack(obj, type) {
    return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.3,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1,
            y: 1,
            duration: 0.3,
            ease: 'elastic.out',
        });
        tl.to(obj.position, {
            y: 0.8,
            duration: 0.3,
            ease: 'power3.out',
        }, '-=0.3');
        tl.to(obj.position, {
            y: 0,
            duration: 0.3,
            ease: 'power3.in',
        });
        tl.to(obj.position, {
            x: (type === ObjectType.Chicky) ? 2 : -2,
            duration: 0.8,
            ease: 'power1.out',
        }, '-=0.6');
        tl.to(obj.scale, {
            x: 1.1,
            y: 0.9,
            duration: 0.1,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1,
            y: 1,
            duration: 0.35,
            ease: 'elastic.out',
        });
        tl.to(obj.rotation, {
            y: getRadian(-25),
            z: getRadian(-10),
            ease: 'power4.out',
            duration: 0.2,
            delay: 0.05,
            onComplete() {
                let obj2 = (type === ObjectType.Chicky) ? ghost : chicky;
                let tl2 = gsap.timeline();
                tl2.to(obj2.position, {
                    x: obj2.position.x - ((type === ObjectType.Chicky) ? -0.15 : 0.15),
                    ease: 'power4.out',
                    duration: 0.1,
                    delay: 0.5,
                });
                tl2.to(obj2.position, {
                    x: obj2.position.x + ((type === ObjectType.Chicky) ? -0.15 : 0.15),
                    ease: 'bounce.out',
                    duration: 0.5,
                });
            },
        });
        tl.to(obj.rotation, {
            y: getRadian(45),
            z: getRadian((type === ObjectType.Chicky) ? -20 : 20),
            ease: 'power4.inOut',
            duration: 0.5,
        });
        tl.to(obj.rotation, {
            y: 0,
            z: 0,
            ease: 'bounce.out',
            duration: 0.4,
            delay: 0.25,
        });
        tl.to(obj.position, {
            y: 0.2,
            duration: 0.3,
            ease: 'power4.out',
            delay: 0.2,
        });
        tl.to(obj.position, {
            x: (type === ObjectType.Chicky) ? -2 : 2,
            duration: 0.6,
            ease: 'power1.out',
        }, '-=0.2');
        tl.to(obj.rotation, {
            z: getRadian((type === ObjectType.Chicky) ? 10 : -10),
            duration: 0.1,
            ease: 'power1.out',
        }, '-=0.6');
        tl.to(obj.rotation, {
            z: 0,
            duration: 0.1,
            ease: 'power1.out',
        }, '-=0.3');
        tl.to(obj.position, {
            y: 0,
            duration: 0.3,
            ease: 'power4.out',
        }, '-=0.2');
        tl.to(obj.scale, {
            x: 1.1,
            y: 0.9,
            duration: 0.2,
            ease: 'power4.out',
        }, '-=0.2');
        tl.to(obj.scale, {
            x: 1,
            y: 1,
            duration: 0.4,
            ease: 'elastic.out',
            onComplete() {
                resolve();
            },
        });
    });
}
function doDefend(obj, type) {
    return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.to(obj.rotation, {
            y: getRadian((type === ObjectType.Chicky) ? -90 : 90),
            ease: 'power4.out',
            duration: 0.75,
        });
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.15,
            delay: 0.2,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 0.9,
            y: 1.1,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1,
            y: 1,
            duration: 1,
            ease: 'elastic.out',
        });
        tl.to(obj.rotation, {
            y: 0,
            ease: 'power4.out',
            duration: 0.75,
            onComplete() {
                resolve();
            },
        });
    });
}
function doHeal(obj, type) {
    return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.to(obj.rotation, {
            y: getRadian((type === ObjectType.Chicky) ? 720 : -720),
            ease: 'power2.out',
            duration: 2,
        });
        tl.to(obj.position, {
            y: 1.5,
            ease: 'power2.out',
            duration: 1,
        }, '-=2');
        tl.to(obj.position, {
            y: 0,
            ease: 'power2.in',
            duration: 1,
        }, '-=1');
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 0.9,
            y: 1.1,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1,
            y: 1,
            duration: 1,
            ease: 'elastic.out',
            onComplete() {
                obj.rotation.y = 0;
                resolve();
            },
        });
    });
}
function doCommand(command, type) {
    let obj;
    if (type === ObjectType.Chicky) {
        obj = chicky;
    }
    else if (type === ObjectType.Ghost) {
        obj = ghost;
    }
    return new Promise(async (resolve) => {
        switch (command) {
            case 0:
                await doSkip(obj);
                break;
            case 1:
                await doDefend(obj, type);
                break;
            case 2:
                await doAttack(obj, type);
                break;
            case 3:
                await doHeal(obj, type);
                break;
        }
        resolve();
    });
}
function animateDefeat(type) {
    let obj;
    if (type === ObjectType.Chicky) {
        obj = chicky;
    }
    else if (type === ObjectType.Ghost) {
        obj = ghost;
    }
    return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.to(obj.scale, {
            x: 1.2,
            y: 0.8,
            duration: 0.15,
            ease: 'power4.out',
        });
        tl.to(obj.scale, {
            x: 1,
            y: 1,
            duration: 0.5,
            ease: 'elastic.out',
        });
        tl.to(obj.position, {
            y: 1.2,
            x: (type === ObjectType.Chicky) ? -2.5 : 2.5,
            duration: 0.3,
            ease: 'power4.out',
        });
        tl.to(obj.rotation, {
            z: getRadian((type === ObjectType.Chicky) ? 90 : -90),
            duration: 0.5,
            ease: 'power4.out',
        }, '-=0.3');
        tl.to(obj.position, {
            y: 0.9,
            duration: 0.5,
            ease: 'bounce.out',
            onComplete() {
                resolve();
            },
        }, '-=0.3');
    });
}
function doChangeFloor(callback) {
    return new Promise((resolve) => {
        let tl = new gsap.timeline();
        tl.to(stage.position, {
            x: -6,
            duration: 2,
        });
        tl.to(ghost.position, {
            x: -4,
            duration: 2,
        }, '-=2');
        tl.to(chicky.position, {
            y: 0.2,
            yoyo: true,
            ease: 'power2.out',
            repeat: 12,
            duration: 0.1,
        }, '-=2');
        tl.fromTo(chicky.rotation, {
            y: getRadian(5),
        }, {
            y: getRadian(-5),
            yoyo: true,
            ease: 'power2.inOut',
            repeat: 6,
            duration: 0.2,
            onComplete() {
                resolve();
            },
        }, '-=2');
    });
}
function repositionFloor() {
    return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.to(chicky.position, {
            x: -2,
            y: 0,
            duration: 0.1,
        });
        tl.to(chicky.rotation, {
            y: 0,
            z: 0,
            duration: 0.1,
        });
        tl.to(ghost.position, {
            x: 2,
            y: 0,
            duration: 0.1,
        });
        tl.to(ghost.rotation, {
            z: 0,
            duration: 0.1,
        });
        tl.to(stage.position, {
            x: 0,
            duration: 0.1,
            onComplete() {
                resolve();
            },
        });
    });
}
//////////////////////////////////////////////////
// Game Settings
async function create(callback) {
    setRenderer();
    if (IS_DEBUG) {
        scene.add(new THREE.CameraHelper(camera));
    }
    setLighting();
    await setChicky();
    await setGhost();
    await setStage();
    // await setDice();
    animateFloor(callback);
}
function update() {
}
function render() {
    if (performance.now() - renderTimeout > 1000 / FPS) {
        renderTimeout = performance.now();
        renderer.render(scene, camera);
    }
}
function loop() {
    requestAnimationFrame(loop);
    update();
    render();
}
//////////////////////////////////////////////////
// Initialization
async function initialize(gameCanvas, callback) {
    let fov = SCREEN[0].FOV;
    if (window.innerWidth > 525) {
        fov = SCREEN[1].FOV;
    }
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: gameCanvas,
        antialias: true,
        alpha: true,
    });
    await create(callback);
    loop();
}
//////////////////////////////////////////////////
// ReactJS Components
function CommandMenu(props) {
    const [item, setItem] = useState(null);
    useEffect(() => {
        setItem(null);
    }, [props.shown]);
    if (props.shown === false) {
        return null;
    }
    let menuClassName = 'command';
    if (item !== null) {
        menuClassName += ' selected';
    }
    return (React.createElement("div", { className: menuClassName, onAnimationEnd: (evt) => {
            if (evt.animationName === 'fade-out') {
                props.onSelect(item);
            }
        } }, props.items.map((i, k) => {
        let itemClassName = 'command-item';
        if (item === k) {
            itemClassName += ' selected';
        }
        if (props.allowed[k] === undefined) {
            itemClassName += ' disabled';
        }
        return (React.createElement("a", { href: "#", className: itemClassName, onClick: (evt) => {
                evt.preventDefault();
                if (props.allowed[k] === undefined) {
                    return;
                }
                if (item === null) {
                    setItem(k);
                }
            } }, i));
    })));
}
function DiceArea(props) {
    const [diceStyle, setDiceStyle] = useState({
        '--number': '-0vmin',
        '--rotation': '0deg',
    });
    const [diceValue, setDiceValue] = useState(null);
    useEffect(() => {
        if (props.shown === false) {
            return;
        }
        let diceOccurence = {
            count: 0,
            num: [],
            rotation: 0,
        };
        for (let i = 0; i < 20; i++) {
            diceOccurence.num[i] = random(1, 6);
        }
        gsap.fromTo(diceOccurence, {
            count: 0,
            rotation: 0,
        }, {
            count: diceOccurence.num.length - 1,
            rotation: 720,
            ease: 'power2.out',
            duration: 1.5,
            onUpdate() {
                let i = Math.floor(diceOccurence.count);
                let num = diceOccurence.num[i];
                setDiceStyle({
                    '--number': `${num * -50}vmin`,
                    '--rotation': `${diceOccurence.rotation}deg`,
                });
            },
            onComplete() {
                setTimeout(() => {
                    let value = diceOccurence.num.pop() + 1;
                    value = (value > 6) ? (value - 6) : value;
                    setDiceValue(value);
                }, 512);
            },
        });
    }, [props.shown]);
    if (props.shown === false) {
        return null;
    }
    let diceAreaStyle = 'dice-area';
    if (diceValue !== null) {
        diceAreaStyle += ' hidden';
    }
    return (React.createElement("div", { className: diceAreaStyle, onAnimationEnd: (evt) => {
            if (evt.animationName === 'fade-out') {
                setDiceStyle({
                    '--number': '-0vmin',
                    '--rotation': '0deg',
                });
                setDiceValue(null);
                props.onSelect(diceValue);
            }
        } },
        React.createElement("div", { className: "dice", style: diceStyle })));
}
function Fade(props) {
    if (props.type === FadeType.Hidden) {
        return null;
    }
    let fadeClassName = 'fade';
    if (props.type === FadeType.In) {
        fadeClassName += ' fade-in';
    }
    else if (props.type === FadeType.Out) {
        fadeClassName += ' fade-out';
    }
    return (React.createElement("div", { className: fadeClassName, onAnimationEnd: (evt) => {
            props.onFadeEnd(evt.animationName);
        } }));
}
function CommandEffect(props) {
    if (props.shown === false) {
        return null;
    }
    let imageUrl = `url(${ASSETS_PATH}/${props.link})`;
    return (React.createElement("div", { className: "effect", onAnimationEnd: (evt) => {
            if (evt.animationName === 'fade-out') {
                props.onEnded();
            }
        } },
        React.createElement("div", { className: "effect-image", style: { '--image-url': imageUrl } })));
}
function ChickyAdventure() {
    const [turn, setTurn] = useState(ObjectType.Chicky);
    const [life, setLife] = useState(DEFAULT_LIFE);
    const [enemyLife, setEnemyLife] = useState(DEFAULT_ENEMY_LIFE);
    const [defend, setDefend] = useState(0);
    const [enemyDefend, setEnemyDefend] = useState(0);
    const [floor, setFloor] = useState(1);
    const [diceCmdShown, setDiceCmdShown] = useState(false);
    const [diceShown, setDiceShown] = useState(false);
    const [diceValue, setDiceValue] = useState(null);
    const [allowedCommand, setAllowedCommand] = useState([]);
    const [fadeType, setFadeType] = useState(FadeType.Hidden);
    const [floorType, setFloorType] = useState(FloorType.None);
    const [showGameOver, setShowGameOver] = useState(false);
    const [showDefendEffect, setShowDefendEffect] = useState(false);
    const [showAttackEffect, setShowAttackEffect] = useState(false);
    const [showHealEffect, setShowHealEffect] = useState(false);
    let canvasElm = useRef(null);
    useEffect(() => {
        initialize(canvasElm.current, () => {
            setDiceCmdShown(true);
        });
        window.addEventListener('resize', (evt) => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            setScreenSettings();
        });
    }, []);
    useEffect(() => {
        if (diceValue === null) {
            return;
        }
        let tmpAllowedCommand = [];
        tmpAllowedCommand = [...tmpAllowedCommand, 0];
        if (diceValue >= 2) {
            tmpAllowedCommand = [...tmpAllowedCommand, 1];
        }
        if (diceValue >= 3) {
            tmpAllowedCommand = [...tmpAllowedCommand, 2];
        }
        if (diceValue >= 5) {
            tmpAllowedCommand = [...tmpAllowedCommand, 3];
        }
        setAllowedCommand(tmpAllowedCommand);
    }, [diceValue]);
    useEffect(() => {
        if (turn === ObjectType.Chicky) {
            return;
        }
        setDiceShown(true);
    }, [turn]);
    const doEnemyTurn = async (value) => {
        if (value < 3) {
            await doCommand(0, ObjectType.Ghost);
        }
        else {
            setShowAttackEffect(true);
            await doCommand(2, ObjectType.Ghost);
            let damage = value - defend;
            damage = (damage < 0) ? 0 : damage;
            setDefend(0);
            if (life - damage <= 0) {
                setLife(0);
                await animateDefeat(ObjectType.Chicky);
                setShowGameOver(true);
                return;
            }
            else {
                setLife(life - damage);
            }
        }
        setTurn(ObjectType.Chicky);
        setDiceCmdShown(true);
    };
    const doChickyTurn = async (value) => {
        switch (value) {
            case 1:
                setShowDefendEffect(true);
                break;
            case 2:
                setShowAttackEffect(true);
                break;
            case 3:
                setShowHealEffect(true);
                break;
        }
        await doCommand(value, ObjectType.Chicky);
        switch (value) {
            case 1:
                setDefend(diceValue);
                break;
            case 2:
                let damage = diceValue - enemyDefend;
                damage = (damage < 0) ? 0 : damage;
                setEnemyDefend(0);
                if (enemyLife - damage <= 0) {
                    setEnemyLife(0);
                    await animateDefeat(ObjectType.Ghost);
                    changeFloor();
                    return;
                }
                else {
                    setEnemyLife(enemyLife - damage);
                }
                break;
            case 3:
                setLife(life + diceValue);
                break;
        }
        setTurn(ObjectType.Ghost);
    };
    const changeFloor = () => {
        setTimeout(async () => {
            await doChangeFloor();
            setFloorType(FloorType.Next);
            setFadeType(FadeType.In);
        }, 512);
    };
    const changeFloorFade = async (fadeType) => {
        if (fadeType === 'fade-in') {
            if (floorType === FloorType.Reset) {
                setFloor(1);
                setLife(DEFAULT_LIFE);
                setEnemyLife(DEFAULT_ENEMY_LIFE);
            }
            else if (floorType === FloorType.Next) {
                setFloor(floor + 1);
                setEnemyLife(DEFAULT_ENEMY_LIFE + Math.floor((floor / 8) * 2));
            }
            await repositionFloor();
            setFadeType(FadeType.Out);
        }
        else if (fadeType === 'fade-out') {
            setFadeType(FadeType.Hidden);
            setFloorType(FloorType.None);
            setDiceCmdShown(true);
        }
    };
    return (React.createElement("div", { className: "container" },
        React.createElement("canvas", { className: "game-canvas", ref: canvasElm }),
        React.createElement("div", { className: "hud" },
            React.createElement("span", { className: "life" },
                "HP:",
                life),
            React.createElement("span", { className: "enemy-life" },
                "Enemy:",
                enemyLife),
            React.createElement("span", { className: "floor" },
                "Floor:",
                floor)),
        React.createElement(CommandMenu, { items: ['Roll the dice'], allowed: [0], shown: diceCmdShown, onSelect: (item) => {
                setDiceCmdShown(false);
                setDiceShown(true);
            } }),
        React.createElement(CommandMenu, { items: COMMANDS, allowed: allowedCommand, shown: diceValue !== null, onSelect: (item) => {
                setDiceValue(null);
                doChickyTurn(item);
            } }),
        React.createElement(CommandMenu, { items: ['Try Again!'], allowed: [0], shown: showGameOver, onSelect: (item) => {
                setFloorType(FloorType.Reset);
                setFadeType(FadeType.In);
                setShowGameOver(false);
            } }),
        React.createElement(CommandEffect, { shown: showDefendEffect, link: "chicky-dice-shield.png", onEnded: () => {
                setShowDefendEffect(false);
            } }),
        React.createElement(CommandEffect, { shown: showAttackEffect, link: "chicky-dice-sword.png", onEnded: () => {
                setShowAttackEffect(false);
            } }),
        React.createElement(CommandEffect, { shown: showHealEffect, link: "chicky-dice-heal.png", onEnded: () => {
                setShowHealEffect(false);
            } }),
        React.createElement(DiceArea, { shown: diceShown, onSelect: (value) => {
                setDiceShown(false);
                if (IS_DEBUG === true) {
                    value = 6;
                }
                if (turn === ObjectType.Chicky) {
                    setDiceValue(value);
                }
                else {
                    doEnemyTurn(value);
                }
            } }),
        React.createElement(Fade, { type: fadeType, onFadeEnd: (type) => {
                changeFloorFade(type);
            } })));
}
ReactDOM.render(React.createElement(ChickyAdventure, null), document.querySelector('#app'));