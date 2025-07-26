document.addEventListener('DOMContentLoaded', function() {
    // Fetch the company images from the JSON file
    fetch('indeximg.json')
        .then(response => response.json())
        .then(data => {
            const companyImages = data.company.filter(item => item.src); // Filter out empty src
            if (companyImages.length > 0) {
                initCompanySlider(companyImages);
            }
        })
        .catch(error => {
            console.error('Error loading company images:', error);
            // Fallback to placeholder images if JSON fails to load
            const fallbackImages = [
                { src: "https://via.placeholder.com/150x60?text=Company+1" },
                { src: "https://via.placeholder.com/150x60?text=Company+2" },
                { src: "https://via.placeholder.com/150x60?text=Company+3" },
                { src: "https://via.placeholder.com/150x60?text=Company+4" }
            ];
            initCompanySlider(fallbackImages);
        });

    function initCompanySlider(images) {
        const placementSection = document.querySelector('.bg-white.py-12'); // Placement Partner Section
        if (!placementSection) return;

        const logoContainer = placementSection.querySelector('.grid.grid-cols-2.gap-8.md\\:grid-cols-4.mt-8');
        if (!logoContainer) return;

        // Clear existing placeholder content
        logoContainer.innerHTML = '';
        logoContainer.classList.remove('grid', 'grid-cols-2', 'md:grid-cols-4', 'gap-8');
        logoContainer.classList.add('w-full', 'overflow-hidden', 'py-4');

        // Create slider container
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'relative w-full overflow-hidden';
        sliderContainer.style.height = '80px';

        // Create slider track
        const sliderTrack = document.createElement('div');
        sliderTrack.className = 'flex absolute top-0 left-0 h-full items-center';
        sliderTrack.style.animation = 'slide 30s linear infinite';
        sliderTrack.style.width = `calc(${images.length * 200}px)`;

        // Duplicate images for seamless looping
        const doubledImages = [...images, ...images];

        // Add images to slider track
        doubledImages.forEach((item, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'flex-shrink-0 mx-8';
            imgDiv.style.width = '200px'; // Increased width for better visibility

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = `Company ${index + 1}`;
            img.className = 'h-12 object-contain max-h-full max-w-full';
            img.style.opacity = '1'; // Full visibility
            img.style.transition = 'all 0.3s ease';

            // Add hover effects - removed grayscale filter
            img.addEventListener('mouseenter', () => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1.1)';
            });

            img.addEventListener('mouseleave', () => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });

            imgDiv.appendChild(img);
            sliderTrack.appendChild(imgDiv);
        });

        sliderContainer.appendChild(sliderTrack);
        logoContainer.appendChild(sliderContainer);

        // Add CSS animation for sliding
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slide {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }
        `;
        document.head.appendChild(style);

        // Adjust the slider track width when window resizes
        function adjustSliderTrack() {
            const logoWidth = 200; // Increased width
            const logoMargin = 32; // mx-8 = 2rem = 32px
            const totalWidth = (logoWidth + logoMargin) * images.length;
            sliderTrack.style.width = `calc(${totalWidth}px)`;
        }

        window.addEventListener('resize', adjustSliderTrack);
        adjustSliderTrack();
    }
});