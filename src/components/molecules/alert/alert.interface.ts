export default interface IAlert {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText: string;
  confirmText: string;
}
