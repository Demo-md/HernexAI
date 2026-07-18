export interface IntroSignalScene {
  setIntensity: (value: number) => void;
  destroy: () => void;
}

export async function createIntroSignalScene(canvas: HTMLCanvasElement, isMobile: boolean): Promise<IntroSignalScene> {
  const THREE = await import("three");
  const pointCount = isMobile ? 14 : 24;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20);
  camera.position.z = 5;
  const field = new THREE.Group();
  scene.add(field);

  const positions = new Float32Array(pointCount * 3);
  for (let index = 0; index < pointCount; index += 1) {
    const angle = index * 2.399963229728653;
    const radius = 0.42 + (index % 7) * 0.17;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = Math.sin(angle) * radius * 0.68;
    positions[index * 3 + 2] = ((index % 5) - 2) * 0.12;
  }
  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pointsMaterial = new THREE.PointsMaterial({ color: 0xf5a623, size: isMobile ? 0.022 : 0.018, transparent: true, opacity: 0.18, depthWrite: false });
  field.add(new THREE.Points(pointsGeometry, pointsMaterial));

  const linePositions = new Float32Array((pointCount - 1) * 6);
  for (let index = 0; index < pointCount - 1; index += 1) {
    linePositions.set(positions.slice(index * 3, index * 3 + 3), index * 6);
    linePositions.set(positions.slice((index + 1) * 3, (index + 1) * 3 + 3), index * 6 + 3);
  }
  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const linesMaterial = new THREE.LineBasicMaterial({ color: 0xaab7d4, transparent: true, opacity: 0.08 });
  field.add(new THREE.LineSegments(linesGeometry, linesMaterial));

  let frame = 0;
  let alive = true;
  let intensity = 0.16;
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const render = (time: number) => {
    if (!alive) return;
    field.rotation.z = time * 0.000055;
    field.scale.setScalar(0.92 + intensity * 0.14 + Math.sin(time * 0.001) * 0.01);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  const visibility = () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else if (alive) frame = requestAnimationFrame(render);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  frame = requestAnimationFrame(render);

  return {
    setIntensity(value) {
      intensity = value;
      pointsMaterial.opacity = 0.1 + value * 0.34;
      linesMaterial.opacity = 0.04 + value * 0.14;
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      pointsGeometry.dispose();
      linesGeometry.dispose();
      pointsMaterial.dispose();
      linesMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
