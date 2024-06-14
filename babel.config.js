// node_modules内にも処理通すため、babel.rcではなくbabel.configを使用
// https://qiita.com/wintyo/items/63ab29ac7a16122fdf7b
// https://qiita.com/oieioi/items/25ca601caa3ef9867348
// https://github.com/babel/babel/issues/8672#issuecomment-420168497
module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage',
        'corejs': 3,
      },
    ],
  ];

  return {
    presets,
  };
};
