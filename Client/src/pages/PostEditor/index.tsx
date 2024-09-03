import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getPost } from "~/api/BlogDetail/Get/Get";
import { handlePostSubmit } from "~/api/Post/handlePostSubmit";
import Button from "~/components/@common/Button";
import {
  WritingGuide,
  TagCreator,
  ImageUploader,
} from "~/components/PostEditor";
import {
  editorTagListAtom,
  editorPreviewListAtom,
  editorPostContentAtom,
} from "~/recoil/postEditor/atoms";
import { BsDot } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import * as S from "./styled";
interface PostEditorProps {
  mode: "edit" | "new";
}

function PostEditor({ mode }: PostEditorProps) {
  const [title, setTitle] = useState("");
  const [tagList, setTagList] = useRecoilState(editorTagListAtom);
  const [postPreviewList, setPostPreviewList] = useRecoilState(
    editorPreviewListAtom
  );
  const postContent = useRecoilValue(editorPostContentAtom);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [isWriteGuideModal, setIsWriteGuideModal] = useState(true);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit") {
      const getData = async () => {
        const result = await getPost(postId);
        const previewContents = result.postImageUrls.concat(
          result.postContents
        );
        console.log(result, previewContents, "result,previewContents");
        setTitle(result.postTitle);
        setTagList(result.postHashTags);
        setPostPreviewList((preview) => [...preview, previewContents]);
      };
      getData();
    }
  }, []);
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (title.length > 30) alert("30자 이내로 작성해주세요.");
  };

  const handleRemovePreview = (
    e: React.MouseEvent<HTMLOrSVGElement>,
    idx: number
  ) => {
    e.preventDefault();
    if (imgFiles) {
      setPostPreviewList(
        postPreviewList.filter((previews) => postPreviewList[idx] !== previews)
      );
      setImgFiles(imgFiles.filter((file) => imgFiles[idx] !== file));
    }
  };

  const handleImageModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowImageUploader(!showImageUploader);
  };

  const actionPostSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const post = await handlePostSubmit(
      title,
      tagList,
      imgFiles,
      postContent,
      postId
    );
    navigate(`/posts/detail/${post}`);
  };

  return (
    <>
      {isWriteGuideModal ? (
        <WritingGuide setIsWriteGuideModal={setIsWriteGuideModal} />
      ) : null}
      <S.Header>
        <div>
          <span>
            <BsDot color="#6255F8" />
            {mode === "edit" ? "수정 포스트" : "새 포스트"}
          </span>
          <Button
            type="violet"
            width="80px"
            height="20px"
            text="가이드 보기"
            onClick={() => setIsWriteGuideModal(true)}
          />
        </div>
        <div>미리보기</div>
      </S.Header>
      <S.Container>
        <S.WritePostWrapper>
          <S.WritePostContainer>
            <div>
              <input
                value={title}
                onChange={(e) => {
                  handleTitle(e);
                }}
                placeholder="제목을 입력하세요"
              ></input>
              <Button
                type="custom"
                width="100px"
                height="40px"
                text="이미지 등록"
                backgroundColor="var(--purple-200)"
                onClick={(e) => handleImageModal(e)}
                hoverBackgroundColor="var(--purple-300)"
                hovercolor="white"
              />
            </div>
            <TagCreator />
            {showImageUploader ? (
              <ImageUploader setImgFiles={setImgFiles} />
            ) : null}
          </S.WritePostContainer>
          <S.HandleBackAndSubmitContainer>
            <div onClick={() => navigate(-1)}>
              <MdOutlineKeyboardBackspace />
            </div>
            <Button
              type="violet"
              width="100px"
              height="40px"
              text="포스트 등록"
              onClick={(e) => actionPostSubmit(e)}
            />
          </S.HandleBackAndSubmitContainer>
        </S.WritePostWrapper>
        <S.PreviewContainer>
          <div>
            <h2>{title}</h2>
          </div>
          {postPreviewList &&
            postPreviewList.map((previews, index) => {
              return (
                <S.PreviewContentContainer key={index}>
                  <S.PreviewImgContainer>
                    <img src={previews[0]} />
                  </S.PreviewImgContainer>
                  <S.PreviewTextContainer>
                    {previews[1]}
                    <CgClose
                      cursor="pointer"
                      onClick={(e) => handleRemovePreview(e, index)}
                    />
                  </S.PreviewTextContainer>
                </S.PreviewContentContainer>
              );
            })}
        </S.PreviewContainer>
      </S.Container>
    </>
  );
}
export default PostEditor;
