module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    opacity: ({ after }) => after(['disabled']), // Hackity hack for post-css. Opacity doesn't work out of the box
  },
  plugins: [require('@tailwindcss/forms')],
};
