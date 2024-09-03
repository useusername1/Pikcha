import { useRecoilState, useSetRecoilState } from "recoil";
import {
  itemsToDeleteAtom,
  isDeleteModeAtom,
  showConfirmModalAtom,
} from "~/recoil/chat/atoms";
import { sendbarStyle } from "~/components/Chat/ChatInputBar";
import * as S from "./styled";

const DeleteAllConfirmModal = () => {
  const setShowConfirmModal = useSetRecoilState(showConfirmModalAtom);
  const setIsDeleteMode = useSetRecoilState(isDeleteModeAtom);
  const [deleteItems, setDeleteItems] = useRecoilState(itemsToDeleteAtom);
  const handleButtonClick = () => {
    setShowConfirmModal(true);
  };
  const handleCancelClick = () => {
    if (deleteItems) setDeleteItems(new Set());
    setIsDeleteMode(false);
  };
  return (
    <S.ConfirmBarDiv styleProps={sendbarStyle}>
      <S.CancelAllButton onClick={handleCancelClick}>취소</S.CancelAllButton>
      <S.DeleteAllButton
        onClick={handleButtonClick}
        disabled={deleteItems.size === 0}
      >
        삭제&nbsp;<span>{deleteItems.size}</span>
      </S.DeleteAllButton>
    </S.ConfirmBarDiv>
  );
};
export default DeleteAllConfirmModal;
