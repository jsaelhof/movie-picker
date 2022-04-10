const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  // *.{js,jsx,ts,tsx} includes all file with that extension.
  // Using **/ at the start ignores the current directory (I don't want to lint staged config files etc in the root).
  // In the future this could possibly lint files in a subdirectory that i don't want so i'd need to figure out
  // how to remove those from the glob.
  // Also, next.config.js has all the directories I -want- to list for regular linting.
  // That would be the best option to share with lint staged.
  "**/*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
