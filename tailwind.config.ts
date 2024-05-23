export default {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "selector",
    theme: {
        extend: {
            fontFamily: {
                mono: ["var(--font-fira-code)"],
            },
            fontSize: {
                xll: "1.375rem",
                "3.5xl": "2rem",
            },
            screens: {
                xs: "480px",
                xss: "540px",
                ssm: "720px",
                mmd: "916px",
                llg: "1088px",
            },
            colors: {
                primary: "#ffdd00",
                dark: "#1c1d1f",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
