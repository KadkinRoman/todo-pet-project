/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
};
