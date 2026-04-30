import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineAnimation() {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
            {/* Show static image if loading or error */}
            {(isLoading || hasError) && (
                <img 
                    src="/splinestatic.png" 
                    alt="3D Scene Fallback" 
                    style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }} 
                />
            )}
            
            {!hasError && (
                <Spline 
                    scene="https://prod.spline.design/goi4ue6SnFb6IVdc/scene.splinecode" 
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        opacity: isLoading ? 0 : 1,
                        transition: "opacity 0.5s ease-in-out"
                    }}
                />
            )}
        </div>
    );
}