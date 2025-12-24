import {UKRAINE_MAP_CONFIG} from "../../../../../shared/config/ukraineMap/ukraineMap.ts";

const UkraineCard = ({hoverColor = "#3b82f6", baseColor = "#e2e8f0"}) => {
    return (
        <svg
            viewBox={UKRAINE_MAP_CONFIG.viewBox}
            width="100%"
            height="auto"
            style={{filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"}}
            xmlns="http://www.w3.org/2000/svg"
        >
            {UKRAINE_MAP_CONFIG.regions.map((region) => (
                <path
                    key={region.id}
                    id={region.id}
                    d={region.d}
                    fill={baseColor}
                    stroke="#fff"
                    strokeWidth="0.5"
                    style={{
                        transition: 'fill 0.4s',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.target as SVGPathElement).style.fill = hoverColor}
                    onMouseLeave={(e) => (e.target as SVGPathElement).style.fill = baseColor}
                >
                    <title>{region.title}</title>
                </path>
            ))}
        </svg>
    );
};

export default UkraineCard;