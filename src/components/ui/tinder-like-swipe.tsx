import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SwipeableCardStackProps {
    images: string[];
    borderRadius?: number;
    showInnerShadows?: boolean;
    greenShadowColor?: string;
    redShadowColor?: string;
    innerStrokeColor?: string;
    shadowSize?: string;
    shadowBlur?: string;
    rightIcon?: string | null;
    leftIcon?: string | null;
    autoSwipeInterval?: number;
}

export function SwipeableCardStack({
    images = [],
    borderRadius = 16,
    showInnerShadows = true,
    greenShadowColor = "rgba(201, 161, 74, 0.4)", // Gold themed
    redShadowColor = "rgba(201, 161, 74, 0.4)",   // Gold themed
    innerStrokeColor = "rgba(201, 161, 74, 0.1)",
    shadowSize = "0 20px 50px",
    shadowBlur = "rgba(0, 0, 0, 0.5)",
    rightIcon = null,
    leftIcon = null,
    autoSwipeInterval = 3000,
}: SwipeableCardStackProps) {
    const [cards, setCards] = React.useState([...images]);
    const [dragDirections, setDragDirections] = React.useState<Record<number, "left" | "right" | null>>({});
    const swipeThreshold = 100;
    const autoSwipeTimer = React.useRef<NodeJS.Timeout | null>(null);

    const handleSwipe = React.useCallback((index: number, direction: "left" | "right") => {
        setDragDirections((prev) => ({ ...prev, [index]: direction }));
        setTimeout(() => {
            setCards((prevCards) => prevCards.filter((_, i) => i !== index));
        }, 300);
    }, []);

    // Automatic swiping logic
    React.useEffect(() => {
        if (cards.length > 0 && autoSwipeInterval > 0) {
            autoSwipeTimer.current = setInterval(() => {
                const topCardIndex = cards.length - 1;
                // Alternate directions for flair
                const direction = Math.random() > 0.5 ? "right" : "left";
                handleSwipe(topCardIndex, direction);
            }, autoSwipeInterval);
        }

        return () => {
            if (autoSwipeTimer.current) clearInterval(autoSwipeTimer.current);
        };
    }, [cards.length, autoSwipeInterval, handleSwipe]);

    // Reload cards when empty
    React.useEffect(() => {
        if (images.length > 0 && cards.length === 0) {
            const timer = setTimeout(() => {
                setCards([...images]);
                setDragDirections({});
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [cards.length, images]);

    const handleDrag = (event: any, info: any, index: number) => {
        // Clear auto-swipe when user starts dragging
        if (autoSwipeTimer.current) clearInterval(autoSwipeTimer.current);
        setDragDirections((prev) => ({ ...prev, [index]: info.offset.x > 0 ? "right" : "left" }));
    };

    const handleDragEnd = (event: any, info: any, index: number) => {
        if (Math.abs(info.offset.x) > swipeThreshold) {
            handleSwipe(index, dragDirections[index] || "left");
        } else {
            setDragDirections((prev) => ({ ...prev, [index]: null }));
            // Resume auto-swipe after a delay
            if (autoSwipeInterval > 0) {
                autoSwipeTimer.current = setInterval(() => {
                    const topCardIndex = cards.length - 1;
                    const direction = Math.random() > 0.5 ? "right" : "left";
                    handleSwipe(topCardIndex, direction);
                }, autoSwipeInterval);
            }
        }
    };

    return (
        <div className="relative w-full h-full perspective-1000">
            <AnimatePresence>
                {cards.map((image, index) => {
                    const isTopCard = index === cards.length - 1;
                    const direction = dragDirections[index];
                    return (
                        <motion.div
                            key={image + index}
                            drag={isTopCard ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.6}
                            onDrag={(e, i) => handleDrag(e, i, index)}
                            onDragEnd={(e, i) => handleDragEnd(e, i, index)}
                            custom={{ direction }}
                            initial={{ scale: 0.9, y: 30, opacity: 0, rotate: -5 }}
                            animate={{ 
                                scale: isTopCard ? 1 : 0.9 + (index * 0.02), 
                                y: isTopCard ? 0 : -index * 10, 
                                opacity: 1, 
                                rotate: isTopCard ? 0 : (index % 2 === 0 ? 2 : -2),
                                transition: { duration: 0.5, ease: "easeOut" } 
                            }}
                            exit="exit"
                            variants={{ 
                                exit: (custom) => ({ 
                                    x: (custom?.direction || "left") === "right" ? 500 : -500, 
                                    rotate: (custom?.direction || "left") === "right" ? 45 : -45, 
                                    opacity: 0, 
                                    transition: { duration: 0.4, ease: "easeIn" } 
                                }) 
                            }}
                            style={{ 
                                position: "absolute", 
                                width: "100%", 
                                height: "100%", 
                                backgroundImage: `url(${image})`, 
                                backgroundSize: "cover", 
                                backgroundPosition: "center", 
                                borderRadius, 
                                boxShadow: `inset 0 0 0 1px ${innerStrokeColor}, ${shadowSize} ${shadowBlur}`, 
                                cursor: isTopCard ? "grab" : "default" 
                            }}
                        >
                            {isTopCard && showInnerShadows && (
                                <>
                                    <div style={{ 
                                        position: "absolute", 
                                        top: 0, 
                                        left: 0, 
                                        width: "100%", 
                                        height: "100%", 
                                        borderRadius, 
                                        pointerEvents: "none", 
                                        boxShadow: direction === "right" 
                                            ? `inset 0px -100px 80px ${greenShadowColor}` 
                                            : direction === "left" 
                                                ? `inset 0px -100px 80px ${redShadowColor}` 
                                                : "none", 
                                        transition: "box-shadow 0.3s ease-out" 
                                    }}/>
                                    {direction && (rightIcon || leftIcon) && (
                                        <div style={{ 
                                            position: "absolute", 
                                            top: "50%", 
                                            left: "50%", 
                                            transform: "translate(-50%, -50%)", 
                                            opacity: 1 
                                        }}>
                                            <img 
                                                src={direction === "right" ? (rightIcon as string) : (leftIcon as string)} 
                                                alt="" 
                                                style={{ width: "100px", height: "100px", objectFit: "contain" }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
