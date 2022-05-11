import * as React from "react";
import Svg, { Path, G } from "react-native-svg";

export default function IconCake({ size = "24", color, filled }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      {filled ? (
        <G>
          <Path d="M5.5 13.225V9.84995C5.5 9.34995 5.675 8.92495 6.025 8.57495C6.375 8.22495 6.8 8.04995 7.3 8.04995H11.25V6.57495C10.95 6.37495 10.7083 6.14562 10.525 5.88695C10.3417 5.62895 10.25 5.31662 10.25 4.94995C10.25 4.73328 10.2917 4.52062 10.375 4.31195C10.4583 4.10395 10.5917 3.90828 10.775 3.72495L11.675 2.82495C11.7083 2.79162 11.8167 2.74995 12 2.69995C12.0333 2.69995 12.1417 2.74162 12.325 2.82495L13.225 3.72495C13.4083 3.90828 13.5417 4.10395 13.625 4.31195C13.7083 4.52062 13.75 4.73328 13.75 4.94995C13.75 5.31662 13.6583 5.62895 13.475 5.88695C13.2917 6.14562 13.05 6.37495 12.75 6.57495V8.04995H16.7C17.2 8.04995 17.625 8.22495 17.975 8.57495C18.325 8.92495 18.5 9.34995 18.5 9.84995V13.225H5.5ZM4.375 21.5C4.125 21.5 3.91667 21.4166 3.75 21.25C3.58333 21.0833 3.5 20.875 3.5 20.625V16.55C3.5 16.0333 3.675 15.6 4.025 15.25C4.375 14.9 4.8 14.725 5.3 14.725H18.7C19.2 14.725 19.625 14.9 19.975 15.25C20.325 15.6 20.5 16.0333 20.5 16.55V20.625C20.5 20.875 20.4167 21.0833 20.25 21.25C20.0833 21.4166 19.875 21.5 19.625 21.5H4.375Z" />
        </G>
      ) : (
        <G>
          <Path d="M4.375 21.5C4.125 21.5 3.91667 21.4166 3.75 21.25C3.58333 21.0833 3.5 20.875 3.5 20.625V15.725C3.5 15.225 3.675 14.8 4.025 14.45C4.375 14.1 4.8 13.925 5.3 13.925H5.5V9.84995C5.5 9.34995 5.675 8.92495 6.025 8.57495C6.375 8.22495 6.8 8.04995 7.3 8.04995H11.25V6.57495C10.95 6.37495 10.7083 6.14562 10.525 5.88695C10.3417 5.62895 10.25 5.31662 10.25 4.94995C10.25 4.73328 10.2917 4.52062 10.375 4.31195C10.4583 4.10395 10.5917 3.90828 10.775 3.72495L11.675 2.82495C11.7083 2.79162 11.8167 2.74995 12 2.69995C12.0333 2.69995 12.1417 2.74162 12.325 2.82495L13.225 3.72495C13.4083 3.90828 13.5417 4.10395 13.625 4.31195C13.7083 4.52062 13.75 4.73328 13.75 4.94995C13.75 5.31662 13.6583 5.62895 13.475 5.88695C13.2917 6.14562 13.05 6.37495 12.75 6.57495V8.04995H16.7C17.2 8.04995 17.625 8.22495 17.975 8.57495C18.325 8.92495 18.5 9.34995 18.5 9.84995V13.925H18.7C19.2 13.925 19.625 14.1 19.975 14.45C20.325 14.8 20.5 15.225 20.5 15.725V20.625C20.5 20.875 20.4167 21.0833 20.25 21.25C20.0833 21.4166 19.875 21.5 19.625 21.5H4.375ZM7 13.925H17V9.84995C17 9.74995 16.971 9.67495 16.913 9.62495C16.8543 9.57495 16.7833 9.54995 16.7 9.54995H7.3C7.21667 9.54995 7.146 9.57495 7.088 9.62495C7.02933 9.67495 7 9.74995 7 9.84995V13.925ZM5 20H19V15.725C19 15.6416 18.971 15.5706 18.913 15.512C18.8543 15.454 18.7833 15.425 18.7 15.425H5.3C5.21667 15.425 5.146 15.454 5.088 15.512C5.02933 15.5706 5 15.6416 5 15.725V20ZM7 13.925C7 13.925 7.02933 13.925 7.088 13.925C7.146 13.925 7.21667 13.925 7.3 13.925H16.7C16.7833 13.925 16.8543 13.925 16.913 13.925C16.971 13.925 17 13.925 17 13.925H7ZM5 20C5 20 5.02933 20 5.088 20C5.146 20 5.21667 20 5.3 20H18.7C18.7833 20 18.8543 20 18.913 20C18.971 20 19 20 19 20H5ZM18.5 13.925H5.5H18.5Z" />
        </G>
      )}
    </Svg>
  );
}