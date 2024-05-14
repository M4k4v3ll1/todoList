export type ActionTypeForTests<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">
