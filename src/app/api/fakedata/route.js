const express = require("express");
const axios = require("axios");
const router = express.Router();

// proxy endpoint to Wger API for exercise searches in English.
router.get("/exercise/search", async (req, res) => {
  const { term } = req.query; // extract the search term from the query parameters
  const apiUrl = `https://wger.de/api/v2/exercise/search/?language=english&term=${encodeURIComponent(
    term
  )}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: { Accept: "application/json" }, // sets the necessary headers
    });
    res.status(200).json(response.data); // sends the response from the API to the client
  } catch (error) {
    console.error("Error during API call:", error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

module.exports = router;
