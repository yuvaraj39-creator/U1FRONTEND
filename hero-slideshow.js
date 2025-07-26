// hero-slideshow.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the hero image element
    const heroImage = document.getElementById('hero-image');
    
    // Fetch the JSON data
    fetch('indeximg.json')
        .then(response => response.json())
        .then(data => {
            const homeImages = data.home;
            let currentIndex = 0;
            
            // Function to change the image
            function changeHeroImage() {
                // Fade out the current image
                heroImage.style.opacity = '0';
                heroImage.style.transition = 'opacity 0.5s ease';
                
                // After fade out completes, change the image and fade back in
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % homeImages.length;
                    heroImage.src = homeImages[currentIndex].src;
                    heroImage.alt = homeImages[currentIndex].image;
                    
                    // Fade in the new image
                    setTimeout(() => {
                        heroImage.style.opacity = '1';
                    }, 50);
                }, 500);
            }
            
            // Change image every 5 seconds
            setInterval(changeHeroImage, 5000);
            
            // Preload all images
            homeImages.forEach(img => {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            });
        })
        .catch(error => {
            console.error('Error loading image data:', error);
        });
});