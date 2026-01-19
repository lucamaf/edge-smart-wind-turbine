/**
 * turbine-controller.js
 * * This script exposes a global API to control the wind turbine animation.
 */

// Get references to the DOM elements we need to interact with.
const turbineBlades = document.getElementById('turbine-blades');
const speedDisplay = document.getElementById('speed-display');
const speedSlider = document.getElementById('speed-slider');
const powerDisplay = document.getElementById('power-display'); // New element for power


/**
 * Sets the rotational speed of the turbine. This function is the exposed API.
 * @param {number} rpm - The desired speed in Revolutions Per Minute.
 */
function setWindSpeed(kmh) {
    // Ensure the input is a valid number.
    const speed = Number(kmh);
    if (isNaN(speed) || speed < 0) {
        console.error("Invalid speed provided. Please use a non-negative number.");
        return;
    }

    // Update the text display on the page.
    if (speedDisplay) {
        speedDisplay.textContent = speed;
    }
    
    // If the speed is 0 or less, pause the animation.
    if (speed <= 0) {
        turbineBlades.style.animationPlayState = 'paused';
    } else {
        // Calculate the duration for one full 360-degree rotation.
        // If speed is in RPM (Revolutions Per Minute), then the time (duration)
        // for one revolution in seconds is 60 / RPM.
        // If we use wind speed in KM/h then we would apply TSR ratio
        // The tip speed ratio (TSR) (λ) is the key ratio between wind speed and wind turbine rotational speed. 
        // It's the ratio of the blade tip's speed to the wind speed. 
        // TSR is crucial for determining how efficiently a turbine captures wind energy, 
        // with optimal values typically between 7 and 9 for modern designs
        // TSR = (rotor speed * rotor radius) / wind speed
        //const duration = 60 / speed; // e.g., 30 RPM -> 2 seconds per revolution
        const duration = 60 / (speed * 3);

        // Apply the new duration to the CSS animation.
        turbineBlades.style.animationDuration = `${duration}s`;
        
        // Ensure the animation is running.
        turbineBlades.style.animationPlayState = 'running';
    }

    // --- Power Calculation ---
    // Use the ratio of 23 to calculate power in kW.
    const power = speed * 23;
    if (powerDisplay) {
        // Display the power, formatted to one decimal place for a cleaner look.
        powerDisplay.textContent = power.toFixed(0);
    }
}

// --- Event Listener for the Demo Slider ---
if (speedSlider) {
    // Update the turbine speed whenever the slider value changes.
    speedSlider.addEventListener('input', (event) => {
        setWindSpeed(event.target.value);
    });
}


// --- API EXPOSURE ---
// Attach the function to the global `window` object to make it accessible 
// from other scripts or the browser's developer console.
// You can now open the console and type `setTurbineSpeed(50)` to test it.
window.setWindSpeed = setWindSpeed;


// --- INITIALIZATION ---
// Set the initial speed based on the slider's default value when the page loads.
document.addEventListener('DOMContentLoaded', () => {
    if (speedSlider) {
        setWindSpeed(speedSlider.value);
    }
});
