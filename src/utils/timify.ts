import clockify from "./clockify";

const timify = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const secs = seconds % 60;

	return `${clockify(minutes)}:${clockify(secs)}`;
};

export default timify;