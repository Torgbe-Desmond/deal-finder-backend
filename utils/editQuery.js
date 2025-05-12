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
    tonaton: "c_animals-and-pets",
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
    tonaton: "c_agriculture-and-foodstuff",
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

const minMaxMap = {
  tonaton: {
    min: "price_min",
    max: "price_max",
  },
  jumia: {
    min: "price_min",
    max: "price_max",
  },
  jiji: {
    min: "price_min",
    max: "price_max",
  },
  kikuu: {
    min: "price_min",
    max: "price_max",
  },
  compughana: {
    min: "price_min",
    max: "price_max",
  },
  melcom: {
    min: "price_min",
    max: "price_max",
  },
};

function formatSearchUrl(site, query, category, maxPrice, minPrice) {
  const baseUrls = {
    tonaton: "https://tonaton.com/",
    jumia: "https://www.jumia.com.gh/",
    kikuu: "https://www.kikuu.com.gh/",
    jiji: "https://jiji.com.gh/",
    compughana: "https://compughana.com/",
    melcom: "https://melcom.com/",
    shopbeautybooth: "https://shopbeautybooth.com/",
  };
  const siteCategory = categoryMap?.[category]?.[site] ?? category;
  console.log("siteCategory", siteCategory);

  const params = {
    tonaton: `${siteCategory}?q=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}&${minMaxMap[site]?.min}=${minPrice}&${minMaxMap[site]?.max}=${maxPrice}`,
    jumia: `${siteCategory}?q=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}&price=${minPrice}-${maxPrice}`,
    compughana: `${siteCategory}?product_list_order=price&q=${encodeURIComponent(
      query
    ).replace(/%20/g, "+")}`,
    melcom: `${siteCategory}results/?q=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
    shopbeautybooth: `?orderby=price&s=${encodeURIComponent(query).replace(
      /%20/g,
      "+"
    )}`,
  };

  return `${baseUrls[site]}${params[site]}`;
}

export default formatSearchUrl;
