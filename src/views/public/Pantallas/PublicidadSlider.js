import { useState, useEffect } from "react";
import "./PublicidadSlider.css";

const PublicidadSlider = ({ items }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (items.length !== 0) {
            const currentItem = items[index];
            const duration = currentItem.type === "video" ? currentItem.duration * 1000 : 4000;

            const timer = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % items.length);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [index, items]);

    if (items.length === 0) {
        return <>No hay publicidad</>
    }
    return (
        <div className="slider-container">
            {items[index].type === "image" ? (
                <img src={items[index].src} alt="Publicidad" className="slider-image" />
            ) : (
                <video src={items[index].src} className="slider-video" autoPlay muted onEnded={() => setIndex((prevIndex) => (prevIndex + 1) % items.length)} />
            )}
        </div>
    );
};

export default PublicidadSlider;
