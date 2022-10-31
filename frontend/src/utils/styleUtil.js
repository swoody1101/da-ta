import { css } from "styled-components";

export const sizes = {
	wide: "1280px",
	tablet1: "1024px",
	tablet2: "768px",
	phone: "480px",
};

export const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media screen and (max-width: ${sizes[label]}) {
			${css(...args)}
		}
	`;
	return acc;
}, {});
