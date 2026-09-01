import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { User } from "Pages/Users/types";

type MyJwtPayload = JwtPayload & { user: User }

export const getUserByJWT = (token: string) => {
  const payload = jwtDecode(token) as MyJwtPayload
  return payload?.user
}

export class ObjectUtils {
  /**
   * Полностью удаляет все собственные свойства из переданного объекта (мутирует его).
   */
  static clear(obj: Record<string, any>): void {
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        delete obj[key];
      }
    }
  }

  /**
   * Полностью заменяет содержимое target на глубокую копию source.
   * target мутирует по ссылке.
   */
  static replaceContent<T extends Record<string, any>>(
    target: Record<string, any>,
    source: T
  ): T {
    this.clear(target);

    const copy = (to: Record<string, any>, from: Record<string, any>): void => {
      for (const key in from) {
        if (Object.hasOwn(from, key)) {
          const value = from[key];

          if (value !== null && typeof value === 'object') {
            to[key] = Array.isArray(value) ? [] : {};
            copy(to[key], value);
          } else {
            to[key] = value;
          }
        }
      }
    };

    copy(target, source);
    return target as T;
  }

  /**
   * Проверяет, пустой ли объект (не содержит ли собственных свойств).
   */
  static isEmpty(obj: Record<string, any>): boolean {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Безопасно достает значение из глубоко вложенного объекта или массива по строковому пути (например, 'users.0.name').
   * Если путь не существует, вернет undefined.
   */
  static getProp(obj: Record<string, any>, path: string): any {
    const keys = path.split('.');
    let current: any = obj;

    for (const key of keys) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[key];
    }

    return current;
  }

  /**
   * Безопасно устанавливает значение по строковому пути (например, 'company.employees.0.name').
   * Автоматически создает промежуточные объекты или массивы, если они отсутствуют.
   */
  static setProp(obj: Record<string, any>, path: string, value: any): void {
    const keys = path.split('.');
    let current: any = obj;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      // Если это последний ключ в цепочке, просто записываем значение
      if (i === keys.length - 1) {
        current[key] = value;
        return;
      }

      // Если промежуточный узел отсутствует или не является объектом/массивом
      if (current[key] === null || typeof current[key] !== 'object') {
        const nextKey = keys[i + 1];
        
        // Регулярное выражение проверяет, состоит ли следующий ключ только из цифр (индекс массива)
        const isNextKeyIndex = /^\d+$/.test(nextKey);
        
        // Создаем массив, если следующий ключ — число, иначе создаем объект
        current[key] = isNextKeyIndex ? [] : {};
      }

      current = current[key];
    }
  }
}
