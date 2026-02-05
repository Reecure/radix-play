export const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
};

export const lerpAngle = (start: number, end: number, t: number) => {
    const d = end - start;
    const delta = ((d + 180) % 360) - 180;
    return start + delta * t;
};