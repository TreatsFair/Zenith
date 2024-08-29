document.addEventListener("DOMContentLoaded", () => {
    const tracks = document.querySelectorAll(".image-container");
    
    tracks.forEach(track => {
        let mouseDownAt = 0;
        let prevPercentage = 0;

        track.addEventListener("mousedown", e => {
            mouseDownAt = e.clientX;
        });

        window.addEventListener("mouseup", () => {
            mouseDownAt = 0;
            prevPercentage = parseFloat(track.dataset.percentage || "0");
        });

        window.addEventListener("mousemove", e => {
            if (mouseDownAt === 0) return;

            const mouseDelta = parseFloat(mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;
            
            const percentage = (mouseDelta / maxDelta) * -100;
            let nextPercentage = prevPercentage + percentage;

            nextPercentage = Math.min(nextPercentage, 0);
            nextPercentage = Math.max(nextPercentage, -100);
            
            track.dataset.percentage = nextPercentage;

            for (const image of track.getElementsByTagName("img")) {
                image.style.transform = `translateX(${nextPercentage}%)`;
            }
        });
    });
});