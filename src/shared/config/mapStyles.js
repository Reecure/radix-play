export const mapStyles = {
    "version": 8,
    "name": "Glass Dark UI",
    "metadata": {
        "mapbox:autocomposite": false,
        "maputnik:renderer": "mbgljs",
        "openmaptiles:version": "3.x"
    },
    "sources": {
        "openmaptiles": {
            "type": "vector",
            "url": "https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key={key}"
        }
    },
    "sprite": "https://openmaptiles.github.io/maptiler-basic-gl-style/sprite",
    "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key={key}",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "#020617"
            }
        },

        {
            "id": "water",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "water",
            "filter": [
                "all",
                ["==", "$type", "Polygon"],
                ["!=", "brunnel", "tunnel"]
            ],
            "paint": {
                "fill-color": "#1e3a8a",
                "fill-opacity": 0.9
            }
        },
        {
            "id": "waterway",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterway",
            "paint": {
                "line-color": "#3b82f6",
                "line-width": {
                    "base": 1.4,
                    "stops": [[8, 0.6], [20, 6]]
                }
            }
        },

        {
            "id": "landcover",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "landcover",
            "paint": {
                "fill-color": "#020617",
                "fill-opacity": 0.6
            }
        },

        {
            "id": "road_minor",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["in", "class", "minor", "service"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#1e293b",
                "line-width": {
                    "base": 1.4,
                    "stops": [[13, 0.6], [20, 6]]
                }
            }
        },
        {
            "id": "road_secondary",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["in", "class", "secondary", "tertiary"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#334155",
                "line-width": {
                    "base": 1.4,
                    "stops": [[6, 0.8], [20, 14]]
                }
            }
        },
        {
            "id": "road_primary",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["in", "class", "primary", "trunk"]
            ],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#64748b",
                "line-width": {
                    "base": 1.5,
                    "stops": [[6, 1.2], [20, 22]]
                }
            }
        },
        {
            "id": "road_motorway",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["==", "class", "motorway"],
            "paint": {
                "line-color": "#94a3b8",
                "line-width": {
                    "base": 1.5,
                    "stops": [[8, 1.5], [16, 12]]
                }
            }
        },

        {
            "id": "railway",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "transportation",
            "filter": ["==", "class", "rail"],
            "paint": {
                "line-color": "#475569",
                "line-opacity": {
                    "base": 1,
                    "stops": [[11, 0], [16, 1]]
                }
            }
        },

        {
            "id": "admin_country",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "boundary",
            "filter": ["<=", "admin_level", 2],
            "paint": {
                "line-color": "#64748b",
                "line-width": 1,
                "line-dasharray": [2, 2]
            }
        },

        {
            "id": "building",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "building",
            "paint": {
                "fill-color": "#020617",
                "fill-opacity": {
                    "base": 1,
                    "stops": [[13, 0], [15, 0.9]]
                }
            }
        },

        {
            "id": "3d-buildings",
            "type": "fill-extrusion",
            "source": "openmaptiles",
            "source-layer": "building",
            "minzoom": 13,
            "paint": {
                "fill-extrusion-color": "#0f172a",
                "fill-extrusion-height": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    13,
                    0,
                    13.05,
                    ["get", "render_height"]
                ],
                "fill-extrusion-opacity": 0.85
            }
        },

        {
            "id": "place_label_city",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "place",
            "filter": ["==", "class", "city"],
            "layout": {
                "text-field": "{name:latin}",
                "text-font": ["Noto Sans Regular"],
                "text-size": 14
            },
            "paint": {
                "text-color": "#e5e7eb",
                "text-halo-color": "#020617",
                "text-halo-width": 2
            }
        },
        {
            "id": "road_label",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "transportation_name",
            "minzoom": 13,
            "layout": {
                "symbol-placement": "line",
                "text-field": "{name:latin}",
                "text-font": ["Noto Sans Regular"],
                "text-size": 11
            },
            "paint": {
                "text-color": "#cbd5f5",
                "text-halo-color": "#020617",
                "text-halo-width": 2
            }
        }
    ],
    "id": "glass-dark-ui"
}