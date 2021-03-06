/**
 * @param {String} params.name 小说名字
 * @param {String} params.author 作者名字
 * @param {Number} params.len 小说章节总数
 */
module.exports = (params) => {
  function item(len) {
    let item = '';
    for (let i = 0; i < len; i++) {
      item += `<item id="text${i +
        1}" media-type="text/x-oeb1-document" href="text/${i + 1}.html"></item>\n      `;
    }
    return item;
  }
  function itemref(len) {
    let itemref = '';
    for (let i = 0; i < len; i++) {
      itemref += `<itemref idref="text${i + 1}" />\n      `;
    }
    return itemref;
  }
  return `<?xml version="1.0" encoding="iso-8859-1"?>
  <package unique-identifier="uid" xmlns:opf="http://www.idpf.org/2007/opf" xmlns:asd="http://www.idpf.org/asdfaf">
    <metadata>
      <dc-metadata xmlns:dc="http://purl.org/metadata/dublin_core" xmlns:oebpackage="http://openebook.org/namespaces/oeb-package/1.0/">
        <dc:Title>${params.name}</dc:Title>
        <dc:Language>en</dc:Language>
        <dc:Creator>${params.author}</dc:Creator>
        <dc:Copyrights>Amazon.com</dc:Copyrights>
        <dc:Publisher>Amazon.com</dc:Publisher>
        <x-metadata>
          <EmbeddedCover>images/image.png</EmbeddedCover>
        </x-metadata>
      </dc-metadata>
    </metadata>
    <manifest>
      <item id="content" media-type="text/x-oeb1-document" href="toc.html"></item>
      <item id="ncx" media-type="application/x-dtbncx+xml" href="toc.ncx" />
      <item id='text0' media-type="text/x-oeb1-document" href="intro.html"></item>
      ${item(params.len)}
      
    </manifest>
    <spine toc="ncx">
      <itemref idref="content" />
      <itemref idref="text0" />
      ${itemref(params.len)}
    </spine>
    <guide>
      <reference type="toc" title="Table of Contents" href="toc.html" />
    </guide>
  </package>`;
};
