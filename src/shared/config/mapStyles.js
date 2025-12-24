const COLORS = {
    dark: {
        background: "#020617",
        water: "#1e3a8a",
        waterway: "#3b82f6",
        landcover: "#020617",
        roadMinor: "#1e293b",
        roadSecondary: "#334155",
        roadPrimary: "#64748b",
        roadMotorway: "#94a3b8",
        railway: "#475569",
        building: "#020617",
        building3d: "#0f172a",
        text: "#e5e7eb",
        halo: "#020617"
    },
    light: {
        background: "#f8fafc",
        water: "#bae6fd",
        waterway: "#7dd3fc",
        landcover: "#f1f5f9",
        roadMinor: "#e2e8f0",
        roadSecondary: "#cbd5e1",
        roadPrimary: "#94a3b8",
        roadMotorway: "#64748b",
        railway: "#94a3b8",
        building: "#e2e8f0",
        building3d: "#cbd5e1",
        text: "#334155",
        halo: "#ffffff"
    }
};

export const getMapStyle = (theme) => {
    const c = COLORS[theme] || COLORS.dark;

    return {
        "version": 8,
        "name": `Glass ${theme} UI`,
        "sources": {
            'openmaptiles': {
                type: 'vector',
                // Твой локальный источник тайлов
                tiles: ["https://localhost:7281/tiles/{z}/{x}/{y}.pbf"],
                minzoom: 0,
                maxzoom: 14
            },
        },
        "layers": [
            {
                "id": "background",
                "type": "background",
                "paint": { "background-color": c.background }
            },
            {
                "id": "water",
                "type": "fill",
                "source": "openmaptiles",
                "source-layer": "water",
                "filter": ["all", ["==", "$type", "Polygon"], ["!=", "brunnel", "tunnel"]],
                "paint": { "fill-color": c.water, "fill-opacity": 0.9 }
            },
            {
                "id": "waterway",
                "type": "line",
                "source": "openmaptiles",
                "source-layer": "waterway",
                "paint": {
                    "line-color": c.waterway,
                    "line-width": { "base": 1.4, "stops": [[8, 0.6], [20, 6]] }
                }
            },
            {
                "id": "landcover",
                "type": "fill",
                "source": "openmaptiles",
                "source-layer": "landcover",
                "paint": { "fill-color": c.landcover, "fill-opacity": 0.6 }
            },
            // ROADS
            {
                "id": "road_minor",
                "type": "line",
                "source": "openmaptiles",
                "source-layer": "transportation",
                "minzoom": 13,
                "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "minor", "service"]],
                "layout": { "line-cap": "round", "line-join": "round" },
                "paint": {
                    "line-color": c.roadMinor,
                    "line-width": { "base": 1.4, "stops": [[13, 0.6], [20, 6]] }
                }
            },
            {
                "id": "road_secondary",
                "type": "line",
                "source": "openmaptiles",
                "source-layer": "transportation",
                "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "secondary", "tertiary"]],
                "layout": { "line-cap": "round", "line-join": "round" },
                "paint": {
                    "line-color": c.roadSecondary,
                    "line-width": { "base": 1.4, "stops": [[6, 0.8], [20, 14]] }
                }
            },
            {
                "id": "road_primary",
                "type": "line",
                "source": "openmaptiles",
                "source-layer": "transportation",
                "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "primary", "trunk"]],
                "layout": { "line-cap": "round", "line-join": "round" },
                "paint": {
                    "line-color": c.roadPrimary,
                    "line-width": { "base": 1.5, "stops": [[6, 1.2], [20, 22]] }
                }
            },
            {
                "id": "road_motorway",
                "type": "line",
                "source": "openmaptiles",
                "source-layer": "transportation",
                "filter": ["==", "class", "motorway"],
                "paint": {
                    "line-color": c.roadMotorway,
                    "line-width": { "base": 1.5, "stops": [[8, 1.5], [16, 12]] }
                }
            },
            {
                "id": "railway",
                "type": "line",
                "source": "openmaptiles",
                "source-layer": "transportation",
                "filter": ["==", "class", "rail"],
                "paint": {
                    "line-color": c.railway,
                    "line-opacity": { "base": 1, "stops": [[11, 0], [16, 1]] }
                }
            },
            // BUILDINGS
            {
                "id": "building",
                "type": "fill",
                "source": "openmaptiles",
                "source-layer": "building",
                "paint": {
                    "fill-color": c.building,
                    "fill-opacity": { "base": 1, "stops": [[13, 0], [15, 0.9]] }
                }
            },
            {
                "id": "3d-buildings",
                "type": "fill-extrusion",
                "source": "openmaptiles",
                "source-layer": "building",
                "minzoom": 13,
                "paint": {
                    "fill-extrusion-color": c.building3d,
                    "fill-extrusion-height": [
                        "interpolate", ["linear"], ["zoom"], 13, 0, 13.05, ["get", "render_height"]
                    ],
                    "fill-extrusion-opacity": 0.85
                }
            },
            // LABELS
            {
                "id": "place_label_city",
                "type": "symbol",
                "source": "openmaptiles",
                "source-layer": "place",
                "filter": ["==", "class", "city"],
                "layout": {
                    "text-field": "{name:latin}",
                    "text-font": ["Noto Sans Regular"], // Убедись, что шрифт доступен
                    "text-size": 14
                },
                "paint": {
                    "text-color": c.text,
                    "text-halo-color": c.halo,
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
                    "text-color": c.text,
                    "text-halo-color": c.halo,
                    "text-halo-width": 2
                }
            }
        ]
    };
};