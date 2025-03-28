// import returnSearchDetailsBasedOnDomain from "./utils/returnSearchDetailsBasedOnDomain.js";

import scrapeWebsite from "./scrappers/scrapeWebsite.js";
import {
  shopBeautyBoothSelectors,
  tonatonSelectors,
} from "./utils/selectors.js";

// let list = [
//   "https://tonaton.com/a-MfYFNdCgR7GVmqaGktzK0W149i64fnh1-apple-iphone-xr-64-gb-red.html?lid=LrUFYoizq0ykaTnK",
//   "https://tonaton.com/a-MfYFNdCgjrG9xEueeo4s1IvLMZ8nvud7-iphone-xr-iphone16-cases-android-phone-cases.html?lid=dXe2fK7dPtVWerRt",
//   "https://www.jumia.com.gh/generic-14-inch-laptop-intel-celeron-n3350-6gb-ram-192gb-ssd-windows-10-for-students-and-business-253590997.html"
// ];

// const result = await returnSearchDetailsBasedOnDomain("jumia", list[2]);

// console.log("result", result);

// const result = await scrapeWebsite(
//   "shopbeautybooth",
//   "therabreath",
//   "health & beauty",
//   shopBeautyBoothSelectors
// );

const result2 = await scrapeWebsite(
  "shopbeautybooth",
  "therabreath",
  "health & beauty",
  shopBeautyBoothSelectors
);

// console.log("result", result);
console.log("result2", result2.length);
