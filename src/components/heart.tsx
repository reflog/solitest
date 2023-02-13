import * as React from "react";

const Heart = (props: {}) => (
  <svg
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
      zIndex: 1,
    }}
    xmlSpace="preserve"
    width={165.812}
    height={151.814}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <radialGradient
        id="a"
        cx={948.073}
        cy={870.14}
        r={790.031}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(1511.575 1275.674)"
      >
        <stop
          offset={0}
          style={{
            stopColor: "red",
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#ebffff",
            stopOpacity: 0.9105072,
          }}
        />
      </radialGradient>
      <radialGradient
        id="c"
        cx={948.073}
        cy={870.14}
        r={790.031}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.1 0 0 .1 -11.366 -11.006)"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#ff2e2e",
          }}
        />
        <stop
          offset={0.272}
          style={{
            stopColor: "#eb2425",
          }}
        />
        <stop
          offset={0.825}
          style={{
            stopColor: "#b8090e",
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#a70006",
          }}
        />
      </radialGradient>
      {/* <linearGradient
        xlinkHref="#a"
        id="d"
        x1={2453.887}
        y1={2888.052}
        x2={2453.887}
        y2={1391.384}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.1 0 0 .1 -162.657 -138.465)"
      /> */}
      <linearGradient xlinkHref="#a" id="d">
        <stop
          style={{
            stopColor: "#000",
            stopOpacity: 1,
          }}
          offset={0}
        />
        <stop
          style={{
            stopColor: "#f00",
            stopOpacity: 0,
          }}
          offset={1}
        />
      </linearGradient>
    </defs>
    <path
      fill="url(#c)"
      d="M164.47 38.894c-1.37-6.393-3.837-12.552-7.13-17.811-3.587-5.725-8.022-10.274-13.185-13.52-6.255-3.934-14.01-6.013-22.427-6.013-6.111 0-12.22 1.132-17.668 3.273-5.528 2.173-10.456 5.56-14.252 9.798a38.674 38.674 0 0 0-2.693 3.372c-.504.708-1.194 1.678-2.512 1.678-1.406 0-2.065-1.117-2.382-1.653a18.79 18.79 0 0 0-.168-.282c-1.618-2.645-3.502-5.015-5.6-7.045-3.467-3.354-7.674-5.914-12.503-7.609-4.5-1.579-9.435-2.38-14.668-2.38-3.283 0-6.627.32-9.94.952C26.073 4.183 15.04 12.15 8.279 24.088c-6.864 12.118-9.069 26.3-6.05 38.91 1.499 6.26 3.914 12.155 7.383 18.019 3.091 5.225 6.944 10.29 11.779 15.48 9.022 9.69 19.9 18.098 30.42 26.228 2.493 1.928 5.071 3.92 7.543 5.87 5.382 4.243 10.202 8.12 14.703 12.602 3.085 3.071 6.08 6.375 8.11 10.116.166-.368.342-.736.529-1.103 1.359-2.672 3.223-5.257 5.7-7.903 4.303-4.597 9.208-8.351 15.248-12.574 3.987-2.787 8.104-5.503 12.085-8.13 7.261-4.79 14.77-9.743 21.65-15.244 5.457-4.364 9.911-8.55 13.618-12.797 4.395-5.037 7.674-10.066 10.023-15.375 2.562-5.789 4.152-12.255 4.727-19.219.546-6.601.119-13.476-1.234-19.88z"
      style={{
        fill: "url(#c)",
        stroke: "url(#linearGradient3049)",
        strokeWidth: 0.74,
        strokeDasharray: "none",
        strokeOpacity: 1,
      }}
      transform="translate(-.535 -.333)"
    />
    <path
      fill="url(#c)"
      d="M164.338 39.001c-1.372-6.392-3.838-12.551-7.132-17.81-3.586-5.725-8.022-10.274-13.184-13.52-6.255-3.934-14.01-6.013-22.427-6.013-6.111 0-12.22 1.132-17.668 3.273-5.528 2.172-10.456 5.56-14.253 9.798a38.674 38.674 0 0 0-2.692 3.372c-.504.708-1.194 1.678-2.512 1.678-1.406 0-2.065-1.117-2.382-1.654a18.79 18.79 0 0 0-.168-.281c-1.618-2.645-3.502-5.015-5.6-7.045-3.467-3.354-7.674-5.914-12.504-7.609C59.317 1.611 54.382.81 49.15.81c-3.283 0-6.627.32-9.94.952C25.94 4.29 14.908 12.258 8.146 24.196c-6.864 12.118-9.069 26.3-6.05 38.91 1.499 6.26 3.913 12.155 7.383 18.018 3.091 5.226 6.944 10.29 11.779 15.482 9.022 9.689 19.9 18.096 30.42 26.227 2.493 1.927 5.07 3.92 7.543 5.87 5.381 4.243 10.202 8.12 14.703 12.602 3.085 3.071 6.079 6.375 8.11 10.116.166-.369.342-.737.528-1.103 1.36-2.672 3.224-5.257 5.701-7.903 4.303-4.597 9.208-8.351 15.248-12.574 3.987-2.787 8.104-5.503 12.085-8.13 7.261-4.79 14.77-9.743 21.65-15.245 5.457-4.363 9.911-8.549 13.618-12.796 4.395-5.037 7.674-10.066 10.023-15.375 2.562-5.789 4.152-12.255 4.727-19.219.545-6.601.119-13.476-1.234-19.88z"
      style={{
        fill: "url(#d)",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 0.74,
        strokeDasharray: "none",
        strokeOpacity: 1,
      }}
      transform="translate(-.535 -.333)"
    />
    <text
      xmlSpace="preserve"
      style={{
        fontWeight: 700,
        fontSize: "39.2388px",
        fontFamily: "serif",
        opacity: 0.708329,
        fill: "#000",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 0.74,
        strokeLinecap: "round",
        strokeDasharray: "none",
        strokeOpacity: 1,
      }}
      x={56.759}
      y={78.853}
      transform="translate(-.535 -.333)"
    >
      <tspan
        x={56.759}
        y={78.853}
        style={{
          strokeWidth: 0.74,
        }}
      >
        {"20"}
      </tspan>
    </text>
  </svg>
);

export default Heart;
