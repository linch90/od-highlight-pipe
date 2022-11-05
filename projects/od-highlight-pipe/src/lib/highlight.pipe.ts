import { Pipe, PipeTransform } from '@angular/core';
import { match, pinyin } from 'pinyin-pro';
import { matchOverride } from './match.override';

const escape = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const replaceStartPattern = (s: string) => new RegExp(`^${s}`);

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  /**
   * @name transform
   * @param value {string}
   * @param input {string}
   * @param pinyinMode {boolean} if enable pinyin parsing mode
   */
  public transform(value: string, input: string, pinyinMode = false): string {
    const trimmedInput = input?.trim();
    if (
      trimmedInput === null ||
      trimmedInput === undefined ||
      trimmedInput === ''
    ) {
      return value;
    }

    try {
      if (pinyinMode) {
        const m = matchOverride(value, input);
        if (m !== null) {
          const pinyinArr = pinyin(value, {
            nonZh: 'consecutive',
            toneType: 'none',
            v: true,
            type: 'array',
          });

          if (pinyinArr.length) {
            const firstCharArr = pinyin(value, {
              pattern: 'first',
              nonZh: 'consecutive',
              toneType: 'none',
              v: true,
              type: 'array',
            });

            let newInputArr: string[] = [];
            m.forEach((mi, i) => {
              let regex = new RegExp(replaceStartPattern(pinyinArr[i]));
              let newInput = input.replace(regex, '');
              if (newInput === input) {
                regex = new RegExp(replaceStartPattern(firstCharArr[i]));
                newInput = input.replace(regex, '');
              }

              newInputArr.push(value[mi]);
              input = newInput;
            });

            input = newInputArr.join('');
          }
        }
      }

      const regex = new RegExp(`(${escape(input)})`, 'i');
      return value.replace(regex, '<b>$1</b>');
    } catch (e) {
      return value;
    }
  }
}
