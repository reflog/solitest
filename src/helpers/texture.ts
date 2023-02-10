export function fixTex(t: THREE.Texture) {
    t.center.set(0.5, 0.5)
    t.rotation = Math.PI;
}