import { renderHook, act } from '@testing-library/react-hooks';
import useNoteOptions from '..';

describe('useNoteOptions hook', () => {
  it('Should set the noteId and the isNoteOptionsVisible as true', () => {
    const { result } = renderHook(useNoteOptions);
    console.log(result.current);
    // act(() => {
    //   result.current.noteId("2");
    // });
    console.log('result.current.', result.current.noteId);
  });
});

describe('useExampleCustomReactHook', () => {
  it('Should provide a default message', () => {
    const { result } = renderHook(useNoteOptions);
    console.log(result.current.isNoteOptionsVisible);
  });
});
