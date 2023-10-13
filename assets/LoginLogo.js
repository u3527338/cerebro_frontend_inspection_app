import React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Text,
  Ellipse, Rect
} from "react-native-svg";
import {processFontFamily} from "expo-font";

// SVGR has dropped some elements not supported by react-native-svg: tspan

const LoginLogo = ({size, StyleProps}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="296.905" height="135.273" viewBox="0 0 296.905 135.273">
    <G id="logo-darkmode" transform="translate(-747.378 -592.424)">
      <G id="Group_3163" dataName="Group 3163" transform="translate(839.254 592.424)">
        <G id="Group_2825" dataName="Group 2825" transform="translate(0 0)">
          <G id="Group_338" dataName="Group 338" transform="translate(0 27.969)">
            <Path id="path2144"
                  d="M164.688-172.873c-4.481.227-8.747-5.35-9.313-12.478s2.834-12.582,7.38-12.172a6.058,6.058,0,0,1,2.231.679c3.315,1.721,5.936,6.434,6.358,11.815s-1.478,9.981-4.529,11.563a5.1,5.1,0,0,1-2.126.592Zm85.295-3.5-83.008,4.965-.034-.436.645-.343c3.2-1.984,5.146-7.012,4.693-12.826-.481-6.194-3.558-11.623-7.425-13.463a6.839,6.839,0,0,0-2.083-.623l-.144-.025-.181-.006-.122,0c-5-.243-8.721,5.809-8.087,13.757.643,8.1,5.5,14.4,10.578,14.094,0,0,19.144,2.488,22.866,9.387,6.859-.348,68.514-8.985,68.514-8.985a9.944,9.944,0,0,0-6.213-5.494"
                  transform="translate(-154.166 199.138)" fill="#beced6"/>
            <Path id="path2148"
                  d="M163.968-175.168c-3.943.17-7.677-4.753-8.169-11.006s2.471-11.062,6.463-10.734a5.354,5.354,0,0,1,2.233.727c2.811,1.608,5.016,5.664,5.376,10.292s-1.214,8.591-3.779,10.083a4.5,4.5,0,0,1-2.123.637Zm6.768-10.7c-.422-5.381-3.043-10.094-6.358-11.815a6.058,6.058,0,0,0-2.231-.679c-4.546-.41-7.946,5.036-7.38,12.172s4.832,12.7,9.313,12.478a5.1,5.1,0,0,0,2.126-.592c3.052-1.582,4.945-6.191,4.529-11.563"
                  transform="translate(-153.56 199.98)" fill="#a3b5ba"/>
            <Path id="path2150"
                  d="M164.894-178.671a3.623,3.623,0,0,1-1.687.5c-3.128.119-6.078-3.79-6.465-8.738s1.95-8.753,5.112-8.506a4.313,4.313,0,0,1,1.772.569c2.233,1.268,3.988,4.487,4.274,8.164s-.968,6.833-3.006,8.014Zm4.427-7.991c-.359-4.628-2.565-8.685-5.376-10.292a5.354,5.354,0,0,0-2.233-.727c-3.991-.328-6.961,4.475-6.462,10.734s4.226,11.176,8.169,11.006a4.5,4.5,0,0,0,2.123-.637c2.565-1.492,4.138-5.46,3.779-10.083"
                  transform="translate(-153.011 200.755)" fill="#fff"/>
            <Path id="path2152"
                  d="M167.1-187.885c-.286-3.677-2.041-6.9-4.274-8.164a4.313,4.313,0,0,0-1.772-.569c-3.162-.246-5.5,3.558-5.112,8.506s3.337,8.857,6.465,8.738a3.623,3.623,0,0,0,1.687-.5c2.038-1.18,3.3-4.337,3.006-8.014"
                  transform="translate(-152.216 201.955)" fill="#beced6"/>
            <Path id="path2154"
                  d="M247.509-183.425c-.238-3.411-1.237-6.307-2.358-6.969l0-.108-.391-.037-86.538-8.58a6.839,6.839,0,0,1,2.083.623c3.867,1.84,6.944,7.269,7.425,13.463.453,5.814-1.492,10.842-4.693,12.826l-.645.343.034.436,83.008-4.965.309-.02.385-.023-.009-.108c1.03-.614,1.63-3.476,1.393-6.881"
                  transform="translate(-149.615 199.159)" fill="#fff"/>
          </G>
          <G id="Group_339" dataName="Group 339" transform="translate(25.259)">
            <Path id="Union_2" dataName="Union 2"
                  d="M30.633,47.621c-1.143-.044-2.293-.133-3.428-.184-2.33-.118-4.659-.221-6.989-.391-1.393-.1-2.772-.258-4.159-.376-2.093-.177-4.188-.347-6.281-.582-1.136-.118-2.279-.281-3.414-.42l-1.025-.125c-1.762-.214-3.517-.428-5.278-.679L.043,44.59c-.634-13.036,5.7-25.068,16.309-32.573C17.34,11.3,18.4,10.639,19.463,10l.3.582c-1.143.922-2.278,1.887-3.34,2.935,5.463,8.4,10.426,18.867,14.864,27.537A321.66,321.66,0,0,0,19.611,9.909l-.332-.76c-.287-.663-.472-1.062-.472-1.062l-.044-.464-.243.406-.052-.067.288-.354c1.319-1.357,7.4-6.776,22.288-7.6L41.066,0C55.849.825,61.939,6.186,63.332,7.579l-.051.509-.443,1.04-.331.8c-1.755,4.232-6.282,15.446-11.672,31.136,4.4-8.671,9.4-19.14,14.827-27.537-1.062-1.047-2.2-2.013-3.34-2.935l.31-.582c1.054.634,2.116,1.291,3.1,2.013A37.722,37.722,0,0,1,82.067,44.59l-.007.273c-1.755.243-3.51.457-5.257.671l-1.01.126c-1.158.139-2.316.3-3.473.427-2.093.236-4.188.406-6.281.582-1.387.118-2.765.273-4.152.376-2.329.169-4.659.273-6.982.391-1.142.051-2.3.14-3.45.184q-5.21.188-10.411.192T30.633,47.621Z"
                  transform="translate(2.903)" fill="#fec001"/>
            <Path id="Union_7" dataName="Union 7"
                  d="M20.088,15.336a19.649,19.649,0,0,1-5.663-1.364A18.863,18.863,0,0,1,10.85,12l-1.312-.929c-1.453-.162-2.912-.3-4.365-.487-3.133-.4-5.449-2.942-5.146-5.6C.181,3.576.351,2.168.506.752L1.553,0,2.961.185C4.723.436,6.477.649,8.24.863L9.265,1c1.136.133,2.278.3,3.414.413,2.093.236,4.188.406,6.281.582,1.387.118,2.766.273,4.159.376,2.33.169,4.659.273,6.989.391,1.136.052,2.285.14,3.428.184q5.21.188,10.411.192t10.41-.192c1.15-.044,2.308-.132,3.451-.184,2.322-.119,4.652-.222,6.982-.391,1.386-.1,2.765-.257,4.151-.376,2.093-.176,4.188-.347,6.281-.582,1.158-.125,2.316-.287,3.473-.42L79.7.856c1.748-.214,3.5-.428,5.257-.671L86.341,0l1.047.752q.244,2.124.48,4.232c.3,2.662-2.005,5.206-5.139,5.6-1.5.2-3,.332-4.5.5l-.782.554a18.62,18.62,0,0,1-4.431,2.448,19.739,19.739,0,0,1-5.375,1.253q-11.845,1.018-23.7,1.01Q32.025,16.353,20.088,15.336ZM7.259,6.385a12.916,12.916,0,0,0,4.468,3.347,19.866,19.866,0,0,0,6.724,1.814q12.752,1.184,25.5,1.187,12.629,0,25.281-1.165a19.853,19.853,0,0,0,6.717-1.836,13.19,13.19,0,0,0,4.27-3.074l.929-1.1A22.494,22.494,0,0,1,70.526,8.627q-13.283.852-26.579.855-13.4,0-26.816-.869A23.353,23.353,0,0,1,6.758,5.751Z"
                  transform="translate(0 44.679)" fill="#efab0e"/>
            <Path id="Union_8" dataName="Union 8"
                  d="M11.694,5.987A19.813,19.813,0,0,1,4.97,4.173,12.92,12.92,0,0,1,.5.826L0,.192A23.357,23.357,0,0,0,10.373,3.053q13.4.873,26.815.87h0q13.283,0,26.58-.855A22.5,22.5,0,0,0,74.385,0l-.929,1.1a13.222,13.222,0,0,1-4.269,3.074,19.864,19.864,0,0,1-6.717,1.836Q49.819,7.17,37.189,7.174,24.46,7.174,11.694,5.987Z"
                  transform="translate(6.758 50.238)" fill="#fec001"/>
            <Path id="path2116"
                  d="M196.63-225.5c5.463,8.4,10.425,18.867,14.864,27.537a321.706,321.706,0,0,0-11.679-31.15l-.332-.759c-.288-.664-.472-1.062-.472-1.062l-.044-.464-.243.406-.044.059.988,1.917.3.582c-1.143.922-2.278,1.888-3.34,2.934"
                  transform="translate(-177.302 239.017)" fill="#f0b20d"/>
            <Path id="path2118"
                  d="M214.856-229.854l-.332.8c-1.755,4.232-6.282,15.446-11.671,31.135,4.4-8.67,9.4-19.14,14.827-27.537-1.062-1.047-2.2-2.013-3.34-2.934l.31-.582,1.01-1.917-.029-.066-.28-.442-.052.509-.442,1.04"
                  transform="translate(-149.115 238.981)" fill="#efab0e"/>
          </G>
          <Path id="Path_5413" dataName="Path 5413"
                d="M15.376-34.523a3.139,3.139,0,0,1-1.591,2.605,6.237,6.237,0,0,1-3.62,1.094,5.637,5.637,0,0,1-3.2-.8,2.472,2.472,0,0,1-1.173-2.148A3.2,3.2,0,0,1,7.5-36.631a6.885,6.885,0,0,1,3.62-1.034,5.4,5.4,0,0,1,3.083.8A2.653,2.653,0,0,1,15.376-34.523ZM7.619-3.376a4.609,4.609,0,0,1-3.58-1.233A5.465,5.465,0,0,1,2.925-8.368q0-2.526,2.546-13.545L3.243-25.254q4.972-2.983,7.836-2.983a3.137,3.137,0,0,1,2.307.7,3.142,3.142,0,0,1,.676,2.247q0,.6-1.472,7a47.242,47.242,0,0,0-1.472,9.149q0,2.745,1.233,3.819A7.09,7.09,0,0,1,7.619-3.376Z"
                transform="translate(59.117 42.006)" fill="#fff"/>
          <Rect id="Rectangle_62" dataName="Rectangle 62" width="2.652" height="5.304"
                transform="translate(68.296 48.243)" fill="#efab0e"/>
        </G>
      </G>
      <G id="Group_3164" dataName="Group 3164" transform="translate(736.523 692.898)">
        <Path id="Path_5724" dataName="Path 5724"
              d="M8.986-4.768q-4.594,0-6.361-1.992A5.855,5.855,0,0,1,1.4-10.711a13.315,13.315,0,0,1,.225-2.345l1.317-7.389q1.446-8.128,10.441-8.128a8.7,8.7,0,0,1,5.654,1.59,5.341,5.341,0,0,1,1.928,4.353,9.1,9.1,0,0,1-.369,2.554,8.967,8.967,0,0,1-.723,1.879l-.353.643H13.837a5.131,5.131,0,0,0,1.06-3.47,2.737,2.737,0,0,0-.61-1.879,2.274,2.274,0,0,0-1.8-.691q-3.245,0-3.855,3.6L7.508-13.506a8.664,8.664,0,0,0-.161,1.638q0,2.12,2.538,2.12,3.052,0,3.662-3.437H19.33l-.161.932Q17.884-4.768,8.986-4.768Zm19.243,0q-6.682,0-6.682-4.626a8.089,8.089,0,0,1,.128-1.381l.675-3.984A7.1,7.1,0,0,1,25.193-19.5a10.2,10.2,0,0,1,6.088-1.654q6.457,0,6.457,4.883a10.194,10.194,0,0,1-.129,1.542l-.386,2.281h-9.8l-.129.739a4.326,4.326,0,0,0-.064.707q0,1.767,2.088,1.767a1.922,1.922,0,0,0,1.317-.482,1.84,1.84,0,0,0,.643-1.124l5.333.064Q35.554-4.768,28.229-4.768Zm3.855-9.638a4.438,4.438,0,0,0,.129-1.012,1.464,1.464,0,0,0-.418-.948,1.675,1.675,0,0,0-1.333-.482,2.6,2.6,0,0,0-1.671.61,3.216,3.216,0,0,0-1.044,1.831Zm22.97-2.988a6.223,6.223,0,0,1-.369,2.12,6.219,6.219,0,0,1-.723,1.51l-.353.45H48.757a2.388,2.388,0,0,0,.8-1.831,1.283,1.283,0,0,0-.369-.948,1.367,1.367,0,0,0-1.012-.369,2.321,2.321,0,0,0-1.9,1.092l-1.8,10.152H39.023L41.754-20.67H46.83l-.386,2.152a5.327,5.327,0,0,1,4.433-2.6,4.383,4.383,0,0,1,3.132,1A3.594,3.594,0,0,1,55.054-17.393ZM62.475-4.768q-6.682,0-6.682-4.626a8.089,8.089,0,0,1,.128-1.381l.675-3.984A7.1,7.1,0,0,1,59.439-19.5a10.2,10.2,0,0,1,6.088-1.654q6.457,0,6.457,4.883a10.194,10.194,0,0,1-.128,1.542l-.386,2.281h-9.8l-.128.739a4.325,4.325,0,0,0-.064.707q0,1.767,2.088,1.767a1.922,1.922,0,0,0,1.317-.482,1.84,1.84,0,0,0,.643-1.124l5.333.064Q69.8-4.768,62.475-4.768Zm3.855-9.638a4.438,4.438,0,0,0,.129-1.012,1.464,1.464,0,0,0-.418-.948,1.675,1.675,0,0,0-1.333-.482,2.6,2.6,0,0,0-1.671.61,3.216,3.216,0,0,0-1.044,1.831ZM84.738-21.12q3.18,0,4.465,1.767a4.857,4.857,0,0,1,.964,3.052,7.864,7.864,0,0,1-.161,1.542l-.643,3.6a7.1,7.1,0,0,1-2.843,4.739,9.643,9.643,0,0,1-5.783,1.654,8.869,8.869,0,0,1-5.349-1.381A3.578,3.578,0,0,1,73.912-9.2a6.1,6.1,0,0,1,.1-1.06L77.413-29.6h5.461l-1.638,9.349A6.378,6.378,0,0,1,84.738-21.12Zm-.289,6.843A6.206,6.206,0,0,0,84.481-15a1.683,1.683,0,0,0-.4-1,2.13,2.13,0,0,0-1.735-.53,2.194,2.194,0,0,0-1.911.8L79.5-10.358a1.55,1.55,0,0,0,1.606.964,2.694,2.694,0,0,0,2.923-2.474Zm23.163-3.116a6.223,6.223,0,0,1-.369,2.12,6.219,6.219,0,0,1-.723,1.51l-.353.45h-4.851a2.388,2.388,0,0,0,.8-1.831,1.283,1.283,0,0,0-.369-.948,1.367,1.367,0,0,0-1.012-.369,2.321,2.321,0,0,0-1.9,1.092l-1.8,10.152H91.581L94.311-20.67h5.076L99-18.518a5.327,5.327,0,0,1,4.433-2.6,4.383,4.383,0,0,1,3.132,1A3.594,3.594,0,0,1,107.611-17.393Zm10.537-3.727a7.874,7.874,0,0,1,5.237,1.51,4.132,4.132,0,0,1,1.381,3.309,8.207,8.207,0,0,1-.161,1.542L123.931-11a6.76,6.76,0,0,1-2.843,4.819,11.03,11.03,0,0,1-5.959,1.414q-3.727,0-5.461-1.414a3.884,3.884,0,0,1-1.285-3.18A9.389,9.389,0,0,1,108.543-11l.675-3.759Q110.342-21.12,118.149-21.12Zm.867,7a4.3,4.3,0,0,0,.064-.819,2.02,2.02,0,0,0-.418-1.108,1.644,1.644,0,0,0-1.462-.61,2.407,2.407,0,0,0-1.751.691,3.245,3.245,0,0,0-.9,1.847l-.418,2.409a4.3,4.3,0,0,0-.064.819,1.878,1.878,0,0,0,.418,1.076,1.685,1.685,0,0,0,1.462.578,2.351,2.351,0,0,0,1.751-.723,3.321,3.321,0,0,0,.9-1.751Z"
              transform="translate(9.451 31.085)" fill="#fff"/>
        <Path id="Path_5725" dataName="Path 5725"
              d="M169.631-9.385a2.666,2.666,0,0,0,1.317-.321l-.161,3.63a5.235,5.235,0,0,1-3.437,1.253q-2.923,0-3.791-1.349a3.475,3.475,0,0,1-.578-1.911,10.957,10.957,0,0,1,.128-1.783l1.928-10.858H170.5l-1.8,10.12a2.162,2.162,0,0,0-.032.353Q168.667-9.385,169.631-9.385ZM165.68-25.962a4.2,4.2,0,0,1,.916-3,3.8,3.8,0,0,1,2.843-.948q2.7,0,2.7,2.377a4.088,4.088,0,0,1-.916,2.956,3.884,3.884,0,0,1-2.875.932Q165.68-23.648,165.68-25.962Zm17.573,10.826q0-1.381-1.333-1.381a2.791,2.791,0,0,0-2.2,1l-1.8,10.248h-5.461l2.731-15.452h5.076l-.353,1.9a5.9,5.9,0,0,1,4.787-2.345q2.891,0,3.759,1.414A3.882,3.882,0,0,1,189-17.705a13.537,13.537,0,0,1-.161,2.152l-.867,4.947a2.162,2.162,0,0,0-.032.353q0,.867.964.867a2.666,2.666,0,0,0,1.317-.321l-.161,3.63a5.235,5.235,0,0,1-3.437,1.253q-4.369,0-4.369-3.662a8.089,8.089,0,0,1,.128-1.381l.771-4.273A6.187,6.187,0,0,0,183.252-15.135Zm24.93-2.249a3.3,3.3,0,0,1-.643,1.96h-5.269a.752.752,0,0,0,.257-.643.815.815,0,0,0-.514-.723,2.8,2.8,0,0,0-1.317-.273q-2.409,0-2.409,1.478,0,.578.9.835a14.729,14.729,0,0,0,2.185.418,24,24,0,0,1,2.57.466,4.492,4.492,0,0,1,2.185,1.2,3.256,3.256,0,0,1,.9,2.409A4.518,4.518,0,0,1,204.889-6.2a11.5,11.5,0,0,1-6.216,1.381q-4.08,0-5.718-1.317a3.423,3.423,0,0,1-1.285-2.827,6.1,6.1,0,0,1,.1-1.06l5.365-.064q-.064.45.53.787a3.621,3.621,0,0,0,1.751.337,4.221,4.221,0,0,0,1.671-.241.915.915,0,0,0,.514-.916q0-.45-.9-.626t-2.2-.305a21.916,21.916,0,0,1-2.6-.418,4.279,4.279,0,0,1-2.2-1.221,3.367,3.367,0,0,1-.9-2.442,5.149,5.149,0,0,1,2.265-4.5,11.4,11.4,0,0,1,6.538-1.574Q208.182-21.207,208.182-17.384ZM220.9-21.143q3.277,0,4.53,1.735a4.864,4.864,0,0,1,.9,3.02,8.353,8.353,0,0,1-.161,1.574l-.643,3.759a7.8,7.8,0,0,1-2.345,4.642,6.543,6.543,0,0,1-4.5,1.59q-2.7,0-3.759-1.446l-1.735,9.927h-5.461l4.3-24.383h4.947l-.161.867A6.088,6.088,0,0,1,220.9-21.143ZM217.563-9.449a2.728,2.728,0,0,0,1.671-.578,2.6,2.6,0,0,0,.964-1.735l.418-2.409a4.193,4.193,0,0,0,.064-.8A1.727,1.727,0,0,0,220.261-16a1.712,1.712,0,0,0-1.446-.546,2.431,2.431,0,0,0-2.185.8l-.964,5.4A1.908,1.908,0,0,0,217.563-9.449ZM234.75-4.823q-6.682,0-6.682-4.626a8.089,8.089,0,0,1,.128-1.381l.675-3.984a7.1,7.1,0,0,1,2.843-4.739,10.2,10.2,0,0,1,6.088-1.654q6.457,0,6.457,4.883a10.192,10.192,0,0,1-.129,1.542l-.385,2.281h-9.8l-.129.739a4.325,4.325,0,0,0-.064.707q0,1.767,2.088,1.767a1.922,1.922,0,0,0,1.317-.482,1.84,1.84,0,0,0,.643-1.124l5.333.064Q242.074-4.823,234.75-4.823Zm3.855-9.638a4.438,4.438,0,0,0,.129-1.012,1.464,1.464,0,0,0-.418-.948,1.675,1.675,0,0,0-1.333-.482,2.6,2.6,0,0,0-1.671.61,3.216,3.216,0,0,0-1.044,1.831Zm13.878,9.638q-6.682,0-6.682-4.626a8.089,8.089,0,0,1,.129-1.381l.675-3.984a6.927,6.927,0,0,1,2.811-4.722,9.96,9.96,0,0,1,5.831-1.671q6.843,0,6.843,4.755a6.543,6.543,0,0,1-.241,1.847,3.092,3.092,0,0,1-.5,1.108l-.257.321h-5.461a2.159,2.159,0,0,0,.8-1.671,1.533,1.533,0,0,0-1.735-1.735,2.686,2.686,0,0,0-1.767.61,3,3,0,0,0-.964,1.863l-.418,2.345a3.117,3.117,0,0,0-.064.61q0,1.7,2.12,1.7a1.978,1.978,0,0,0,1.269-.45,1.661,1.661,0,0,0,.659-1l5.333.064Q259.808-4.823,252.483-4.823Zm18.055,0q-3.727,0-5.365-1.671a4.428,4.428,0,0,1-1.221-3.277,8.823,8.823,0,0,1,.128-1.446l2.185-12.433,5.879-2.442-.932,5.365h8.867l-.8,4.53h-8.867l-.642,3.63a5.363,5.363,0,0,0-.129,1.092q0,2.024,1.928,2.024a2.115,2.115,0,0,0,1.719-.867,5.085,5.085,0,0,0,.948-2.313h5.333Q278.216-4.823,270.538-4.823Zm17.541-4.562a2.666,2.666,0,0,0,1.317-.321l-.161,3.63A5.235,5.235,0,0,1,285.8-4.823q-2.924,0-3.791-1.349a3.475,3.475,0,0,1-.578-1.911,10.955,10.955,0,0,1,.128-1.783l1.928-10.858h5.461l-1.8,10.12a2.159,2.159,0,0,0-.032.353Q287.115-9.385,288.078-9.385Zm-3.952-16.577a4.2,4.2,0,0,1,.916-3,3.8,3.8,0,0,1,2.843-.948q2.7,0,2.7,2.377a4.088,4.088,0,0,1-.916,2.956,3.884,3.884,0,0,1-2.875.932Q284.127-23.648,284.127-25.962Zm16.834,4.787a7.874,7.874,0,0,1,5.236,1.51,4.132,4.132,0,0,1,1.381,3.309,8.207,8.207,0,0,1-.161,1.542l-.675,3.759A6.76,6.76,0,0,1,303.9-6.236a11.03,11.03,0,0,1-5.959,1.414q-3.727,0-5.461-1.414a3.884,3.884,0,0,1-1.285-3.18,9.389,9.389,0,0,1,.161-1.638l.675-3.759Q293.154-21.175,300.961-21.175Zm.867,7a4.3,4.3,0,0,0,.064-.819,2.02,2.02,0,0,0-.418-1.108,1.644,1.644,0,0,0-1.462-.61,2.407,2.407,0,0,0-1.751.691,3.245,3.245,0,0,0-.9,1.847l-.418,2.409a4.3,4.3,0,0,0-.064.819,1.878,1.878,0,0,0,.418,1.076,1.685,1.685,0,0,0,1.462.578,2.351,2.351,0,0,0,1.751-.723,3.321,3.321,0,0,0,.9-1.751Zm17.99-.964q0-1.381-1.333-1.381a2.791,2.791,0,0,0-2.2,1l-1.8,10.248h-5.461l2.731-15.452h5.076l-.353,1.9a5.9,5.9,0,0,1,4.787-2.345q2.891,0,3.759,1.414a3.882,3.882,0,0,1,.546,2.056,13.541,13.541,0,0,1-.161,2.152l-.867,4.947a2.162,2.162,0,0,0-.032.353q0,.867.964.867a2.666,2.666,0,0,0,1.317-.321l-.161,3.63a5.235,5.235,0,0,1-3.437,1.253q-4.369,0-4.369-3.662a8.089,8.089,0,0,1,.129-1.381l.771-4.273A6.188,6.188,0,0,0,319.819-15.135Z"
              transform="translate(-19.03 31.14)" fill="#ffbe00"/>
      </G>
    </G>
  </Svg>

);

export default LoginLogo;

