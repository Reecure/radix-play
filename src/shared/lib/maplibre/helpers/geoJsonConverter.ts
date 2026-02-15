interface GeoJsonOptions<T> {
    getLat: (item: T) => number;
    getLng: (item: T) => number;
    excludeKeys?: (keyof T)[];
}

export const toGeoJSON = <T extends Record<string, any>>(
    data: T[],
    options: GeoJsonOptions<T>
) => {
    const { getLat, getLng, excludeKeys = [] } = options;

    return {
        type: "FeatureCollection",
        features: data.map((item) => {
            const properties = { ...item };

            excludeKeys.forEach(key => {
                delete properties[key];
            });

            return {
                type: "Feature",
                properties,
                geometry: {
                    type: "Point",
                    coordinates: [
                        getLng(item),
                        getLat(item)
                    ]
                }
            };
        })
    };
};