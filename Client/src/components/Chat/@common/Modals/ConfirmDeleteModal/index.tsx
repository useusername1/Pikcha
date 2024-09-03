import { useRecoilState, useSetRecoilState } from "recoil";
import {
  itemsToDeleteAtom,
  isDeleteModeAtom,
  showConfirmModalAtom,
} from "~/recoil/chat/atoms";
import * as S from "./styled";
import * as M from "../styled";
import { HiExclamationTriangle as ExclamaionIcon } from "react-icons/hi2";

interface ConfirmDeleteModalProps {
  deleteMessage: (message: Set<number> | number[]) => void;
}
const ConfirmDeleteModal = ({ deleteMessage }: ConfirmDeleteModalProps) => {
  const setShowConfirmModal = useSetRecoilState(showConfirmModalAtom);
  const [isDeleteMode, setIsDeleteMode] = useRecoilState(isDeleteModeAtom);
  const [deleteItems, setDeleteItems] = useRecoilState(itemsToDeleteAtom);
  const handleCancelClick = () => {
    if (!isDeleteMode) setDeleteItems(new Set());
    setShowConfirmModal(false);
  };
  const handleConfirmClick = () => {
    deleteMessage(deleteItems);
    setDeleteItems(new Set());
    setShowConfirmModal(false);
    setIsDeleteMode(false);
  };
  return (
    <M.ModalWrapper>
      <S.DeleteModalContainer>
        <div className="modal-subject">
          <ExclamaionIcon />
          &nbsp;&nbsp;메시지 삭제
        </div>
        <div className="modal-content">
          전체 대화방에서 메시지가 삭제됩니다.
        </div>
        <div className="modal-buttonBox">
          <button className="cancel-button" onClick={handleCancelClick}>
            취소
          </button>
          <button className="confirm-button" onClick={handleConfirmClick}>
            삭제
          </button>
        </div>
      </S.DeleteModalContainer>
    </M.ModalWrapper>
  );
};
export default ConfirmDeleteModal;
