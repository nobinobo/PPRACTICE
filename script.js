// ThingSpeak API URL with your channel ID and API key
const THINGSPEAK_API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.thingspeak.com/channels/2875425/fields/2.json?api_key=P2D675KBE0ZCBLVF&results=1";

// Function to fetch the water level data from ThingSpeak
async function fetchWaterLevel() {
  try {
    const response = await fetch(THINGSPEAK_API_URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Assuming the most recent data is in the first entry
    let waterLevel = parseFloat(data.feeds[0].field2);

    // Subtract 34.46 from the fetched water level
    waterLevel = waterLevel;

    // If the resulting value is negative, set it to 0
    if (waterLevel < 0) {
      waterLevel = 0;
    }

    // Display the adjusted water level on the page
    document.getElementById("water-level").textContent = `Current Water Level: ${waterLevel.toFixed(2)} cm`;

    const alarmSound = document.getElementById("alarm-sound");

    // Trigger the alarm if the adjusted water level is 13 or above
    if (waterLevel >= 30) {
      document.getElementById("alarm").style.display = "block";
      alarmSound.play(); // Play the alarm sound
    } else {
      document.getElementById("alarm").style.display = "none";
      alarmSound.pause(); // Stop the sound if the water level is below 13
      alarmSound.currentTime = 0; // Reset sound to the beginning
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("water-level").textContent = "Error fetching data.";
  }
}

// Fetch water level data every 10 seconds
setInterval(fetchWaterLevel, 10000);

// Initial fetch when the page loads
fetchWaterLevel();
