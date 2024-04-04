import React, {useCallback, useEffect, useRef, useState} from 'react';
import './css/Main.css';
import dropper from "../assets/IconColorPicker.svg";

interface MouseType {
    x?: number,
    y?: number
}

export const Main: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState<MouseType>({x: undefined, y: undefined});
    const [color, setColor] = useState<string>('#fff')
    const [fixedColor, setFixedColor] = useState<string>()
    const [toggleDropper, setToggleDropper] = useState<boolean>()

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = './beach.jpg';


        const draw: () => void = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

            if (toggleDropper && typeof mousePosition.x === 'number' && typeof mousePosition.y === 'number') {
                const radius: number = 60;
                const scale: number = 0.1;

                ctx.strokeStyle = 'gray'
                ctx.beginPath();
                ctx.arc(mousePosition.x, mousePosition.y, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = color;
                ctx.lineWidth = 15
                ctx.stroke();
                ctx.clip();
                ctx.beginPath();

                ctx.drawImage(
                    canvas,
                    mousePosition.x - radius * scale * 2,
                    mousePosition.y - radius * scale * 2,
                    radius * 2 * scale,
                    radius * 2 * scale,
                    mousePosition.x - radius,
                    mousePosition.y - radius,
                    radius * 2,
                    radius * 2
                );
                ctx.font = "32px"
                ctx.fillStyle = 'black'
                ctx.textBaseline = 'hanging'
                ctx.textAlign = 'center'
                ctx.fillText(color, mousePosition.x, mousePosition.y)
            }
        };

        image.onload = () => {
            canvas.width = 900;
            canvas.height = 500;
            draw();
        };

    }, [mousePosition, toggleDropper]);


    const handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void = (e) => {
        if (!toggleDropper) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({x, y});

        const pixelData = ctx.getImageData(x, y, 1, 1).data;

        if ((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)) {
            console.warn('Transparent color detected, cannot be converted to HEX');
        }
        const hex = "#" + ("000000" + getHexValue(pixelData[0], pixelData[1], pixelData[2])).slice(-6);

        setColor(hex);
    };


    const getHexValue = useCallback((r: number, g: number, b: number) => {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color";
        return ((r << 16) | (g << 8) | b).toString(16);
    }, [])

    const enableDropper = () => {
        setToggleDropper(!toggleDropper)
    }

    const onClickHandler = () => {
        if (toggleDropper) {
            setFixedColor(color)
        }
    }

    return (
        <div className='container'>
            <div className="dropperWrapper">
                <div className='imageWrapper'>
                    <img className="dropperIcon" width='16' height='16' src={dropper} alt="Dropper"
                         onClick={enableDropper}/>
                </div>
                <div className='fixedColor'>
                    {fixedColor}
                </div>
            </div>
            <div className='canvasWrapper'>
                <canvas
                    onMouseMove={handleMouseMove}
                    onClick={onClickHandler}
                    className={`canvas ${toggleDropper && 'hideCursor'}`}
                    ref={canvasRef}/>
            </div>
        </div>)
}


