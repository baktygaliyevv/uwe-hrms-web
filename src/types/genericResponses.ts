export type GenericOk<T> = { status: 'Ok', payload: T };

export type GenericError = { status: 'Error', message: string }; 