const categoryMap = {
  electronics: {
    tonaton: "c_electronics",
    jumia: "catalog/",
    jiji: "electronics",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  vehicles: {
    tonaton: "c_vehicles",
    jumia: "catalog/",
    jiji: "vehicles",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "phones & tablets": {
    tonaton: "c_mobile-phones-tablets",
    jumia: "catalog/",
    jiji: "mobile-phones-tablets",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  fashion: {
    tonaton: "c_fashion-and-beauty",
    jumia: "catalog/",
    jiji: "fashion-and-beauty",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "animals & pets": {
    jumia: "catalog/",
    jiji: "animals-and-pets",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  property: {
    tonaton: "c_real-estate",
    jumia: "catalog/",
    jiji: "real-estate",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "home, furniture & appliances": {
    tonaton: "c_home-garden",
    jumia: "catalog/",
    jiji: "home-garden",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "home, office appliances": {
    jumia: "home-office-appliances/",
    jumia: "catalog/",
    jiji: "home-garden",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "health & beauty": {
    tonaton: "c_health-and-beauty",
    jumia: "catalog/",
    jiji: "health-and-beauty",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
    shopbeautybooth: "",
  },

  "sports, arts and outdoors": {
    tonaton: "c_hobbies-art-sport",
    jumia: "catalog/",
    jiji: "hobbies-art-sport",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "seeking work cvs": {
    tonaton: "c_seeking-work-cvs",
    jumia: "catalog/",
    jiji: "seeking-work-cvs",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  services: {
    tonaton: "c_services",
    jumia: "catalog/",
    jiji: "services",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  job: {
    tonaton: "c_jobs",
    jumia: "catalog/",
    jiji: "jobs",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "babies and kids": {
    tonaton: "c_babies-and-kids",
    jumia: "catalog/",
    jiji: "babies-and-kids",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "agriculture and food": {
    tonaton: "",
    jumia: "catalog/",
    jiji: "agriculture-and-foodstuff",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "commercial | equipment & tools": {
    tonaton: "c_office-and-commercial-equipment-tools",
    jumia: "catalog/",
    jiji: "office-and-commercial-equipment-tools",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
  "repair & construction": {
    tonaton: "c_repair-and-construction",
    jumia: "catalog/",
    jiji: "repair-and-construction",
    kikuu: "search/",
    compughana: "catalogsearch/",
    melcom: "catalogsearch/",
    baygh: "search",
  },
};

function formatSearchUrl(site, query, category) {
  const baseUrls = {
    tonaton: "https://tonaton.com/",
    jumia: "https://www.jumia.com.gh/",
    kikuu: "https://www.kikuu.com.gh/",
    jiji: "https://jiji.com.gh/",
    compughana: "https://compughana.com/",
    melcom: "https://melcom.com/",
    shopbeautybooth: "https://shopbeautybooth.com/",
  };

  // Get the category mapping for the site, fallback to a general search
  const siteCategory = categoryMap[category]?.[site] || category;

  // Format query parameters for each site
  const params = {
    tonaton: `${siteCategory}?query=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
    jumia: `${siteCategory}?q=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
    kikuu: `${siteCategory}result?kw=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
    jiji: `${siteCategory}?query=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
    compughana: `${siteCategory}results/?q=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
    melcom: `${siteCategory}results/?q=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
    shopbeautybooth: `?s=${encodeURIComponent(query).replace(/%20/g, "+")}`,
  };

  return `${baseUrls[site]}${params[site]}`;
}

export default formatSearchUrl;
