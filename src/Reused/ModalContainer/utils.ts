import store from "shared/store";
import { ObjectUtils } from "shared/utils";
import { closeModal as closeModalSlice, openModal, type ModalPropsMap, type ModalType } from "shared/store/modalSlice";

/**
 * Статический класс для управления props текущего модального окна.
 * Инкапсулирует хранилище props, чтобы исключить прямую мутацию извне.
 */
export class ModalUtils {
  private static _props: Record<string, any> = {};

  /**
   * Возвращает текущие props модального окна.
   * Рекомендуется вызывать в компонентах вместо прямого импорта `modalProps`.
   */
  static getProps(): Record<string, any> {
    return this._props;
  }

  /**
   * Открывает модальное окно указанного типа.
   *
   * @param type — тип модалки
   * @param props — props для текущего модального окна (по умолчанию {})
   *
   * @example
   *   ModalUtils.open('ALERT', { title: 'Внимание', message: 'Текст' })
   */
  static open<T extends ModalType>(
    type: T,
    props: ModalPropsMap[T] = {} as ModalPropsMap[T],
  ): void {
    ObjectUtils.replaceContent(this._props, props);
    store.dispatch(openModal({ type }));
  }

  /**
   * Закрывает модальное окно и очищает props.
   */
  static close(): void {
    ObjectUtils.clear(this._props);
    store.dispatch(closeModalSlice());
  }
}

export const closeModalFn = ModalUtils.close.bind(ModalUtils);
