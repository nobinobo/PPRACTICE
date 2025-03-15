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
    const waterLevel = data.feeds[0].field2;

    // Display the water level on the page
    document.getElementById(
      "water-level"
    ).textContent = `Current Water Level: ${waterLevel} cm`;

    const alarmSound = document.getElementById("alarm-sound");

    // Check if the water level is <= 30.00 and trigger the alarm if true
    if (parseFloat(waterLevel) <= 30.0) {
      document.getElementById("alarm").style.display = "block";
      alarmSound.play(); // Play the sound
    } else {
      document.getElementById("alarm").style.display = "none";
      alarmSound.pause(); // Stop the sound if water level is above 30
      alarmSound.currentTime = 0; // Reset sound to start from the beginning
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
