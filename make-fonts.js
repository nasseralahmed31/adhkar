const fs=require('fs'),path=require('path');
const fams={'noto-naskh-arabic':'Noto Naskh Arabic','amiri':'Amiri','scheherazade-new':'Scheherazade New','lateef':'Lateef','cairo':'Cairo','reem-kufi':'Reem Kufi'};
const R={arabic:'U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F,U+2010-2011,U+204F,U+2E41',latin:'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'};
fs.mkdirSync('www/fonts',{recursive:true});
let css='',count=0;
for(const id in fams){
  const dir=path.join('node_modules','@fontsource',id,'files');
  if(!fs.existsSync(dir)){console.log('missing font package',id);continue}
  for(const f of fs.readdirSync(dir)){
    const m=f.match(/^(.+)-(arabic|latin)-(\d+)-normal\.woff2$/);
    if(!m||![400,500,600,700].includes(+m[3]))continue;
    fs.copyFileSync(path.join(dir,f),path.join('www/fonts',f));
    css+=`@font-face{font-family:'${fams[id]}';font-style:normal;font-weight:${m[3]};font-display:swap;src:url(fonts/${f}) format('woff2');unicode-range:${R[m[2]]};}\n`;
    count++;
  }
}
fs.writeFileSync('www/fonts.css',css);
console.log('font faces:',count);
if(count<10)process.exit(1);
