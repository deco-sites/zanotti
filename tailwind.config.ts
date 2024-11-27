import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: {
    themes: [],
    logs: false,
  },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
      screens: {},
    },
    extend: {
      colors: {
        "black": "#2D2A2B",
        "dark-gray": "#A8A8A8",
        "light-gray": "#F2F2F2",
        "middle-gray": "#D3D3D3",
        "signature-green": "#1BAE32",
      },
      boxShadow: {
        "custom": "24px 51px 113px -17px rgba(0,0,0,0.75)",
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
      spacing: {
        "60vw": "60vw",
        "4.26vw": "4.26vw",
      },
      inset: {
        "calc-100-72vw": "calc(100% - 72vw)",
        "calc-100-5.65vw": "calc(100% - 5.65vw)",
      },
    },
  },
};
