const esbuild = require('esbuild');
const fs = require('fs');
esbuild.build({
  entryPoints:{
    index: 'index.js',
  },
  bundle: true,
  outdir: 'dist',
  external: ['fsevents','es-php'],
  format: 'cjs',
  platform: 'node',
  minify:false,
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [
    require('esbuild-plugin-copy').copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./types/**'],
        to: ['./dist/types/'],
      },
      keepStructure: false,
    }),
  ],
}).then( ()=>{
  console.log('Build done.\r\n')
}).catch((e) =>{
  console.log(e, 'Build error.\r\n')
  process.exit(1);
});


