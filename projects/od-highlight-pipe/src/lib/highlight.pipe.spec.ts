import { HighlightPipe } from './highlight.pipe';

describe('highlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('Should highlight the word "hello"', () => {
    const value = 'Hello, World!';
    const input = 'hello';
    const result = pipe.transform(value, input);
    expect(result).toEqual('<b>Hello</b>, World!');
  });

  it('Should not highlight anything', () => {
    const value = 'Hello, World!';
    const input = 'One';
    const result = pipe.transform(value, input);
    expect(result).toEqual(value);
  });

  it('Should highlight relating chinese chars for 哈尔滨', () => {
    const value = '哈尔滨';
    const input = 'he';
    const result = pipe.transform(value, input, true);
    expect(result).toEqual('<b>哈尔</b>滨');
  });

  it('Should not highlight relating chinese chars', () => {
    const value = '哈尔滨';
    const input = 'he';
    const result = pipe.transform(value, input);
    expect(result).toEqual(value);
  });

  it('Should highlight relating chinese and alpha chars for 古驰Gucci', () => {
    const value = '古驰Gucci';
    const input = 'chigu';
    const result = pipe.transform(value, input, true);
    expect(result).toEqual('古<b>驰Gu</b>cci');
  });

  it('Should highlight relating alpha chars for 呼和浩特Hohhot in pinyin mode', () => {
    const value = '呼和浩特Hohhot';
    const input = 'hohhot';
    const result = pipe.transform(value, input, true);
    expect(result).toEqual('呼和浩特<b>Hohhot</b>');
  });

  it('Should highlight relating alpha chars for 呼和浩特Hohhot in standard mode', () => {
    const value = '呼和浩特Hohhot';
    const input = 'hohhot';
    const result = pipe.transform(value, input);
    expect(result).toEqual('呼和浩特<b>Hohhot</b>');
  });
});
