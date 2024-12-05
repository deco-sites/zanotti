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
        "black": "#1D1D1B",
        "dark-gray": "#808285",
        "light-gray": "#D1D3D4",
        "middle-gray": "#9D9D9C",
        "regular-gray": "#A7A9AC",
        "signature-green": "#1BAE32",
        "gray-medium": "#F2F1F1"
      },
      boxShadow: {
        "custom": "24px 51px 113px -17px rgba(0,0,0,0.75)",
      },
      FontFamily:{
       'family-secondary': 'Montserrat'
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
