import React from 'react';
import styles from './style.scss';
import * as Rx from 'rxjs/Rx';
import * as THREE from 'three';
console.log(Rx);
console.log(THREE);
export class RotatingSquares3d extends React.Component {
    componentDidMount() {
        this.mousePosition = new Rx.Subject();

        this.scene = new THREE.Scene({alpha: true});
        this.camera = new THREE.PerspectiveCamera(25, this.container.offsetWidth / this.container.offsetHeight, 0.1, 3000);
        this.mouse = new THREE.Vector2();

        this.raycaster = new THREE.Raycaster();

        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);

        this.cube = this.createMeshes();


        this.scene.add(this.cube);


        let light = new THREE.AmbientLight(0xeeeeee); // soft white light
        this.scene.add(light);

        let dirLight = new THREE.DirectionalLight(0xffffff, 0.1);
        dirLight.position.set(100, 100, 50);
        this.scene.add(dirLight);


        this.camera.position.z = 5;

        this.container.appendChild(this.renderer.domElement);

        this.handleMouseMove();

        this.children = this.flattenTree({
            children: this.scene.children
        });

        this.threeRender();
    }

    componentWillUnmount() {
        debugger;
        this.subscription.unsubscribe();
        this.mousePosition.complete();
    }


    createMeshes() {
        let group = new THREE.Group();

        let mainPlane = new THREE.PlaneGeometry(0.8, 0.8, 1);
        let mainMaterial = new THREE.MeshLambertMaterial({color: 0xff5c57, shading: THREE.SmoothShading});

        let main = new THREE.Mesh(mainPlane, mainMaterial);
        main.position.x = -0.4;
        main.oldZ = 1;

        main.ZPosition = new Rx.BehaviorSubject(main.oldZ);
        this.tween(main.ZPosition, this.easeInOutQuad)
            .subscribe(value => main.position.z = value);


        let sec1Plane = new THREE.PlaneGeometry(0.4, 0.4, 1);
        let sec1Material = new THREE.MeshLambertMaterial({color: 0xd6dfe2, shading: THREE.SmoothShading});

        let sec1 = new THREE.Mesh(sec1Plane, sec1Material);
        sec1.position.x = 0.2;
        sec1.position.y = 0.1;
        sec1.oldZ = 0.85;

        sec1.ZPosition = new Rx.BehaviorSubject(sec1.oldZ);
        this.tween(sec1.ZPosition, this.easeInOutQuad)
            .subscribe(value => sec1.position.z = value);

        let sec2Plane = new THREE.PlaneGeometry(0.4, 0.4, 1);
        let sec2Material = new THREE.MeshLambertMaterial({color: 0xeeeeee, shading: THREE.SmoothShading});

        let sec2 = new THREE.Mesh(sec2Plane, sec2Material);
        sec2.position.x = 0.2;
        sec2.position.y = -0.3;
        sec2.oldZ = 0.75;

        sec2.ZPosition = new Rx.BehaviorSubject(sec2.oldZ);
        this.tween(sec2.ZPosition, this.easeInOutQuad)
            .subscribe(value => sec2.position.z = value);

        group.add(main);
        group.add(sec1);
        group.add(sec2);

        return group;
    }

    mousedownHandle = (event) => {
        this.handleIntersects();
        this.trackMouse(event);
    };

    mousemoveHandle = (event) => {
        this.trackMouse(event);
    };

    trackMouse = (event) => {
        let halfX = this.container.offsetWidth / 2;
        let halfY = this.container.offsetHeight / 2;

        this.mouse.x = ( (event.x - this.container.offsetLeft) / this.container.offsetWidth ) * 2 - 1;
        this.mouse.y = - ( (event.y - this.container.offsetTop)  / this.container.offsetHeight ) * 2 + 1;

        this.mousePosition.next({
            x: (event.x - halfX) / halfX,
            y: (event.y - halfY) / halfY
        });
    };

    handleMouseMove() {
        window.addEventListener('mousedown', this.mousedownHandle);
        window.addEventListener('mousemove', this.mousemoveHandle);

        this.mousePosition.last().subscribe((event) => {
            window.removeEventListener('mousedown', this.mousedownHandle);
            window.removeEventListener('mousemove', this.mousemoveHandle);
        });

        this.subscription = this.mousePosition.subscribe(event => {

            this.cube.rotation.y = event.x * 0.5;
            let theta = -1;
            let radius = 5;

            // this.camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta * event.x * 45) );
            // this.camera.position.y = radius * Math.sin( THREE.Math.degToRad( -theta * event.y * 45) );

            // this.camera.lookAt( this.scene.position );
        });

    }

    flattenTree(node) {
        if (!node.children.length) {
            if (node.type !== 'Mesh') {
                return [];
            }
            return [node];
        }
        return node.children.reduce((acc, node) => {
            return [...acc, ...this.flattenTree(node)];
        }, []);
    }

    tween(stream, easeFn) {
        return stream
            .throttleTime(10)
            .distinctUntilChanged()
            .pairwise()
            .flatMap(([prev, curr]) => {
                let delta = curr - prev;
                let steps = 50;
                return Rx.Observable.interval(10)
                    .take(steps)
                    .map(count => easeFn(count/steps))
                    .map(progress => prev + (progress * delta))
            })
            .do(value => console.log(value));
    }


    easeInOutQuad (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }

    handleIntersects() {

        this.raycaster.setFromCamera(this.mouse, this.camera);

        let intersects = this.raycaster.intersectObjects(this.children);

        console.log(intersects);
        let first = intersects[0] && intersects[0].object;

        this.children
            .filter(child => child !== first)
            .forEach((object) => {
                object.ZPosition.next(object.oldZ);
            });

        if (first) {
            // first.scale.set(1.1,1.1,1.1);

            if (first.ZPosition) {
                first.ZPosition.next(1.5);
            }
        }

    }

    threeRender = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.threeRender);
    };

    render() {


        return (
            <article className={styles.RotatingSquares3dContainer}
                     ref={(container) => this.container = container}>
            </article>
        )
    }
}
