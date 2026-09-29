import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';

const projectFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

describe('font loading', () => {
  it('self-hosts the display script so the invitation remains styled offline', () => {
    const styles = projectFile('./index.css');
    const document = projectFile('../index.html');

    for (const fontFile of [
      'pinyon-script-latin-400.woff2',
      'cormorant-garamond-latin.woff2',
      'cormorant-garamond-latin-italic.woff2',
      'lora-latin.woff2',
      'lora-latin-italic.woff2',
      'inter-latin.woff2',
    ]) {
      assert.match(styles, new RegExp(`url\\('\\/fonts\\/${fontFile.replace('.', '\\.')}`));
    }
    assert.doesNotMatch(document, /fonts\.googleapis\.com/);
  });
});
