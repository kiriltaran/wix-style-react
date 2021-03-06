import { modalsSymbols } from '../symbols';
import { modalsComponentsNames as componentsNames } from '../components';

/**
 * Symbol => Component 9
 */
export const modalsSymbolsToComponents = {
  [modalsSymbols.alert]: [
    componentsNames.MessageBoxFunctionalLayout,
    componentsNames.Modal,
  ],

  [modalsSymbols.content]: [
    componentsNames.MessageBoxFunctionalLayout,
    componentsNames.Modal,
  ],
  [modalsSymbols.custom]: [componentsNames.CustomModal, componentsNames.Modal],
  [modalsSymbols.marketing]: [componentsNames.MessageBoxMarketerialLayout],
  [modalsSymbols.preview]: [
    componentsNames.ModalPreviewLayout,
    componentsNames.Modal,
  ],
  [modalsSymbols.mobile]: [
    componentsNames.ModalMobileLayout,
    componentsNames.Modal,
  ],
};
