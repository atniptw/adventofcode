function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

export function extractArticles(html) {
  return [...html.matchAll(/<article[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
}

export function articleToText(articleHtml) {
  const codeBlocks = [];
  let text = articleHtml.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_, code) => {
    codeBlocks.push(decodeEntities(code));
    return `@@CODEBLOCK${codeBlocks.length - 1}@@`;
  });

  text = text
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '\n## $1\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '- $1\n')
    .replace(/<\/?[uo]l[^>]*>/g, '\n')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<p[^>]*>/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/g, '*$1*')
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/g, '$1')
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1')
    .replace(/<[^>]+>/g, '');

  text = decodeEntities(text);

  text = text.replace(
    /@@CODEBLOCK(\d+)@@/g,
    (_, index) => `\n\`\`\`\n${codeBlocks[Number(index)]}\n\`\`\`\n`
  );

  return text
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
