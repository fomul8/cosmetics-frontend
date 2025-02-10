const randomColor = () => {
    const hue = Math.floor(Math.random() * 1360);
    return `hsl(${hue}, 100%, 80%)`;
}

export default randomColor;