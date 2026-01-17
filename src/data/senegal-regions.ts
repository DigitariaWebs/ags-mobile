// GeoJSON data for Senegal's 14 administrative regions
// Simplified coordinates for mobile performance

export interface RegionProperties {
  id: string;
  name: string;
  capital: string;
  population?: number;
}

export interface SenegalRegion {
  type: "Feature";
  properties: RegionProperties;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export const senegalRegions: SenegalRegion[] = [
  {
    type: "Feature",
    properties: {
      id: "dakar",
      name: "Dakar",
      capital: "Dakar",
      population: 3732000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-17.2, 14.6],
          [-17.5, 14.7],
          [-17.5, 14.8],
          [-17.3, 14.85],
          [-17.2, 14.75],
          [-17.2, 14.6],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thies",
      name: "Thiès",
      capital: "Thiès",
      population: 1960000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-17.2, 14.6],
          [-17.2, 14.75],
          [-16.8, 15.2],
          [-16.5, 15.1],
          [-16.3, 14.8],
          [-16.5, 14.5],
          [-17.0, 14.5],
          [-17.2, 14.6],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "diourbel",
      name: "Diourbel",
      capital: "Diourbel",
      population: 1670000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-16.3, 14.8],
          [-16.5, 15.1],
          [-16.2, 15.3],
          [-15.8, 15.2],
          [-15.6, 14.9],
          [-15.8, 14.7],
          [-16.3, 14.8],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "fatick",
      name: "Fatick",
      capital: "Fatick",
      population: 811000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-16.5, 14.5],
          [-16.3, 14.8],
          [-15.8, 14.7],
          [-15.5, 14.5],
          [-15.3, 14.2],
          [-15.8, 13.9],
          [-16.3, 14.1],
          [-16.5, 14.5],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "kaolack",
      name: "Kaolack",
      capital: "Kaolack",
      population: 1023000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-15.8, 14.7],
          [-15.6, 14.9],
          [-15.2, 14.8],
          [-14.8, 14.5],
          [-15.0, 14.0],
          [-15.5, 14.5],
          [-15.8, 14.7],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "kaffrine",
      name: "Kaffrine",
      capital: "Kaffrine",
      population: 596000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-15.0, 14.0],
          [-14.8, 14.5],
          [-14.3, 14.3],
          [-14.0, 13.9],
          [-14.3, 13.6],
          [-15.0, 13.8],
          [-15.0, 14.0],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "louga",
      name: "Louga",
      capital: "Louga",
      population: 988000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-16.8, 15.2],
          [-16.5, 15.8],
          [-15.8, 16.0],
          [-15.5, 15.7],
          [-15.6, 15.3],
          [-16.2, 15.3],
          [-16.8, 15.2],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "matam",
      name: "Matam",
      capital: "Matam",
      population: 627000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-13.5, 15.2],
          [-13.0, 15.6],
          [-12.5, 15.8],
          [-12.2, 15.5],
          [-12.5, 15.0],
          [-13.2, 14.8],
          [-13.5, 15.2],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "saint-louis",
      name: "Saint-Louis",
      capital: "Saint-Louis",
      population: 1029000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-16.5, 15.8],
          [-16.2, 16.5],
          [-15.5, 16.5],
          [-15.0, 16.2],
          [-15.5, 15.7],
          [-15.8, 16.0],
          [-16.5, 15.8],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "tambacounda",
      name: "Tambacounda",
      capital: "Tambacounda",
      population: 701000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-13.2, 14.8],
          [-12.5, 15.0],
          [-12.0, 14.5],
          [-11.8, 14.0],
          [-12.2, 13.3],
          [-13.0, 13.5],
          [-13.5, 14.0],
          [-13.2, 14.8],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "kedougou",
      name: "Kédougou",
      capital: "Kédougou",
      population: 200000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-12.2, 13.3],
          [-11.8, 14.0],
          [-11.5, 13.8],
          [-11.3, 13.3],
          [-11.4, 12.5],
          [-12.0, 12.3],
          [-12.5, 12.8],
          [-12.2, 13.3],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "kolda",
      name: "Kolda",
      capital: "Kolda",
      population: 742000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-15.0, 13.8],
          [-14.3, 13.6],
          [-14.0, 13.2],
          [-13.5, 13.0],
          [-13.8, 12.5],
          [-14.5, 12.8],
          [-15.2, 13.2],
          [-15.0, 13.8],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "sedhiou",
      name: "Sédhiou",
      capital: "Sédhiou",
      population: 535000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-15.8, 13.9],
          [-15.3, 14.2],
          [-15.0, 13.8],
          [-15.2, 13.2],
          [-15.8, 13.0],
          [-16.2, 13.5],
          [-15.8, 13.9],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "ziguinchor",
      name: "Ziguinchor",
      capital: "Ziguinchor",
      population: 600000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-16.7, 12.3],
          [-16.2, 13.5],
          [-15.8, 13.0],
          [-15.5, 12.5],
          [-16.0, 12.0],
          [-16.7, 12.3],
        ],
      ],
    },
  },
];

export const senegalCenter = {
  latitude: 14.4974,
  longitude: -14.4524,
  latitudeDelta: 6.0,
  longitudeDelta: 8.0,
};

export const getRegionColor = (regionId: string): string => {
  const colors: Record<string, string> = {
    dakar: "#FF6B6B",
    thies: "#4ECDC4",
    diourbel: "#45B7D1",
    fatick: "#96CEB4",
    kaolack: "#FFEAA7",
    kaffrine: "#DFE6E9",
    louga: "#74B9FF",
    matam: "#A29BFE",
    "saint-louis": "#FD79A8",
    tambacounda: "#FDCB6E",
    kedougou: "#6C5CE7",
    kolda: "#00B894",
    sedhiou: "#00CEC9",
    ziguinchor: "#FF7675",
  };
  return colors[regionId] || "#95A5A6";
};
