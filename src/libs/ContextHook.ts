import { createContext } from 'react';
const LanguageContext = createContext({
  reducer: {},
  dispatch: (value: unknown) => value,
});
export default LanguageContext;