/*
    This function generates a random color using the HSL color model.
    Color is soft and not too bright
 */
const randomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 10) + 70;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default randomColor;
