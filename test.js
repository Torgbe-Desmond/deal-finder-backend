async function getPost(urlToScrape) {
    const response = await fetch("http://localhost:5000/tube-ninja", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Indicates the content type of the request body
      },
      body: JSON.stringify({
        url: urlToScrape, // Send the URL to be scraped
      }),
    });
  
    return response.json();
  }


  const response = await getPost("https://www.facebook.com/share/r/16X9bGGDZU/?mibextid=wwXIfr")

  console.log(response)