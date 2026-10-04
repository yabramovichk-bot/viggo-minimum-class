exports.handler = async function (event) {
  try {
    const params = event.queryStringParameters || {};

    const username = params.username || "";
    const day = params.day || "sabtu";

    if (!username) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Username is required."
        })
      };
    }

    const APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbx_-_j06jPoSuAPQK7UW_ovaJVAJ1rT4OxC2sIL0fv9TrqEh-_ISXQcXWPU9wJ72hQN/exec";

    const url =
      APPS_SCRIPT_URL +
      "?action=calculate" +
      "&username=" +
      encodeURIComponent(username) +
      "&day=" +
      encodeURIComponent(day);

    const response = await fetch(url, {
      redirect: "follow"
    });

    const text = await response.text();

    console.log("Apps Script status:", response.status);
    console.log("Apps Script response:", text);

    if (!response.ok) {
      return {
        statusCode: 502,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Apps Script returned HTTP " + response.status,
          details: text
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: text
    };

  } catch (error) {

    console.error("Function error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Netlify Function error: " + error.message
      })
    };
  }
};