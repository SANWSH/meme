/// <reference types="vite/client" />

declare module '*.png' {
    const value: any;
    export default value;
  }
  
  declare module '*.svg' {
    const value: any;
    export default value;
  }
  
  declare module '*.ogg' {
    const value: any;
    export default value;
  }

  type Track = {
    src: string;
    name: string;
    disabled?: boolean;
    category?: string;
  }

  type LocaleType = {
    locale: string;
    icon: string;
  }