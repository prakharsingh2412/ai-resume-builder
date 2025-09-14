import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AtsScanner = ({ scanResult }) => {
  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    // Load HR character model
    const loader = new GLTFLoader();
    loader.load('/models/hr-character.glb', (gltf) => {
      modelRef.current = gltf.scene;
      scene.add(gltf.scene);
      gltf.scene.position.set(0, -1, -3);
      gltf.scene.rotation.y = Math.PI / 4;
      setLoading(false);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-lg rounded-xl m-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">
        ATS Score Analysis
      </h2>
      
      <div ref={containerRef} className="w-[300px] h-[300px] mb-6" />
      
      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      ) : (
        <div className="relative inline-flex">
          <div 
            className="relative w-20 h-20 rounded-full"
            style={{
              background: `conic-gradient(${
                scanResult.score >= 70 ? '#22c55e' : '#f59e0b'
              } ${scanResult.score}%, transparent 0)`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-200">
                {Math.round(scanResult.score)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {scanResult.feedback && (
        <p className="mt-4 text-center text-gray-400 text-sm">
          {scanResult.feedback}
        </p>
      )}
    </div>
  );
};

export default AtsScanner;