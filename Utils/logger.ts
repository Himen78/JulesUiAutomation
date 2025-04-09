export class Logger {
    static info(message: string): void {
      console.log(`[INFO]: ${message}`);
    }
  
    static step(message: string): void {
      console.log(`[STEP]: ${message}`);
    }
  
    static success(message: string): void {
      console.log(`[PASS]: ${message}`);
    }
  
    static warn(message: string): void {
      console.warn(`[WARN]: ${message}`);
    }
  
    static error(message: string): void {
      console.error(`[ERROR]: ${message}`);
    }
  
    static divider(): void {
      console.log('---------------------------------------------');
    }
  }
  