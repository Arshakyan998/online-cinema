module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error', // Сортировка импортов
    'simple-import-sort/exports': 'error', // Сортировка экспортов
    // Дополнительные правила для удобства
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'sibling', 'parent', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
