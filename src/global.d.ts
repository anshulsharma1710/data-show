// global.d.ts
export {};

declare global {
  interface MyGlobalInterface {
    myProperty: unknown; // Use unknown instead of any
  }
}
