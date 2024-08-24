export const resumeLink = `/${encodeURI("Resume Ivan Stepanian - Software Engineer - 2024.pdf")}`;
export const isProduction = process.env.NODE_ENV === "production";
export const baseUrl = isProduction ? "https://ivanstepanian.com" : "http://localhost:3000";
