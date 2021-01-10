export const sources = {
  NONE: 0,
  NETFLIX: 1,
  PRIME_VIDEO: 2,
  APPLE_TV: 3,
  PLEX: 4,
  DVD: 5,
  DISNEY_PLUS: 6,
};

export const sourceLabels = {
  [sources.NONE]: "None",
  [sources.NETFLIX]: "Netflix",
  [sources.PRIME_VIDEO]: "Prime Video",
  [sources.APPLE_TV]: "AppleTV+",
  [sources.PLEX]: "Plex",
  [sources.DVD]: "DVD",
  [sources.DISNEY_PLUS]: "Disney+",
};

const sourceLogoBase = "/images/source/";

export const sourceLogos = {
  [sources.NONE]: `${sourceLogoBase}none.png`,
  [sources.NETFLIX]: `${sourceLogoBase}netflix.png`,
  [sources.PRIME_VIDEO]: `${sourceLogoBase}primevideo.png`,
  [sources.APPLE_TV]: `${sourceLogoBase}appletv+.png`,
  [sources.PLEX]: `${sourceLogoBase}plex.png`,
  [sources.DVD]: `${sourceLogoBase}dvd.png`,
  [sources.DISNEY_PLUS]: `${sourceLogoBase}disney+.png`,
};
