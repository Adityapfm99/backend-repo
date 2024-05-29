


export class ApiError {
    status: string;
    message: string;
  
    constructor(message: string, status: string = 'error') {
      this.status = status;
      this.message = message;
    }
  }